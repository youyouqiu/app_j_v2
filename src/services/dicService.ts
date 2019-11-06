import request from "../utils/request";

const dicService = {
    dictionaryDefinesReq: ({requestUrl, requestData}: any) => {
        return request.post(requestUrl+'/api/dictionarydefines/list', {body: requestData})
    }
};

export default dicService;
