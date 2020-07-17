import React from 'react'
// @ts-ignore
import { create } from 'dva-core'
// @ts-ignore
import createLoading from 'dva-loading'
import { DvaOption, DvaInstance, Model } from 'dva'
import { Provider } from 'react-redux'
import { Store } from 'redux'

interface Options extends DvaOption {
  models: Array<Model>
}
interface Instance extends DvaInstance {
  _store: Store
  getStore: () => any
}

export default (options: Options) => {
  const { models, ...rest } = options

  const app: Instance = create(rest)

  if (!global.dvaRegistered) models.forEach(model => app.model(model))
  global.dvaRegistered = true

  app.start()
  app.use(createLoading())

  const store = app._store
  app.start = container => () => <Provider store={store}>{container}</Provider>
  app.getStore = () => store
  global.store = store

  return app
}
