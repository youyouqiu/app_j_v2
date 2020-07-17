import request from "../utils/request";

const scanService = {
  getQcoderContent: (id) => {
    return request.get(request.getUrl().public + '/api/report/GetQcoderContent/' + id)
  },
  scanqrcode: (_public, id) => {
    return request.get(_public + '/v2.0/api/user/scanqrcode/' + id)
  },
  scanRegister: (auth) => {
    return request.post(auth + '/api/user/oldusers/register')
  },
  saveQrCodeNumber: (id) => {
    return request.get(request.getUrl().api + '/api/baseqrcode/saveqrcodenumber?qrcodeid=' + id)
  },
  getQcoderContentByWexin: (id) => {
    return request.get(request.getUrl().api + `/api/baseqrcode/getqcodercontentbywx?wxUrl=${id}`)
  },
};

export default scanService
