/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
export interface ISAM {
  TCBSAMFormatVersion: string;
  Name: string;
  License: string;
  Description: string;
  Category: string;
  Tags: string[];
  SourceUrl: string;
  ReleaseNotesUrl: string;
  IconUrl: string;
  IntroUrl: string;
  ChangeLog: {
    Title: String;
    Content: any[];
  }[];
  Globals: Record<string, any>;
  SourceDir: string;
  SourceBranch: string;
  Author: {
    AuthorName: string;
    Email: string;
    Url: string;
  };
  Contributors: {
    AuthorName: string;
    Email: string;
    Url: string;
  }[];

  Resources: {
    [key: string]: {
      Type: string;
      Properties: any[];
      DependsOn: string[];
    };
  };

  Config: {
    Login: {
      Platform: string;
      PlatformId?: string;
      PlatformSecret?: string;
      Status: string;
    }[];
  };
}

export interface IExtensionFile {
  FileType: 'FUNCTION' | 'STATIC';
  FileName: string;
}
export interface IExtensionLocalFile {
  fileType: 'FUNCTION' | 'STATIC';
  fileName: string;
  filePath: string;
}
