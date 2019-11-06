import { Model } from 'dva'
import { ConfigState } from './types'
import requestUrl from '../constants/requestUrl'
import storage from '../utils/storage'

export const INIT_GUIDE_KEY = 'f2459b83a4284586f519234eb23f735d'

export default <Model>{
  namespace: 'config',
  state: <ConfigState>{
    isFirstUseApp: false,
    requestUrl: {
      ...requestUrl.production
    },
    showQuickPage: {}, // 展示快捷入口的页面
    noticeInfo: {},
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
  },
  reducers: {
    updateIsFirstUseApp(state) {
      return { ...state, isFirstUseApp: !state.isFirstUseApp }
    },
    updateRequestUrl(state, { payload }) {
      return { ...state, requestUrl: payload }
    },
    updateQuickPage(state, { payload }) {
      return { ...state, showQuickPage: payload }
    },
    updateNoticeInfo(state, { payload }) {
      return { ...state, noticeInfo: payload }
    }
  },
}
