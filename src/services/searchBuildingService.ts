import request from "../utils/request";

export const searchBuildingService = {
    detectiveSeek: (requestData: any) => {
        return request.post(request.getUrl().api + '/v2/api/shops/detective/seek', {body: requestData})
    }
};
