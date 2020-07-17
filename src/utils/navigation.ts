import {
    NavigationContainerComponent,
    NavigationBackActionPayload,
    NavigationActions,
    NavigationParams,
    StackActions,
    NavigationPushAction
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
    push: (route: NavigationPushAction) => {
      navigator.dispatch(StackActions.push(route));
    },
    noticeNavigate: (noticeInfo: NoticeInfo) => { // 处理消息推送的路由跳转
        let params: any
        switch (noticeInfo.url) {
            case 'xkjWebView':
            case 'webView': params = {title: noticeInfo.title, url: noticeInfo.id}; break;
            case 'buildingDetail': params = {buildingTreeId: noticeInfo.id || noticeInfo.buildingTreeId}; break
            case 'textDetail': params = {id: noticeInfo.pushId}; break
            case 'stationHelper': params = {}; break
            // 项目动态
            case 'buildingTrends': params = { buildingTreeId: noticeInfo.buildingTreeId, buildingTreeName: '' }; break
            case 'dynamicLogging': params = { id: noticeInfo.customerId, buildingTreeName: '' }; break
            case 'singDetail': params = noticeInfo; break
            case 'visitDetail': params = noticeInfo; break
            default: ;
        }
        params && noticeInfo?.url &&  navigation.push({
          type: 'Navigation/PUSH',
          routeName: noticeInfo?.url,
          params
        })
    }
}

export default navigation
export {
    navigator,
    setNavigator
}
