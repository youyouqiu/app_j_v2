import React, { PureComponent } from 'react'
import {
    ScrollView, StatusBar, ImageBackground, ListRenderItem,
    View, Text, Image, FlatList, TouchableOpacity, RefreshControl, Platform, DeviceEventEmitter
} from 'react-native'
import { connect, MapStateToProps, DispatchProp } from 'react-redux'
import { NavigationScreenProps, NavigationEventSubscription } from 'react-navigation'
import { ConfigState } from '../../models/types'
import { scaleSize } from '../../utils/screenUtil'
import { checkPermission, verifyUser } from '../../utils/utils'
import { getWeatherIcon } from '../../utils/weather'
import { Toast } from 'teaset'
import messageApi, {
    WaitMessageResponseListItem,
    ReadConditions,
    GetCustomerDynamicExtension,
} from '../../services/message'
import adApi, {
    GetAdvertisingsConditions,
    GetAdvertisingsResponseExtensionListItem,
} from '../../services/advertising'
// @ts-ignore
import QuickEntry from '../../businessComponents/quickEntry'
import EntryIcon from '../../businessComponents/EntryIcon'
// @ts-ignore
import Shadow from '../../components/Shadow'
import VerticalSwiper from '../../components/VerticalSwiper'
import styles from './styles'
import tracking, { PageTimer } from '../../utils/BuryPoint'
import InitGuide from './InitGuide'
import projectService from "../../services/projectService";

interface TStateProps {
    config: ConfigState
    user: any
    guest: boolean
    location: any
    weather: any
}

interface State {
    dtInfo: GetCustomerDynamicExtension
    backlog: {
        total: number
        list: WaitMessageResponseListItem[]
    }
    headline: GetAdvertisingsResponseExtensionListItem[]
    refreshing: boolean
}

class Workbench extends PureComponent<NavigationScreenProps & TStateProps & DispatchProp, State> {
    // @ts-ignore
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        if (params) {
            return {
                tabBarVisible: params.tabBarVisible
            }
        }
    }

    state = {
        dtInfo: {} as GetCustomerDynamicExtension,
        backlog: {
            total: 0,
            list: [] as WaitMessageResponseListItem[],
        },
        headline: [] as GetAdvertisingsResponseExtensionListItem[],
        refreshing: false,
    }
    didFocusListener?: NavigationEventSubscription
    didBlurListener?: NavigationEventSubscription
    pageTimer: PageTimer = new PageTimer()

    componentDidMount() {
        const { navigation } = this.props
        this.didFocusListener = navigation.addListener('didFocus', this.navigationDidFocus)
        this.didBlurListener = navigation.addListener('didBlur', this.navigationDidBlur)
        if (this.props.config.isFirstUseApp) {
            navigation.setParams({ tabBarVisible: false })
        }
    }

    componentWillUnmount() {
        this.didFocusListener!.remove()
        this.didBlurListener!.remove()
    }

    // 进入页面
    navigationDidFocus = () => {
        DeviceEventEmitter.emit('initMessage') // 进入页面的时候调用获取消息  因为静默消息的原因临时处理
        this.pageTimer.start()
        this.getDtInfo()
        this.getBacklog()
        this.getHeadlines()
    }

    // 离开页面
    navigationDidBlur = () => {
        this.pageTimer.stop()
        tracking.add({
            action: 'view',
            page: '工作台',
            target: '页面',
            action_param: {
                duration: this.pageTimer.duration
            },
        })
    }

    // 请求客户动态接口
    fetchDtInfo = () => {
        return messageApi.dtInfo(this.props.config.requestUrl.api)
    }

    // 请求待办提示接口
    fetchBacklog = () => {
        return messageApi.waitMessage(this.props.config.requestUrl.api)
    }

    // 请求关闭待办提示接口
    putCloseBacklog = (id: string) => {
        return messageApi.closeBacklog(this.props.config.requestUrl.api, id)
    }

    // 请求阅读消息接口
    putRead = (conditions: ReadConditions) => {
        return messageApi.readDt(this.props.config.requestUrl.api, conditions)
    }

    // 请求头条接口
    fetchHeadline = (conditions: GetAdvertisingsConditions) => {
        return adApi.getAdvertisings(this.props.config.requestUrl.public, conditions)
    }

    // 获取客户动态data
    getDtInfo = async () => {
        if (this.props.guest) return
        try {
            const { extension } = await this.fetchDtInfo()
            this.setState({ dtInfo: extension })
        } catch (e) {
            console.log('getDtInfo error:', e)
            // TODO
        }
    }

    // 获取待办提示data
    getBacklog = async () => {
        if (this.props.guest) return
        try {
            const { extension } = await this.fetchBacklog()
            this.setState({
                backlog: {
                    total: extension.messageTotal,
                    list: extension.waitMessageList,
                }
            })
        } catch (e) {
            console.log('getBacklog error:', e)
            // TODO
        }
    }

    // 获取头条data
    getHeadlines = async () => {
        const conditions: GetAdvertisingsConditions = {
            site: 'BROKER_HOME_HEADLINE',
            cityId: this.props.location.conversionCode,
            app: 1,
        }
        try {
            const { extension } = await this.fetchHeadline(conditions)
            this.setState({ headline: extension })
        } catch (e) {
            console.log('getHeadlines error:', e)
            // TODO
        }
    }

    // 点击客户动态
    handlePressCustomerDynamic = async () => {
        await verifyUser('stronge')
        const { guest, navigation } = this.props
        const { dtInfo } = this.state
        tracking.add({ page: '工作台', target: '客户动态_button' })
        if (guest) {
            navigation.navigate('AuthRouter');
            return
        }
        const conditions = {
            type: dtInfo.type
        }
        this.putRead(conditions).catch(e => console.log('read error:', e))
        navigation.navigate('messageDetail', { type: 3, init: this.getDtInfo })
    }

    // 头条跳转 webView
    gotoWebView = (item: GetAdvertisingsResponseExtensionListItem) => {
        const { navigation, config, location } = this.props
        tracking.add({
            page: '工作台',
            target: '头条消息_button',
            action_param: {
                inforid: item.id,
            },
        });
        const reqParams = {
            adId: item.id,
            app: 1,
            source: Platform.OS === 'ios' ? 1 : 2,
            userId: (this.props.user.userInfo || {}).id,
            cityId: (location && location.conversionCode) || '500000'
        };
        projectService.addVisitReq(config.requestUrl.public, reqParams);


        if (item.jumpType === 0) {
            navigation.navigate('webView', {
                title: item.adName,
                url: item.link,
            })
        }
        if (item.jumpType === 3) {
            navigation.navigate('buildingDetail', {
                buildingTreeId: item.link,
            })
        }
    }

    // 刷新页面
    handleRefresh = () => {
        this.props.dispatch({ type: 'location/getLocationInfo' })
        this.setState({ refreshing: true }, async () => {
            await this.getDtInfo()
            await this.getBacklog()
            await this.getHeadlines()
            this.setState({ refreshing: false })
        })
    }

    // 重新定位
    handleRelocation = async () => {
        if (await checkPermission('location')) {
            this.props.dispatch({ type: 'location/getLocationInfo' })
        }
    }

    // 关闭待办提示
    handleCloseBacklog = (item: WaitMessageResponseListItem) => {
        try {
            this.putCloseBacklog(item.messageId)
            this.setState(({ backlog }) => ({
                backlog: {
                    total: backlog.total - 1,
                    list: backlog.list.filter(i => i.messageId !== item.messageId)
                }
            }))
        } catch (e) {
            Toast.message(e.message)
        }
    }

    // 跳转页面
    gotoBacklogPage = (item: WaitMessageResponseListItem) => {
        tracking.add({ page: '工作台', target: '待办提示跳转详情_button' })
        let url = ''
        switch (item.messageType) {
            case 'ReportRepetition': // 报备重客,,
            case 'RemindComfirmBeltLook': //还有到访未确认
                url = 'reportList' // 报备列表
                break;
            case 'RemindProtectBeltLook': //保护期即将到期 ->到访详情
                url = 'visitDetail'
                break;
            default:
                url = 'singDetail' //签约详情
                break
        }
        let params = JSON.parse(item.dataContent) || {}
        this.props.navigation.navigate(url, params)
    }

    // 待办提示 item
    renderBacklogItem: ListRenderItem<WaitMessageResponseListItem> = ({ item, index }) => {
        const { backlog } = this.state
        return (
            <TouchableOpacity
                key={item.messageId}
                activeOpacity={0.8}
                style={[styles['backlog-content-wrapper'], { marginRight: index === backlog.total - 1 ? scaleSize(52) : scaleSize(12) }]}
                onPress={() => this.gotoBacklogPage(item)}
            >
                <Shadow style={styles['backlog-content']}>
                    {/* left */}
                    <View style={styles['backlog-content-left']}>
                        <Image
                            style={styles['backlog-content-left-img']}
                            source={['RemindNotSign', 'RemindComfirmBeltLook'].includes(item.messageType)
                                ? require('../../images/icons/detail.png')
                                : require('../../images/icons/warning-circle.png')}
                        />
                        <Text style={styles['backlog-content-left-text']} numberOfLines={2}>{item.title}</Text>
                    </View>

                    {/* line */}
                    <View style={styles['backlog-line']} />

                    {/* right */}
                    <View style={styles['backlog-content-right']}>
                        <Text style={styles['backlog-content-right-text']} numberOfLines={3}>
                            {this.renderBackLogContentRightText(item)}
                        </Text>
                    </View>

                    {/* close */}
                    {item.allowClose ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles['backlog-close']}
                            onPress={() => this.handleCloseBacklog(item)}
                        >
                            <Image
                                style={styles['backlog-close-img']}
                                source={require('../../images/icons/closed22.png')}
                            />
                        </TouchableOpacity>
                    ) : null}
                </Shadow>
            </TouchableOpacity>
        )
    }

    // 右侧文字
    renderBackLogContentRightText = ({ messageType, dataContent }: WaitMessageResponseListItem) => {
        switch (messageType) {
            case 'RemindNotSign': {
                const { clientNameAndPhone, day, buildingName, shopName } = JSON.parse(dataContent)
                return <>
                    <Text style={styles['blued']}>{clientNameAndPhone}</Text>在
                    <Text style={styles['blued']}>{day}</Text>天前认购的“{buildingName}{shopName}”还未签约，
                </>
            }
            case 'RemindComfirmBeltLook': {
                const { clientNameAndPhone, hour } = JSON.parse(dataContent)
                return <>
                    <Text style={styles['blued']}>{clientNameAndPhone}</Text>的确认有效期还有
                    <Text style={styles['blued']}>{hour}</Text>小时结束，请尽快找项目经理确认。
                </>
            }
            case 'RemindProtectBeltLook': {
                const { clientNameAndPhone, day, buildingName } = JSON.parse(dataContent)
                return <>
                    <Text style={styles['remind']}>{clientNameAndPhone}</Text>的到访保护期还剩
                    <Text style={styles['remind']}>{day}</Text>天（{buildingName}）
                </>
            }
            case 'ReportRepetition': {
                const { userTrueName, repetitionTrueName, repetitionPhone } = JSON.parse(dataContent)
                return <>
                    <Text style={styles['remind']}>{userTrueName}</Text>和
                    <Text style={styles['remind']}>{repetitionTrueName}</Text>报备的
                    <Text style={styles['remind']}>{repetitionPhone}</Text>可能存在重客风险，请关注实际情况
                </>
            }
            default:
                return null
        }
    }

    // 待办提示 placeholder
    backlogPlaceholder = (
        <Shadow style={styles['backlog-noData-content']}>
            <Image
                style={styles['backlog-noData-img']}
                source={require('../../images/pictures/noData2.png')}
            />
            <View style={styles['backlog-noData-right']}>
                <Text style={styles['backlog-noData-text-1']}>您真棒！</Text>
                <Text style={styles['backlog-noData-text-2']}>所有的业务都处理完了</Text>
            </View>
        </Shadow>
    )

    // 让引导页消失时间同步tabbar的出现时间
    isVisible = () => {
        const { config } = this.props
        const { params = {} } = this.props.navigation.state
        if (typeof params.tabBarVisible !== undefined) {
            if (config.isFirstUseApp) {
                return !params.tabBarVisible
            } else {
                return config.isFirstUseApp
            }
        } else {
            return config.isFirstUseApp
        }
    }

    render() {
        const { guest, user, location, weather } = this.props
        const { dtInfo, backlog, headline, refreshing } = this.state
        return <>
            {/* 状态栏背景透明 */}
            <StatusBar
                translucent={true}
                barStyle='dark-content'
                backgroundColor='rgba(255,255,255,0)'
            />

            {/* Header */}
            <ImageBackground
                style={styles['header-background']}
                source={require('../../images/pictures/workbench2.png')}
            >
                {/* Header 定位和天气 */}
                <View style={styles['location-weather']}>
                    {
                        location.status === 'success'
                            ? (
                                <>
                                    <View style={styles['location']}>
                                        <Text
                                            style={styles['location-weather-text']}>{(location.addressComponent || {}).district || (location.addressComponent || {}).province || '???'}</Text>
                                        <View style={styles['location-line']} />
                                        <Text style={styles['location-weather-text']}>{weather && weather.now && weather.now.fl || '???'}℃</Text>
                                    </View>
                                    <View style={styles['weather']}>
                                        <Image style={styles['weather-img']} source={getWeatherIcon(weather)} />
                                        <Text style={styles['location-weather-text']}>{weather && weather.now && weather.now.cond_txt || '???'}</Text>
                                    </View>
                                </>
                            )
                            : (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles['relocation']}
                                    onPress={this.handleRelocation}
                                >
                                    <Image style={styles['relocation-img']} source={require('../../images/icons/location.png')} />
                                    <Text style={styles['location-weather-text']}>点击重新定位</Text>
                                </TouchableOpacity>
                            )
                    }
                </View>

                {/* Header 个人信息&客户动态 */}
                <View style={[styles['header-content-wrap'], {}]}>
                    <Shadow style={styles['header-content']}>
                        {/* 个人信息 */}
                        <View>
                            <Text style={styles['header-left-line-1']}>欢迎你{ guest ? '游客' : user.trueName ? `，${user.trueName}` : ''}！</Text>
                            <Text style={styles['header-left-line-2']} numberOfLines={1}>
                                {user.filialeShortName || '暂无公司'} | {user.deptName || '暂无组别'}
                            </Text>
                        </View>
                        {/* 客户动态 */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles['header-right']}
                            onPress={this.handlePressCustomerDynamic}
                        >
                            <View style={styles['header-right-line-1']}>
                                <Image source={require('../../images/icons/newMessage2.png')} style={styles['header-img']} />
                                <Text style={styles['header-right-line-1-text']}>客户动态</Text>
                            </View>
                            <Text style={styles['header-right-line-2']}>{dtInfo.number || '0'}</Text>
                        </TouchableOpacity>
                    </Shadow>
                </View>
            </ImageBackground>

            {/* Body content */}
            <View style={{paddingTop: scaleSize(88)}}>
            </View>
            <ScrollView
                style={styles['content']}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />}
            >

                {/* 待办提示 */}
                <View style={styles['backlog']}>
                    {/* 待办 title */}
                    <View style={styles['backlog-title']}>
                        {/* 待办 title text */}
                        <View style={[styles['backlog-title-text-layout'], {}]}>
                            <Text style={[styles['backlog-title-text'], {}]}>待办提示：</Text>
                            <Text style={[styles['backlog-title-text'], { marginLeft: scaleSize(23) }]}>{backlog.total}</Text>
                        </View>
                        {/* 待办 title line */}
                        {/* <View style={styles['backlog-title-line']} /> */}
                    </View>
                    {/* 待办 content */}
                    {backlog.total ? (
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles['backlog-list']}
                            data={backlog.list}
                            renderItem={this.renderBacklogItem}
                            keyExtractor={(_, index) => index.toString()}
                        />
                    ) : this.backlogPlaceholder}
                </View>

                {/* 头条 */}
                {headline.length ? (
                    <View style={styles['headlines']}>
                        <Image style={styles['headlines-img']} source={require('../../images/icons/toutiao3x.png')}/>
                        {/* 头条 content */}
                        <VerticalSwiper style={styles['headlines-content']}>
                            {headline.map(item => (
                                <TouchableOpacity key={item.id} activeOpacity={0.8}  onPress={() => this.gotoWebView(item)}
                                                  style={{height:scaleSize(66), flexDirection: 'row',alignItems:'center'}}>
                                        <Text style={[styles['headlines-text'], {flex: 1, lineHeight: scaleSize(32)}]} numberOfLines={2}>{item.adName}</Text>
                                        <Text style={[styles['headlines-text'], {color: '#868686'}]}>{item.timerStr}</Text>
                                </TouchableOpacity>
                            ))}
                        </VerticalSwiper>
                    </View>
                ) : null}

                {/* 常用功能 */}
                <View style={[styles['entry'], user.Resident ? styles['line'] : null]}>
                    <Text style={styles['entry-title']}>常用功能</Text>
                    <View style={styles['entry-list']}>
                        <EntryIcon title='客户管理' path='customerList' auth={!guest} icon={require('./../../images/icons/entryIcon/khgl2.png')} />
                        <EntryIcon title='报备管理' path='reportList' auth={!guest} icon={require('./../../images/icons/entryIcon/bbgl2.png')} />
                        <EntryIcon title='签约管理' path='singList' auth={!guest} icon={require('./../../images/icons/entryIcon/qygl2.png')} />
                        <EntryIcon title='资讯干货' path='articleList' auth={true} icon={require('./../../images/icons/entryIcon/zxgh2.png')} />
                    </View>
                </View>

                {/* 工具助手 */}
                {
                    user.isResident 
                    ? 
                    <View style={styles['entry']}>
                        <Text style={styles['entry-title']}>工具助手</Text>
                        <View style={[styles['entry-list']]}>
                            <EntryIcon title='驻场助手' path='stationHelper' icon={require('./../../images/icons/entryIcon/zczs2.png')} />
                        </View>
                    </View>
                    :
                    <View style={styles['entry']}>
                        <Text style={styles['entry-title']}>工具助手</Text>
                        <View style={[styles['entry-list']]}>
                            <EntryIcon title='驻场助手' disabled path='stationHelper' icon={require('./../../images/icons/entryIcon/zczs_disabled.png')} />
                        </View>
                    </View>
                }
            </ScrollView>

            {/* 快速入口 */}
            <QuickEntry visible={this.props.config.showQuickPage.routeName === 'Workbench'} />

            {/* 新手引导图 */}
            <InitGuide
                visible={this.isVisible()}
                onPress={() => {
                    this.props.dispatch({ type: 'config/noLongerFirst' })
                    this.props.navigation.setParams({ tabBarVisible: true })
                }}
            />
        </>
    }
}

const mapStateToProps: MapStateToProps<TStateProps, any, any> = ({
    user, config, location, weather
}) => ({
    config,
    user: user.userInfo,
    guest: user.status === 404,
    location,
    weather,
})

export default connect(mapStateToProps)(Workbench)
