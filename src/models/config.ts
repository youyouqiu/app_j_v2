import { Model } from 'dva'
import { ConfigState } from './types'
import requestUrl from '../constants/requestUrl'
import storage from '../utils/storage'

export const INIT_GUIDE_KEY = 'f2459b83a4284586f519234eb23f735d'
export const INIT_IN_ZCZS_KEY = '4695c305a63349bda7386237d5e62114'

export default <Model>{
  namespace: 'config',
  state: <ConfigState>{
    isFirstUseApp: false,
    isFirstInZczs: false,
    requestUrl: {
      ...requestUrl.production
    },
    noticeInfo: {},
    showQuickPage: {}, // 展示快捷入口的页面
    ADVisible: false, //广告模态框可见
    willUpdate: false //获取到热更推送
  },
  effects: {
    *isFirst(_, { put }) {
      try {
        yield storage.get(INIT_GUIDE_KEY)
      } catch {
        yield put({ type: 'updateIsFirstUseApp' })
      }
    },
    *noLongerFirst(_, { put }) {
      yield storage.set(INIT_GUIDE_KEY, null)
      yield put({ type: 'updateIsFirstUseApp' })
    },
    *isFirstInZczs(_, { put }) {
      try {
        yield storage.get(INIT_IN_ZCZS_KEY)
      } catch {
        yield put({ type: 'updateIsFirstInZczs' })
      }
    },
    *noLongerFirstInZczs(_, { put }) {
      yield storage.set(INIT_IN_ZCZS_KEY, null)
      yield put({ type: 'updateIsFirstInZczs' })
    },
  },
  reducers: {
    updateIsFirstUseApp(state) {
      return { ...state, isFirstUseApp: !state.isFirstUseApp }
    },
    updateIsFirstInZczs(state) {
      return { ...state, isFirstInZczs: !state.isFirstInZczs }
    },
    updateRequestUrl(state, { payload }) {
      return { ...state, requestUrl: payload }
    },
    updateQuickPage(state, { payload }) {
      return { ...state, showQuickPage: payload }
    },
    updateNoticeInfo(state, { payload }) {
      return { ...state, noticeInfo: payload || {} }
    },
    controlADVisible(state) {
      return { ...state, ADVisible: !state.ADVisible }
    },
    controlWillUpdate(state) {
      return { ...state, willUpdate: true, ADVisible: false }
    }
  },
}
