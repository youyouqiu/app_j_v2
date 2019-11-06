import request from '../utils/request'

export function uploadFile(api: string, addId: string, file: object) {
    return request.upload(`${api}/file/upload/${addId}`, file)
}

export function getQrCodeInfo(api: string, id: string) {
    return request.get(`${api}/api/report/GetQcoderContent/${id}`)
}

export function sendMessageAsync(api: string, condition: object) {
    return request.post(`${api}/api/User/GetCaptcha`, {
        method: 'POST',
        body: condition
    })
}

export function verifyCodeAsync(api: string, condition: object) {
    return request.post(`${api}/api/User/VerifyCaptcha`, {
        method: 'POST',
        body: condition
    })
}

export const buildingCityScreenByCityCodeReq = ({_public, code}: { _public: string, code: string }) => {
    return request.get(_public + '/api/areadefines/' + code)
};

export const shareInformation = (api: string, newsId: string) => {
    return request.post(api + '/api/article/shareinformation?newsId=' + newsId)
};
