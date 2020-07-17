import {Model} from 'dva'
import storage from '../utils/storage'
import BuryPoint from '../utils/BuryPoint'
import {getUserInfo} from '../services/auth'
import {getUserInfo as storageGetUser} from '../utils/storage'
import {Reducer} from 'redux'
import {Effect} from 'dva'
import {IUserInfo} from '@/services/typings/user'

export interface UserModelState {
  userInfo?: IUserInfo
  status?: 200 | 401 | 404 | 202  // 401: 登录之后token认证失效  200 正常登录用户  404 还未登录
  refresh_token?: string
  access_token?: string
  jpushID?: ''
}

export interface UserModelType extends Model {
  namespace: 'user'
  state: UserModelState
  effects: {
    updateUserAsync: Effect
    interfaceUpdateUserAsync: Effect
  }
  reducers: {
    updateUserComplete: Reducer<UserModelState>
    updateUserInfo: Reducer<UserModelState>
    updateJpushId: Reducer<UserModelState>
    cleanUserInfo: Reducer<UserModelState>
  }
  subscriptions: {}
}

const userModel: UserModelType = {
  namespace: 'user',
  state: {
    userInfo: {},
    status: 404, // 401: 登录之后token认证失效， 200：正常用户， 404：未登录  , 202 自由经纪人
    refresh_token: '',
    access_token: undefined,
  },
  effects: {
    * updateUserAsync({payload}, {select, put, call}) { // 更新跟用户所有有关的信息
      let user = yield select((state: any) => state.user)
      user = {
        ...user,
        ...payload
      }
      yield call(storage.set, 'user', user)
      if (user.status === 200) {
        BuryPoint.setLogBodyData({
          userid: user.userInfo.id,
        })
      }
      // storage.set('user', user)
      yield put({
        type: 'updateUserComplete',
        payload: user
      })
    },
    * interfaceUpdateUserAsync({payload}, {select, put, call}) { // 通过接口拿去用户信息，只处理用户信息，状态还是从本地storage中拿去
      try {
        let user = yield select((state: any) => state.user)
        if (!payload) {
          payload = yield call(storageGetUser)
        }
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
      } catch (e) {
        console.log(e)
      }
    }
  },
  reducers: {
    updateUserComplete(state, {payload}) {
      return {...state, ...payload}
    },
    updateUserInfo(state, {payload}): any {
      let userInfo = {...state?.userInfo, ...payload}
      return {...state, userInfo}
    },
    updateJpushId(state, {payload}) {
      return {...state, ...{jpushID: payload}}
    },
    cleanUserInfo(state, {payload}) {
      const newState: UserModelState = {
        jpushID: state?.jpushID, // jpushId不应该清除
        userInfo: {},
        status: 404,  // 401: 登录之后token认证失效  200 正常登录用户  404 还未登录
        refresh_token: '',
        access_token: '',
      };
      return newState
    },
  },
  subscriptions: {}
}

export default userModel
