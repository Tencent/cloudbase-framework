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
