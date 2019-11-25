import request from "../utils/request";

export const searchBuildingService = {
    demandDataReq: (requestData: any) => {
        return request.post(request.getUrl().api + '/v2.0/api/shops/detective/search', {body: requestData})
    },
    recommendDataReq: (requestData: any) => {
        return request.post(request.getUrl().api + '/v2.0/api/shops/detective/recommend', {body: requestData})
    }
};
