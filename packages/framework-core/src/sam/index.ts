/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import merge from 'lodash.merge';
import JSYaml from 'js-yaml';
import ProgressBar from 'progress';
import { fetchStream } from '@cloudbase/cloud-api';
import { getProxy } from '@cloudbase/toolbox';

import { DEFAULT_SAM } from './default-sam';
import { SamApi } from './api';
import getLogger from '../logger';
import { ISAM, IExtensionLocalFile } from './types';
import { CloudBaseFrameworkError, ERRORS } from '../error';

const logger = getLogger();

export interface ISamManagerOptions {
  projectPath: string;
}

export class SamManager {
  protected samObj: Record<string, any> = {};
  protected projectPath: string;
  protected samApi: SamApi;

  constructor({ projectPath }: ISamManagerOptions) {
    this.projectPath = projectPath;
    this.samApi = new SamApi();
  }

  /**
   * 生成 SAM 文件
   *
   */
  generate(meta: Record<string, any>, samSections: Record<string, any>[]) {
    let EntryPoint = samSections
      .map((sam) => sam?.EntryPoint)
      .reduce((prev, cur) => {
        prev = [...prev, ...(cur || [])];
        return prev;
      }, []);

    this.samObj = merge(DEFAULT_SAM, meta, ...samSections, {
      EntryPoint,
    });
    this.samObj.Resources = JSON.parse(
      JSON.stringify(
        Object.entries(this.samObj.Resources || {}).reduce(
          (prev: Record<string, any>, cur) => {
            const [name, resource] = cur;
            prev[name] = resource;
            return prev;
          },
          {}
        )
      )
    );

    // parse 和 stringify 是为了去掉undefined等 yaml 不支持的格式
    const samYaml = JSYaml.safeDump(JSON.parse(JSON.stringify(this.samObj)));

    fs.writeFileSync(path.join(this.projectPath, 'TCBSAM.yaml'), samYaml);
  }

  /**
   * 安装
   */
  async install(
    ciId: string,
    createSamSuccessCallback?: (extensionId: string) => void
  ) {
    const template = this.readSam();
    let isCloudBuild = !!process.env.CLOUDBASE_CIID;
    let extensionId: string;

    // 没有资源需要部署的情况不走 SAM安装
    if (
      !Object.keys(template.Resources).length &&
      !Object.keys(template.Config || {}).length
    ) {
      return this.clear();
    }

    try {
      try {
        logger.debug('sam:install', template);
        const res = await this.samApi.createAndInstall(
          JSON.stringify(template)
        );
        extensionId = res.ExtensionId;

        if (typeof createSamSuccessCallback === 'function') {
          await createSamSuccessCallback(extensionId);
        }
      } catch (e: any) {
        if (e.code === 'ResourceInUse') {
          extensionId = e.original.Message;

          if (typeof createSamSuccessCallback === 'function') {
            await createSamSuccessCallback(extensionId);
          }
        } else {
          throw e;
        }
      }

      // 回调扩展信息，和项目关联
      if (ciId) {
        await this.samApi.reportCloudBaseCIResultCallback(
          ciId,
          process.env.CLOUDBASE_TRACEID || '',
          extensionId
        );
      }

      // 云端一键部署时不轮询查询结果
      if (!isCloudBuild) {
        await this.checkStatus(extensionId);
      }
    } catch (e) {
      this.clear();
      throw e;
    }
    this.clear();
  }

  getAppEntry() {
    return this.samObj?.EntryPoint || [];
  }

  /**
   * 轮询状态
   * @param extensionId
   */
  async checkStatus(extensionId: string) {
    const bar = new ProgressBar('正在部署[:bar] :percent :elapsed s', {
      complete: '░',
      incomplete: ' ',
      width: 40,
      total: 100,
    });
    let percent = 0;

    await this.waitUntil(async () => {
      const statusRes = await this.samApi.fetchExtensionTaskStatus([
        extensionId,
      ]);

      const taskInfos = statusRes.ExtensionTaskInfo;

      const taskInfo = taskInfos[0];

      logger.debug('ext taskInfo', taskInfo);

      if (taskInfo) {
        const delta = (taskInfo.Percent || 0) - percent;
        percent = taskInfo.Percent || 0;
        bar.tick(delta);

        if (taskInfo.Status === 'running') {
          return true;
        } else if (taskInfo.Detail) {
          throw new CloudBaseFrameworkError(
            `
部署失败，错误信息：${taskInfo.Detail}， 请求RequestId：${statusRes.RequestId}`,
            ERRORS.DEPLOY_ERROR
          );
        }
      }

      return taskInfos.filter((item: any) => ['running'].includes(item.Status))
        .length;
    });
  }

  clear() {
    fs.unlinkSync(path.join(this.projectPath, 'TCBSAM.yaml'));
  }

  async waitUntil(fn: () => Promise<boolean>, interval?: 5000) {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        try {
          const result = await fn();
          if (result) {
            resolve(result);
            clearInterval(timer);
          }
        } catch (e) {
          clearInterval(timer);
          reject(e);
        }
      }, interval || 5000);
    });
  }

  /**
   * 上传文件到 COS
   */
  async uploadFile(files: IExtensionLocalFile[]) {
    const uploadInfo = await this.samApi.describeExtensionUploadInfo(
      files.map((file) => {
        return {
          FileType: file.fileType,
          FileName: file.fileName,
        };
      })
    );

    const filesData = uploadInfo.FilesData;

    return Promise.all(
      filesData.map(async (fileData: any, index: number) => {
        await this.uploadFileViaUrlAndKey({
          url: fileData.UploadUrl,
          customKey: fileData.CustomKey,
          file: files[index].filePath,
          maxSize: fileData.MaxSize,
        });

        return {
          codeUri: fileData.CodeUri,
        };
      })
    );
  }

  /**
   * 上传文件到 COS
   * @param options
   */
  async uploadFileViaUrlAndKey(options: any) {
    const { url, file, customKey, maxSize } = options;

    const headers: Record<string, string> = {};

    if (customKey) {
      headers['x-cos-server-side-encryption-customer-algorithm'] = 'AES256';
      headers['x-cos-server-side-encryption-customer-key'] = Buffer.from(
        customKey
      ).toString('base64');
      headers[
        'x-cos-server-side-encryption-customer-key-MD5'
      ] = crypto.createHash('md5').update(customKey).digest('base64');
    }

    const size = fs.statSync(file).size;

    if (size > maxSize * 1024 * 1024) {
      throw new Error(`${file} 文件大小超出限制 ${maxSize} MB`);
    } else if (size === 0) {
      throw new Error(`${file} 文件大小为 0，请检查`);
    }

    headers['Content-Type'] = 'application/zip';

    logger.debug('uploadFileViaUrlAndKey: headers', headers);

    logger.debug('uploadFileViaUrlAndKey: file', file, 'size', size);

    await fetchStream(
      url,
      {
        body: fs.createReadStream(file),
        headers,
        method: 'PUT',
      },
      getProxy()
    );
  }

  /**
   * 读取本地SAM
   */
  readSam(): ISAM {
    const samFile = fs.readFileSync(
      path.join(this.projectPath, 'TCBSAM.yaml'),
      'utf-8'
    );
    return JSYaml.safeLoad(samFile) as ISAM;
  }
}
