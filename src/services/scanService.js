import request from "../utils/request";

const scanService = {
    getQcoderContent: (_public, id) => {
        return request.get(_public + '/api/report/GetQcoderContent/' + id)
    },
    scanqrcode: (_public, id) => {
        return request.get(_public + '/v2.0/api/user/scanqrcode/' + id)
    },
    scanRegister: (auth) => {
        return request.post(auth + '/api/user/oldusers/register')
    },
};

export default scanService
