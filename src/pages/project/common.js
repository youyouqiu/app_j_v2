import locationApi from "@/services/location";
import projectService from "@/services/projectService";

export const getLocationInfo = async (params) => {
    console.log('_getLocationInfo', params);
    return new Promise(async (resolve, reject) => {
        const coordinate = await locationApi.fetchCoordinate();
        let locationInfo = await locationApi.fetchLocationInfo(coordinate);//定位城市信息
        const {location, addressComponent} = locationInfo.result;
        const {lng, lat} = location;
        const {city} = addressComponent;
        let cityList = params.cityList;
        if (params.cityList.length === 0) {
            const result = await projectService.cityListReq({levels: [1]}).catch(err => {
                console.log('获取城市失败：', err)
            });
            cityList = (result && result.extension) || []
        }
        if (!city) reject();
        let currentCity = cityList.find((x) => x.name === city.substr(0, city.length - 1));
        const cityName = (currentCity && currentCity.name) || '';
        const cityCode = (currentCity && currentCity.code) || '';
        const resolveData = {
            cityName, cityCode, lng, lat, cityList
        };
        resolve(resolveData)
    })
};

