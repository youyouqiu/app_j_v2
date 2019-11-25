/**
 * 报备管理接口
 */

import request from './../utils/request';

// 报备列表
export function reportDataApi (api, body) {
    return request.post(`${api}/v2.0/api/customerreport/search`, {
        method: 'POST',
        body: body,
    })
}

// 报备列表数量
export function reportCountApi (api) {
    return request.get(`${api}/v2.0/api/customerreport/searchtotal`)
}

// 二维码信息
export function qCoderDataApi (api, reportId) {
    return request.get(`${api}/api/customerreport/getdetails/${reportId}`)
}

// 二维码信息
export function qCoderDataApi_followUp (api, reportId) {
    return request.get(`${api}/v2.0/api/customerreport/report/details/${reportId}`)
}

// 录入到访信息
export function VisitInfoDataApi (api, body) {
    return request.post(`${api}/v2.0/api/customerreport/broker/ConfirmBeltLook`, {
        method: 'POST',
        body: body,
    })
}

// 到访详情
export function visitDetailDataApi (api, reportId) {
    return request.get(`${api}/v2.0/api/customerreport/beltlook/details/${reportId}`)
}

// 楼盘信息
export function buildingDetailDataApi (api, reportId) {
    return request.get(`${api}/v2.0/api/buildings/details/${reportId}`)
}

// 楼盘封面图片信息
export function buildingImageDataApi (api, reportId) {
    return request.get(`${api}/v2.0/api/buildings/files/${reportId}`)
}

// 驻场信息
export function onsiteDataApi (api, body) {
    return request.post(`${api}/v2.0/api/signing/onsite`, {
        method: 'POST',
        body: body,
    })
}

// 楼盘列表
export function buildingDataApi (api, body) {
    return request.post(`${api}/api/buildings/listreport`, {
        method: 'POST',
        body: body,
    })
}

// 报备规则
export function ruleDataApi (api, buildingId) {
    return request.get(`${api}/api/buildings/reporting/rules/${buildingId}`)
}

// 新增报备
export function addReportDataApi (body) {
    return request.post(`${request.getUrl().api}/api/customerreport/addtransactions`, {
        method: 'POST',
        body: body,
    })
}

export function verifyReport (body) {
    return request.post(`${request.getUrl().api}/api/customerreport/report/verify`, {
        method: 'POST',
        body: body,
    })
}
