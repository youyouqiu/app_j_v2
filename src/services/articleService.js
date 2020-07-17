import request from "../utils/request";

const articleService = {
    articleTypesReq: (obj) => {
        return request.post(request.getUrl().api + '/api/article/queryallarticletypes', {body: obj})
    },
    addViewCountReq: (api, id) => {
        return request.post(api + '/api/article/addviewcount?id=' + id)
    },
    checkBuildingStatus: (api, id) => {
        return request.get(api + '/v2.0/api/building/state/' + id)
    }
};

export default articleService
