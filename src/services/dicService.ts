import request from "../utils/request";

const dicService = {
    dictionaryDefinesReq: ({requestData}: any) => {
        return request.post(request.getUrl().public+'/api/dictionarydefines/list', {body: requestData})
    }
};

export default dicService;
