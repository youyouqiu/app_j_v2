//  客户管理Api

import request from '../utils/request'

const ApiCustom = {
    // 列表 及 搜索
    cusList: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/getlist`, {
            method: 'POST',
            body: params
        })
    },

    // 客户详情
    cusDetail: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/getselfcustomer`, {
            method: 'POST',
            body: params
        })
    },

    // 微信客户详情
    wechatCusDetail: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/getwxcustomer`, {
            method: 'POST',
            body: params
        })
    },

    // 新增客户
    addCustom: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/postcustomerinfo`, {
            method: 'POST',
            body: params
        })
    },

    // 修改客户
    updateCustom: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/putcustomerinfo`, {
            method: 'PUT',
            body: params
        })
    },

    // 删除客户
    deleteCus: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/delete`, {
            method: 'DELETE',
            body: params
        })
    },

    // 微信动态
    weChatDev: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/queryclientcustomerbuildingtracks`, {
            method: 'POST',
            body: params
        })
    },

    // 关联客户查询
    queryRelation: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/querycustomersimplebyphone`,{
            method: 'POST',
            body: params
        })
    },

    //  关联客户
    relationCus: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/wxclientcustomerbindselfcustomer`,{
            method: 'POST',
            body: params
        })
    },

    // 获取城市列表
    getCityList: (_public, params) => {
        // `${api}/api/areadefines/list/${params}/${3}`
        return request.get(_public + '/api/areadefines/list/' + params + '/' + '3')
    },

    // 一键报备
    quickReport: (api, params) => {
        return request.post(`${api}/api/customerreport/addtransactions`,{
            method: 'POST',
            body: params
        })
    }
}

export default ApiCustom
