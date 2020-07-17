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
        return request.post(`${api}/v2.0/api/customer/getwxcustomernew`, {
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

    // 号码查重
    phoneIsRepeated: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/querycusomterrepeatphones`, {
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

    // 关联客户查询
    queryRelation: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/querycustomersimplebyphone`, {
            method: 'POST',
            body: params
        })
    },

    //  关联客户
    relationCus: (api, params) => {
        return request.post(`${api}/v2.0/api/customer/wxclientcustomerbindselfcustomer`, {
            method: 'POST',
            body: params
        })
    },

    // 获取某一城市具体列表
    getCityList: (_public, params) => {
        return request.get(_public + '/api/areadefines/list/' + params + '/' + '3')
    },

    // 获取已有楼盘的所有城市
    getCity: (_public) => {
        return request.post(_public + '/api/areadefines/list', { body: { levels: ['1'] } })
    },

    //获取全国城市
    getAllCity: (_public, parentCode) => {
        return request.get(_public + `/api/areadefines/querysysareainforesponses/${parentCode}`)
    },

    // 一键报备
    quickReport: (api, params) => {
        return request.post(`${api}/api/customerreport/submit`, {
            method: 'POST',
            body: params
        })
    },

    // 报备前置接口 判断号码是否重复
    beforeQuickReport: (api, customerId) => {
        return request.get(`${api}/v2.0/api/customer/querycusomterrepeatphones/${customerId}`)
    },

    // 报备前置接口 判断是否可报备
    canReport: (api, treeid) => {
        return request.get(`${api}/v2.0/api/buildings/isreport/${treeid}`)
    },

    // 报备前置接口 获取报备模版
    getTemplate: (api, buildingTreeId) => {
        return request.get(`${api}/v2/api/customerreport/template/${buildingTreeId}`)
    },

    getFollowData: (body) => {
        return request.post(request.getUrl().api + '/v2.0/api/customer/getfollowlist', { body })
    },

    addFollow: (body) => {
        return request.post(request.getUrl().api + '/v2.0/api/customer/follow/add', { body })
    },
    followVerify: (body) => {
        return request.post(request.getUrl().api + '/v2.0/api/customer/follow/verify', { body })
    },

    /**
     * 微信客户详情
     * @version 2.3.1
     */
    dynamicNumber: (id) => {
        return request.get(`${request.getUrl().api}/v2/api/customer/wechat/dynamic/number`, true, {
            customerId: id
        })
    },
    intention: (id) => {
        return request.get(`${request.getUrl().api}/v2/api/customer/wechat/intention`, true, {
            customerId: id
        })
    },
    detailBuildingBrowse: (id) => {
        return request.get(`${request.getUrl().api}/v2/api/customer/wechat/detail/building/browse`, true, {
            customerId: id
        })
    },
    buildingTypeNumber: (id) => {
        return request.get(`${request.getUrl().api}/v2/api/customer/buildingtype/number`, true, {
            customerId: id
        })
    },

    /**
     * 微信动态
     * @version 2.3.1
     */
    weChatDev: (params) => {
        return request.post(`${request.getUrl().api}/v2.0/api/customer/queryclientcustomerbuildingtracks`, {
            method: 'POST',
            body: params
        })
    },
}

export default ApiCustom
