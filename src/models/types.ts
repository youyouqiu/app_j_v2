import { LocalApi } from '../constants/requestUrl'

// config model
interface showQuickPage {
    routeName?: string
}
export interface ConfigState {
    requestUrl: LocalApi
    showQuickPage: showQuickPage
    isFirstUseApp: boolean
}
