// SAM 属性定义
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
  FileType: "FUNCTION" | "STATIC";
  FileName: string;
}
export interface IExtensionLocalFile {
  fileType: "FUNCTION" | "STATIC";
  fileName: string;
  filePath: string;
}
