import { Model } from 'dva'

const searchModel: Model = {
  namespace: 'search',
  state: {
    data: [],
    cache: [],
    useCache: false,
    loading: false,
    refreshing: false,
    multiCache: [],  // 多个搜索页面数据互不干扰
  },
  reducers: {
    updateData: (state, { payload }) => ({
      ...state,
      data: payload,
    }),
    updateInternal: (state, { payload }) => {
      return {
        ...state,
        data: state.data.map((i: any) => {
          return i.key === payload._key ? {
            ...i,
            data: payload.dataSource,
          } : i
        }),
      }
    },
    updateLoading: (state, { payload }) => ({
      ...state,
      loading: payload,
    }),
    updateRefreshing: (state, { payload }) => ({
      ...state,
      refreshing: payload,
    }),
    openCache: state => ({
      ...state,
      useCache: true,
      cache: state.data,
    }),
    closeCache: state => ({
      ...state,
      useCache: false,
      data: state.cache,
    }),
    pushMultiCache: ({ multiCache, ...restState }) => ({
      ...restState,
      multiCache: multiCache.concat(restState),
    }),
    popMultiCache: ({ multiCache }) => ({
      ...multiCache.pop(),
      multiCache,
    }),
  },
}

export default searchModel
