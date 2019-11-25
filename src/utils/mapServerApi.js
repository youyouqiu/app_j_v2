import request from './request';
// import console = require('console');
//关键字查询
export const BaiduKeywordsSearch = (params,citycode) => {
    let url = `https://api.map.baidu.com/place/v2/suggestion?query=${params}&scope=2&region=${citycode}&city_limit=true&output=json&ak=BvbGX2GsoWdpmmZAbT4YhjwVNyx0pSFI`
    return request.getPure(url)
        .then(res=>{return res})
}

//坐标转换（高德转百度）
export const ChangeCoords = (params,from,to) => {
    let url = `https://api.map.baidu.com/geoconv/v1/?coords=${params}&from=${from}&to=${to}&ak=BvbGX2GsoWdpmmZAbT4YhjwVNyx0pSFI`
    return request.getPure(url)
        .then(res=>{return res})
}

// 坐标逆解码
export const geocoder = (lat, lng) => {
    let url = `https://api.map.baidu.com/geocoder/v2/?location=${lat},${lng}&output=json&pois=1&latest_admin=1&ak=BvbGX2GsoWdpmmZAbT4YhjwVNyx0pSFI`
    return request.getPure(url)
        .then(res=>{return res})
}

export const mapSearch = (lat, lng, query, size = 3) => {
    let url = `http://api.map.baidu.com/place/v2/search?query=${query}&location=${lat},${lng}&radius=2000&page_size=${size}&page_num=0&scope=2&output=json&ak=BvbGX2GsoWdpmmZAbT4YhjwVNyx0pSFI`
    console.log(url)
    return request.getPure(url)
        .then(res=>{return res})
}
export default { ChangeCoords,BaiduKeywordsSearch,geocoder}
