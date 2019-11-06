import request from "../utils/request";

const buildingService = {
    getCityList: (config,postData) => {
        return request.post(config.public + `/api/areadefines/list`,{body:postData})
    }
};

export default buildingService
