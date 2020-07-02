// SAM 属性定义
export interface ISAM {
  TCBSAMFormatVersion: string;
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
    Type: string;
    Properties: any[];
    DependsOn: string[];
  }[];
}
