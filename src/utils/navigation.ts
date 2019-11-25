import {
    NavigationContainerComponent,
    NavigationBackActionPayload,
    NavigationActions,
    NavigationParams
} from 'react-navigation'
import {NoticeInfo} from '../models/types'

let navigator: NavigationContainerComponent

const setNavigator = (navigatorRef: NavigationContainerComponent) => {
    navigator = navigatorRef
}

const navigation = {
    navigate: (routeName: string, params?: NavigationParams) => {
        navigator.dispatch(NavigationActions.navigate({ routeName, params }))
    },
    goBack: (routeName?: NavigationBackActionPayload) => {
        navigator.dispatch(NavigationActions.back(routeName));
    },
    noticeNavigate: (noticeInfo: NoticeInfo) => { // 处理消息推送的路由跳转
        let params: any
        switch (noticeInfo.url) {
            case 'webView': params = {title: noticeInfo.title, url: noticeInfo.id}; break;
            case 'buildingDetail': params = {buildingTreeId: noticeInfo.id};break
            case 'textDetail': params = {id: noticeInfo.pushId};break
            default: ;
        }
        navigation.navigate(noticeInfo.url || '', params)
    }
}

export default navigation
export {
    navigator,
    setNavigator
}
