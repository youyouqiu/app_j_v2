import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard, Animated, Dimensions, Platform} from 'react-native';
import {scaleSize} from '../../utils/screenUtil'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PhoneLogin from './phoneLogin'
import AccountLogin from './accountLogin'
import {connect} from 'react-redux'
import storage from '../../utils/storage'
import requestUrl from '../../constants/requestUrl'
const ios = Platform.OS === 'ios'
const {height} = Dimensions.get('window')

class Login extends Component {


    constructor(props) {
        super(props)
        this.keyboardHeight = new Animated.Value(scaleSize(181))
        this.state = {
            environment: null
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'user/updateUserAsync',
            payload: {
                status: 404,
                userInfo: {},
                access_token: null,
                refresh_token: null
            }
        })
        // this.props.dispatch({type: 'global/cleanLocation',});
        storage.get('currentEnvironment').then(res => {
            this.setState({
                environment: res
            })
        })

        if (ios) {
            this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardDidShow)
            this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide)
        } else {
            this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
            this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
        }

    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardDidShow = (event) => {
        // console.log(event)
        let boardHeight = event.endCoordinates.height
        let moreHeight = height - scaleSize(1100) // 页面高度减去内容页高度
        if (moreHeight > boardHeight) {
            return
        } else {
            Animated.parallel([
                Animated.timing(this.keyboardHeight, {
                    duration: 250,
                    toValue: scaleSize(181) - (boardHeight - moreHeight),
                }),
            ]).start()
        }

    }

    keyboardDidHide = () => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: 250,
                toValue: scaleSize(181),
            }),
        ]).start();
    }

    touristLogin = () => {
        this.props.navigation.navigate('AppRouter', 'hasdias')
    }

    changeDev = () => {
        storage.set('currentEnvironment', 'localTesst')
    }

    gotoPage = (path) => {
        this.props.navigation.navigate(path)
    }

    render() {
        let {environment} = this.state
        return (
            <Animated.View style={[styles.content, {marginTop: this.keyboardHeight}]}>
                <View style={[styles.content]}>
                    <View style={[styles.header]}>
                        <Text style={[styles.hello]}>Hello</Text>
                        <Text style={[styles.welcome]}>欢迎来到铺侦探！</Text>
                    </View>
                    <ScrollableTabView
                        locked={true}
                        initialPage={0}
                        style={{maxHeight: scaleSize(594), borderBottomWidth: 0}}
                        tabBarTextStyle={{color: '#4D4D4D', fontSize: scaleSize(28)}}
                        tabBarUnderlineStyle={{backgroundColor: '#3AD047', height: scaleSize(6), width: scaleSize(60)}}
                        tabBarActiveTextColor='#000'
                        tabBarInactiveTextColor='#868686'
                        tabBarTextStyle={{fontWeight: '500', fontSize: scaleSize(28)}}
                        tabBarStyle={{height: scaleSize(60)}}
                    >
                        <PhoneLogin tabLabel='手机号登录'/>
                        <AccountLogin tabLabel='账号登录' navigation={this.props.navigation}/>
                    </ScrollableTabView>
                    <View style={[styles.tourist]}>
                        <TouchableOpacity onPress={() => this.touristLogin()}>
                            <Text style={[styles.touristText]}>{`游客模式 ${(requestUrl[environment] || {}).label || ''}`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.registerProtocol}>
                    <Text style={styles.agreeTextWrap}>
                        <Text style={styles.agreeText}>注册及登录即代表同意</Text>
                        《 <Text onPress={() => this.gotoPage('registrationLogin')} style={styles.agreeProtocolText}> 铺侦探服务协议 </Text> 》及
                        《 <Text onPress={() => this.gotoPage('privacyLogin')} style={styles.agreeProtocolText}> 隐私政策 </Text> 》
                    </Text>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        // marginTop: scaleSize(181),
        flex: 1
    },
    registerProtocol: {
        marginBottom: scaleSize(44),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    agreeTextWrap: {
        fontSize: scaleSize(22)
    },
    agreeProtocolText: {
        color: '#1F3070'
    },
    header: {
        marginLeft: scaleSize(83),
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: scaleSize(115)
    },
    hello: {
        fontSize: scaleSize(46),
        fontWeight: '500',
        color: '#000',
        lineHeight: scaleSize(65)
    },
    welcome: {
        color: '#868686',
        fontSize: scaleSize(28),
        fontWeight: '400',
        lineHeight: scaleSize(45),
        marginLeft: scaleSize(16)
    },
    tourist: {
        marginTop: scaleSize(97),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touristText: {
        color: '#1F3070',
        fontSize: scaleSize(28),
        fontWeight: '400'
    }
})

const mapStateToProps = ({config, user})=> {
    return {config, user}
}
export default connect(mapStateToProps)(Login)
