export interface Schema {
  name: string;
  project: string;
  path?: string;
  displayBlock?: boolean;
  inlineStyle?: boolean;
  inlineTemplate?: boolean;
  standalone?: boolean;
  viewEncapsulation?: 'Emulated' | 'None' | 'ShadowDom';
  changeDetection?: 'Default' | 'OnPush';
  style?: 'css' | 'scss' | 'sass' | 'less' | 'none';
  skipTests?: boolean;
  type?: string;
  flat?: boolean;
  skipImport?: boolean;
  selector?: string;
  module?: string;
  skipSelector?: boolean;
  export?: boolean;
  prefix?: string;
}

export interface NormalizedSchema extends Schema {
  path: string;
  projectSourceRoot: string;
  projectRoot: string;
}
