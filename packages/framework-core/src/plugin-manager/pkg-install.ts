/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import path from 'path';
import packageJson from 'package-json';
import httpsProxyAgent from 'https-proxy-agent';
import { getProxy } from '@cloudbase/toolbox';
import getLogger from '../logger';

import { spawnPromise } from '../utils/spawn';

export async function npmInstallWithCheck(
  packageInfo: Record<string, string>,
  options?: Record<string, any>
) {
  let needUpdatePackageInfo: Record<string, string> = {};
  const logger = getLogger();

  await Promise.all(
    Object.entries(packageInfo).map(async ([name, version]) => {
      const startTime = new Date();
      const checkResult = await checkNeedUpdate(
        name,
        version,
        options?.cwd || process.cwd()
      );

      if (checkResult.isNeedUpdate) {
        needUpdatePackageInfo[name] = checkResult.resolvedVersion;
      }
      logger.debug(
        `resolve plugin ${name}@${version}: use ${(
          (new Date().valueOf() - startTime.valueOf()) /
          1000
        ).toFixed(2)} s, mismatch：${
          checkResult.isNeedUpdate
        }, resolved version：${checkResult.resolvedVersion}`
      );
    })
  );

  const args = ['install'];
  const packageList = getPackageList(needUpdatePackageInfo);

  if (packageList.length === 0) {
    return;
  }

  const npmOptions = ['--no-audit', '--progress=false'];
  // 支持node8
  return spawnPromise('npm', [...args, ...packageList, ...npmOptions], {
    cwd: options?.cwd || process.cwd(),
  });
}

async function checkNeedUpdate(name: string, version: string, cwd: string) {
  const isResolvedVersion = /^\d/.test(version);
  let resolvedVersion;

  if (isResolvedVersion) {
    resolvedVersion = version;
  } else {
    const proxy = getProxy();
    const meta = await packageJson(name, {
      version,
      ...(proxy ? { agent: new httpsProxyAgent(proxy) } : {}),
    });
    resolvedVersion = meta.version as string;
  }
  const localVersion = checkLocalVersion(name, cwd);
  return {
    isNeedUpdate: resolvedVersion !== localVersion,
    resolvedVersion: resolvedVersion,
  };
}

function checkLocalVersion(name: string, cwd: string) {
  let version;
  try {
    const localPackageJson = require(path.join(
      cwd,
      'node_modules',
      name,
      'package.json'
    ));
    version = localPackageJson.version;
  } catch (e) {}

  return version;
}

export function install(
  packageInfo: Record<string, string>,
  options?: Record<string, any>
) {
  const packageList = getPackageList(packageInfo);

  const args = ['install'];

  const npmOptions = ['--prefer-offline', '--no-audit', '--progress=false'];

  // 支持node8
  return spawnPromise('npm', [...args, ...packageList, ...npmOptions], {
    cwd: options?.cwd || process.cwd(),
  });
}

export function getPackageList(
  packages: Record<string, string>
): Array<string> {
  if (Array.isArray(packages)) {
    return packages.filter((pkg) => typeof pkg === 'string');
  }

  const entries = Object.entries(packages);

  return entries
    .filter(
      ([name, version]) =>
        (typeof name === 'string' && typeof version === 'string') ||
        typeof version === 'undefined'
    )
    .map(([name, version]) => (version ? `${name}@${version}` : name));
}
