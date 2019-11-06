import request from '../utils/request'

export function login (api, condition) {
    return request.postFormUrlEncode(`${api}/connect/token`, {
        method: 'POST',
        body: condition,
    })
}

export function getUserPermission (condition) {
    return request.post(`${request.getUrl().cqAuth}/api/Permission/each`, {
        method: 'POST',
        body: condition
    })
}

export function getUserInfo (token) {
    return request.get(`${request.getUrl().cqAuth}/v2/api/user/info`, null, null, token)
}

export function register (api, condition) {
    return request.post(`${api}/v2/api/user/update`, {
        method: 'PUT',
        body: condition
    })
}

export function refreshToken (condition) {
    return request.postFormUrlEncode(`${request.getUrl().auth}/connect/token`, {
        method: 'POST',
        body: condition
    })
}

export function updateUserBasic (api, condition) {
    return request.post(`${api}/v2/api/user/update/center`, {
        method: 'PUT',
        body: condition
    })
}

export function setUserExtension (condition, token) {
    return request.post(`${request.getUrl().cqAuth}/api/user/extensions`, {
        method: 'POST',
        body: condition
    }, token)
}

export function updateUser (api, condition) {
    return request.post(`${api}/v2/api/user/update`, {
        method: 'PUT',
        body: condition
    })
}

export function joinCompany (api, condition) {
    return request.post(`${api}/api/user/oldusers/register`, {
        method: 'POST',
        body: condition
    })
}

export function getQRCodeAsync (api) {
    return request.get(`${api}/v2.0/api/userinfo/filialeqrcode`)
}

export function resetQRCodeAsync (api) {
    return request.get(`${api}/v2.0/api/userinfo/resetfilialeqrcode`)
}

export function getSettingInfo (api) {
    return request.get(`${api}/v2/api/user/push/get`)
}

export function setSettingInfo (api, condition) {
    return request.post(`${api}/v2/api/user/push/setting`, {
        method: 'PUT',
        body: condition
    })
}

export function leaveCom (api, id) {
    return request.post(`${api}/api/user/leavecompany/${id}`, {
        method: 'DELETE'
    })
}

export function getReportNum (api) {
    return request.get(`${api}/api/customerreport/userstat`)
}

export function phoneModifyPwd (api, condition) {
    return request.post(`${api}/api/User/PasswordBack`, {
        method: 'PUT',
        body: condition
    })
}
