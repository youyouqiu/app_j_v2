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
}
export interface apiTypes {
    local: any,
    localTesst: any,
    test: any,
    production: any,
}

export default <apiTypes> {
    local: <LocalApi>{ // 本地地址
        label: '本地环境',
        auth: 'https://dev-authenticationservice.test.xinkongjian.tech:4033',
        api: 'http://192.168.100.161:7000',
        upload: 'http://192.168.100.159:5100',
        public: 'http://192.168.100.161:7001',
        buryPoint: 'http://bp.puzhentan.com/test',
        cqAuth: 'http://192.168.100.161:5000',
    },
    localTesst: <LocalApi> { // 本地测试地址
        label: '本地测试环境',
        auth: 'https://dev-authenticationservice.test.xinkongjian.tech:4033',
        api: 'http://rd.xinkongjian.tech:7000',
        upload: 'http://192.168.100.159:5100',
        public: 'http://rd.xinkongjian.tech:7001',
        buryPoint: 'http://bp.puzhentan.com/test',
        cqAuth: 'http://192.168.100.146:5000',
    },
    test: <LocalApi> { // 测试地址
        label: '测试环境',
        auth: 'https://stagging-authenticationservice.puzhentan.com',
        api: 'https://stagging-jjrapi.puzhentan.com',
        upload: 'https://stagging-file.puzhentan.com',
        public: 'https://stagging-api.puzhentan.com',
        buryPoint: 'http://bp.puzhentan.com/test',
        cqAuth: 'https://stagging-jjrauth.puzhentan.com'
    },
    production: <LocalApi> { // 正式地址
        label: '',
        auth: 'https://authenticationservice.puzhentan.com',
        api: 'https://jjrapi-v2.puzhentan.com',
        upload: 'https://file-v2.puzhentan.com',
        public: 'https://api-v2.puzhentan.com',
        buryPoint: 'http://bp.puzhentan.com/prod',
        cqAuth: 'https://jjrauth-v2.puzhentan.com'
    }
}