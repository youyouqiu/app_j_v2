import request from "../utils/request";

const scrollViewTabService = {
    getTabDataRequest: (url, requestData) => {
        return request.post(url, {body: requestData})
    },
    getMarkers: (url) => {
        return request.get(url)
    }
};
export default scrollViewTabService;
