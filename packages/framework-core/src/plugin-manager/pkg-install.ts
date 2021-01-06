/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { spawnPromise } from '../utils/spawn';

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
