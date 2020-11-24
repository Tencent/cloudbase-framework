/**
 *
 * Copyright 2020 Tencent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { CloudApi } from '../api';
import { IExtensionFile } from './types';

export class SamApi {
  constructor() {}

  /**
   *
   * 创建私有版本并部署
   * @param template
   * 返回
   * ExtensionId	String	扩展ID
   * RequestId	String	唯一请求 ID，每次请求都会返回。定位问题时需要提供该次请求的 RequestId。
   */

  createAndInstall(template: string) {
    return CloudApi.tcbService.request('CreatePrivateExtensionAndInstall', {
      Template: template,
    });
  }

  /**
   * 查询扩展任务的状态
   */
  fetchExtensionTaskStatus(ids: string[]) {
    return CloudApi.tcbService.request('DescribeExtensionTaskStatus', {
      ExtensionIds: ids,
    });
  }

  /**
   * 上报部署状态
   */
  reportCloudBaseCIResultCallback(
    ciId: string,
    traceId: string,
    extensionId: string
  ) {
    return CloudApi.tcbService.request('CloudBaseCIResultCallback', {
      CIID: ciId,
      TraceId: traceId,
      ExtensionID: extensionId,
    });
  }

  /**
   * 描述扩展上传文件信息
   */
  describeExtensionUploadInfo(files: IExtensionFile[]) {
    return CloudApi.tcbUinService.request('DescribeExtensionUploadInfo', {
      ExtensionFiles: files,
    });
  }
}
