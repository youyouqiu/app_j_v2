/**
 * 定义所有的api请求的来源
 */
export interface LocalApi {
  api: string
  upload: string
  public: string
  buryPoint: string
  cqAuth: string
  auth: string
  label: string
  AIurl: string
}

export interface apiTypes {
  local: any,
  localTesst: any,
  test: any,
  production: any,
}

export default <apiTypes>{
  local: <LocalApi>{ // 本地地址
    label: '本地环境',
    auth: 'https://dev-authenticationservice.test.xinkongjian.tech:4033',
    AIurl: 'http://192.168.100.146:5013',
    api: 'https://dev-jjrapi.test.xinkongjian.tech:4033',
    upload: 'http://192.168.100.159:5100',
    public: 'https://dev-api.test.xinkongjian.tech:4033',
    buryPoint: 'http://bp.puzhentan.com/test',
    cqAuth: 'https://dev-jjrauth.test.xinkongjian.tech:4033',
    authWeb: 'http://192.168.100.146:5012'
  },
  localTesst: <LocalApi>{ // 本地测试地址
    label: '本地测试环境',
    auth: 'https://dev-authenticationservice.test.xinkongjian.tech:4033',
    // auth: 'http://192.168.100.161:30161',
    AIurl: 'http://192.168.100.146:5013',
    api: 'https://dev-jjrapi.test.xinkongjian.tech:4033',
    // api: 'http://192.168.100.161:7000',
    upload: 'http://192.168.100.159:5100',
    public: 'https://dev-api.test.xinkongjian.tech:4033',
    // public: 'http://192.168.100.161:7001',
    buryPoint: 'http://bp.puzhentan.com/test',
    cqAuth: 'https://dev-jjrauth.test.xinkongjian.tech:4033',
    // cqAuth: 'http://192.168.100.161:5000',
    authWeb: 'http://192.168.100.146:5012',
    file: 'https://dev-file.test.xinkongjian.tech:4021'
  },
  test: <LocalApi>{ // 测试地址
    label: '测试环境',
    auth: 'https://stagging-authenticationservice.puzhentan.com',
    AIurl: 'http://192.168.100.146:5013',
    api: 'https://stagging-jjrapi.puzhentan.com',
    upload: 'https://stagging-file.puzhentan.com',
    public: 'https://stagging-api.puzhentan.com',
    buryPoint: 'http://bp.puzhentan.com/test',
    cqAuth: 'https://stagging-jjrauth.puzhentan.com',
    authWeb: 'https://stagging-jjr.puzhentan.com',
    file:'https://stagging-file.puzhentan.com'
  },
  production: <LocalApi>{ // 正式地址
    label: '',
    auth: 'https://authenticationservice.puzhentan.com',
    AIurl: 'https://bdt.puzhentan.com',
    api: 'https://jjrapi.puzhentan.com',
    upload: 'https://file-v2.puzhentan.com',
    public: 'https://api.puzhentan.com',
    buryPoint: 'http://bp.puzhentan.com/prod',
    cqAuth: 'https://jjrauth.puzhentan.com',
    authWeb: 'https://jjr.puzhentan.com',
    file:'https://file.puzhentan.com'
  },
  canary: <LocalApi>{ // 正式地址
    label: 'canary环境',
    auth: 'https://authenticationservice.puzhentan.com',
    AIurl: 'http://192.168.100.146:5013',
    api: 'https://jjrapi.puzhentan.com',
    upload: 'https://file-v2.puzhentan.com',
    public: 'https://api.puzhentan.com',
    buryPoint: 'http://bp.puzhentan.com/prod',
    cqAuth: 'https://jjrauth.puzhentan.com',
    authWeb: 'https://jjr.puzhentan.com',
    file:'https://file.puzhentan.com'
  },
}
