import { Model } from 'dva'
import storage from '../utils/storage'
import BuryPoint from '../utils/BuryPoint'
import {getUserInfo} from '../services/auth'
const userModel: Model = {
    namespace: 'user',
    state: {
        userInfo: {},
        status: 404, // 401: 登录之后token认证失效， 200：正常用户， 404：未登录  , 202 自由经纪人
        refresh_token: '',
        access_token: null,
        jpushID: ''
    },
    effects: {
        *updateUserAsync({ payload }, { select, put }) { // 更新跟用户所有有关的信息
            let user = yield select((state: any) => state.user)
            user = {
                ...user,
                ...payload
            }
            // yield call(storage.save, {key: 'user', data: JSON.stringify(userInfo), expires: null})to
            if (user.status === 200) {
                BuryPoint.setLogBodyData({
                    userid: user.userInfo.id,
                })
            }
            storage.set('user', user)
            yield put({
                type: 'updateUserComplete',
                payload: user
            })
        },
        *interfaceUpdateUserAsync({ payload }, { select, put, call }) { // 通过接口拿去用户信息，只处理用户信息，状态还是从本地storage中拿去
            try {
                let user = yield select((state: any) => state.user)
                let {access_token} = payload
                let res = yield call(getUserInfo, access_token)
                let {extension} = res
                user = { // 用户信息来源还是从本地读取，传过来的，以及重新接口拿去的数据组合
                    ...user,
                    ...payload,
                    userInfo: extension,
                    status: extension.filialeId && extension.filialeId !== '10000' ? 200 : 202, // 更新用户状态
                }
                storage.set('user', user)
                yield put({
                    type: 'updateUserComplete',
                    payload: user
                })
            }catch (e) {
            }
            
        }
    },
    reducers: {
        updateUserComplete(state, { payload }) {
            return { ...state, ...payload }
        },
        updateUserInfo(state, { payload }) {
            let userInfo = { ...state.userInfo, ...payload }
            return { ...state, userInfo }
        },
        updateJpushId(state, { payload }) {
            return { ...state, ...{ jpushID: payload } }
        }
    },
}

export default userModel
