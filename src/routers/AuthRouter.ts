import {
    createStackNavigator,
    NavigationRouteConfigMap,
    StackNavigatorConfig
} from 'react-navigation'
import Login from '../pages/login'
import Register from '../pages/login/register'
import ForgetPwd from '../pages/login/forgetPwd'
import ScanPage from '../pages/publicPages/scan'
import RegistrationLogin from '../pages/publicPages/agreement/registration'
import PrivacyLogin from '../pages/publicPages/agreement/privacy'

const routeConfigMap: NavigationRouteConfigMap = {
    login: {
        screen: Login,
        navigationOptions: () => ({ header: null })
    },
    register: {
        screen: Register,
        // navigationOptions: () => ({ header: null })
    },
    forgetPwd: {
        screen: ForgetPwd,
        // navigationOptions: () => ({ header: null })
    },
    registerScan: {
        screen: ScanPage
    },
    privacyLogin:{
        screen: PrivacyLogin
    },
    registrationLogin:{
        screen: RegistrationLogin
    }
}

const stackConfig: StackNavigatorConfig = {
    defaultNavigationOptions: () => ({
        header: null,
        gesturesEnabled: true
    }),
    mode: 'modal'
}

export default createStackNavigator(routeConfigMap, stackConfig)
