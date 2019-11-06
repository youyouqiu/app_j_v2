import request from "../utils/request";

const articleService = {
    articleTypesReq: ({requestUrl}) => {
        return request.post(requestUrl + '/api/article/queryallarticletype?appsource=2')
    },
    addViewCountReq: (api, id) => {
        return request.post(api + '/api/article/addviewcount?id=' + id)
    },
    checkBuildingStatus: (api, id) => {
        return request.get(api + '/v2.0/api/building/state/' + id)
    }
};

export default articleService
