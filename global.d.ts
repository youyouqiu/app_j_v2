import { Store } from 'redux'

declare global {
  namespace NodeJS {
    interface Global {
      store: Store
      dvaRegistered?: boolean
    }
  }
}
