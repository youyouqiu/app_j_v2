import {
    NavigationContainerComponent,
    NavigationBackActionPayload,
    NavigationActions,
    NavigationParams
} from 'react-navigation'

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
}

export default navigation
export {
    navigator,
    setNavigator
}
