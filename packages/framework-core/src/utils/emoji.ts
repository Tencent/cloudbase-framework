/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { platform } from 'os';

export function emoji(text: string, fallback?: string) {
  if (platform() === 'win32') {
    return fallback || '◆';
  }
  return text;
}
