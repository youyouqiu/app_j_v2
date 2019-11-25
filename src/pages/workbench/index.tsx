import React, { PureComponent } from 'react'
import {
    ScrollView, StatusBar, ImageBackground, ListRenderItem,
    View, Text, Image, FlatList, TouchableOpacity, RefreshControl, Platform, DeviceEventEmitter, Alert, EmitterSubscription
} from 'react-native'
import { connect, MapStateToProps, DispatchProp } from 'react-redux'
import { NavigationScreenProps, NavigationEventSubscription } from 'react-navigation'
import StoreState, { ConfigState, UserInfo } from '../../models/types'
import { scaleSize } from '../../utils/screenUtil'
import { checkPermission, extractIdFromUrl, verifyUser } from '../../utils/utils'
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
    QueryAdvertisingsConditions,
    QueryAdvertisingsResponseExtensionListItem
} from '../../services/advertising'
// @ts-ignore
import QuickEntry from '../../businessComponents/quickEntry'
// @ts-ignore
import Shadow from '../../components/Shadow'
import VerticalSwiper from '../../components/VerticalSwiper'
import styles from './styles'
import tracking, { PageTimer } from '../../utils/BuryPoint'
import InitGuide from './InitGuide'
import EntryIcons from '../../businessComponents/EntryIcons'
import projectService from "../../services/projectService";
import Advertisement from '../../businessComponents/advertisement'
import EntryIcon from "../../businessComponents/EntryIcon";
import navigationUtils from '../../utils/navigation'
import { CONSTANT } from "@/constants";

const alert = Alert.alert

const EGroup = EntryIcons.Group
const EItem = EntryIcons.Item

interface TStateProps {
    config: ConfigState
    user: UserInfo
    guest: boolean
    location: any
    weather: any
    freeUser: boolean
}

interface State {
    dtInfo: GetCustomerDynamicExtension
    backlog: {
        total: number
        list: WaitMessageResponseListItem[]
    }
    headline: GetAdvertisingsResponseExtensionListItem[]
    ADOnOpen: GetAdvertisingsResponseExtensionListItem[]
    refreshing: boolean,
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
        ADOnOpen: [] as GetAdvertisingsResponseExtensionListItem[],
        refreshing: false,
    }
    didFocusListener?: NavigationEventSubscription
    didBlurListener?: NavigationEventSubscription
    pageTimer: PageTimer = new PageTimer()

    componentDidMount() {
        const { navigation, dispatch, config: { noticeInfo } } = this.props
        this.didFocusListener = navigation.addListener('didFocus', this.navigationDidFocus)
        this.didBlurListener = navigation.addListener('didBlur', this.navigationDidBlur)
        if (this.props.config.isFirstUseApp) {
            navigation.setParams({ tabBarVisible: false })
        } else {
            this.getADOfOpen()
            if (noticeInfo && noticeInfo.url) {
                navigationUtils.noticeNavigate(noticeInfo)
            }
        }
    }

    componentDidUpdate(prevProps: TStateProps) {
        // 典型用法（不要忘记比较 props）：
        if (prevProps.config.noticeInfo && prevProps.config.noticeInfo.pushId !== this.props.config.noticeInfo.pushId) {
            const { noticeInfo } = this.props.config
            noticeInfo.url && navigationUtils.noticeNavigate(noticeInfo)
        }
    }

    componentWillUnmount() {
        this.didFocusListener!.remove()
        this.didBlurListener!.remove()
    }

    // 进入页面
    navigationDidFocus = () => {
        StatusBar.setBarStyle('light-content')
        DeviceEventEmitter.emit('initMessage') // 进入页面的时候调用获取消息  因为静默消息的原因临时处理
        this.pageTimer.start()
        this.getDtInfo()
        this.getBacklog()
        this.getADOfHeadline()
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
        return messageApi.dtInfo()
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

    // 请求广告接口
    fetchAdvertising = (conditions: GetAdvertisingsConditions) => {
        return adApi.getAdvertisings(this.props.config.requestUrl.public, conditions)
    }

    // 批量请求广告接口
    fetchAdvertisings = (conditions: QueryAdvertisingsConditions) => {
        return adApi.queryAdvertisings(this.props.config.requestUrl.public, conditions)
    }

    // 获取客户动态data
    getDtInfo = async () => {
        if (this.props.guest) return
        try {
            const { extension } = await this.fetchDtInfo()
            this.setState({ dtInfo: extension })
        } catch (e) {
            console.log('getDtInfo error:', e)
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
        }
    }

    // 获取头条广告
    getADOfHeadline = async () => {
        const conditions: GetAdvertisingsConditions = {
            cityId: this.props.location.conversionCode,
            app: 1,
            site: 'BROKER_HOME_HEADLINE'
        }
        try {
            const { extension }: { extension: GetAdvertisingsResponseExtensionListItem[] } = await this.fetchAdvertising(conditions)
            this.setState({
                headline: extension,
            })
        } catch (e) {
            console.log('getAdvertisings error:', e)
        }
    }

    /**
     * 获取开屏广告
     */
    getADOfOpen = async () => {
        //游客或定位失败时不做显示
        if (!this.props.location.locationCityCode || this.props.config.willUpdate || this.props.guest) return
        const conditions: GetAdvertisingsConditions = {
            cityId: this.props.location.locationCityCode,
            app: 1,
            site: 'BROKER_ON_OPEN'
        }
        try {
            const { extension }: { extension: GetAdvertisingsResponseExtensionListItem[] } = await this.fetchAdvertising(conditions)
            let ADOnOpen = [] as GetAdvertisingsResponseExtensionListItem[]
            if (extension.length >= 1) {
                //随机取出一张
                const randomOne = extension[Math.floor(Math.random() * extension.length)]
                ADOnOpen.push(randomOne)
            }
            this.setState({ ADOnOpen },
                () => this.props.dispatch({ type: 'config/controlADVisible' })
            )
        } catch (e) {
            console.log('getADOfOpen error:', e)
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
            userId: (this.props.user || {}).id,
            cityId: (location && location.conversionCode) || '500000'
        };
        projectService.addVisitReq(config.requestUrl.public, reqParams);
        if (item.jumpType === 0) {
            navigation.navigate('xkjWebView', {
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
            await this.getADOfHeadline()
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
        let { title = '' } = item
        return (
            <TouchableOpacity
                key={item.messageId}
                activeOpacity={0.8}
                style={[styles['backlog-content-wrapper'], { marginRight: index === backlog.total - 1 ? scaleSize(52) : scaleSize(12) }]}
                onPress={() => this.gotoBacklogPage(item)}
            >
                <Shadow style={styles['backlog-content']}>
                    {/* left */}
                    <View style={[styles['backlog-content-left'], { width: title.length > 4 ? scaleSize(75) : scaleSize(50) }]}>
                        <Image
                            style={styles['backlog-content-left-img']}
                            source={['RemindNotSign', 'RemindComfirmBeltLook'].includes(item.messageType)
                                ? require('../../images/icons/detail.png')
                                : require('../../images/icons/warning-circle.png')}
                        />
                        <Text style={styles['backlog-content-left-text']} numberOfLines={2}>{title}</Text>
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
                source={require('../../images/pictures/dbts.png')}
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

    handlePressADOnOpen(item: GetAdvertisingsResponseExtensionListItem) {
        this.props.dispatch({ type: 'config/controlADVisible' })
        this.gotoWebView(item)
    }

    render() {
        const { guest, user, location, weather, freeUser } = this.props
        const { dtInfo, backlog, headline, refreshing, ADOnOpen } = this.state
        return <>
            {/* 状态栏背景透明 */}
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
                            <Text style={styles['header-left-line-1']}>欢迎你{guest ? '游客' : user.trueName ? `，${user.trueName}` : ''}！</Text>
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
                                <View>
                                    <Image source={require('../../images/icons/newMessage2.png')} style={styles['header-img']} />
                                    {!!dtInfo.number && <View style={styles['header-right-dot']} />}
                                </View>
                                <Text style={styles['header-right-line-1-text']}>客户动态</Text>
                            </View>
                            <Text style={styles['header-right-line-2']}>{dtInfo.number || '0'}</Text>
                        </TouchableOpacity>
                    </Shadow>
                </View>
            </ImageBackground>

            {/* Body content */}
            <View style={{ height: scaleSize(75) }} />
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
                        <Image style={styles['headlines-img']} source={require('../../images/icons/toutiao3x.png')} />
                        {/* 头条 content */}
                        <VerticalSwiper style={styles['headlines-content']}>
                            {headline.map(item => (
                                <TouchableOpacity key={item.id} activeOpacity={0.8} onPress={() => this.gotoWebView(item)}
                                    style={{ height: scaleSize(66), flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles['headlines-text'], { flex: 1, lineHeight: scaleSize(32) }]} numberOfLines={2}>{item.adName}</Text>
                                    <Text style={[styles['headlines-text'], { color: '#868686' }]}>{item.timerStr}</Text>
                                </TouchableOpacity>
                            ))}
                        </VerticalSwiper>
                    </View>
                ) : null}
                <EntryIcons>
                    <EGroup title='常用功能'>
                        <EItem title='客户管理' path='customerList' auth={!guest} icon={require('./../../images/icons/entryIcon/khgl2.png')} />
                        <EItem title='报备管理' path='reportList' auth={!guest} icon={require('./../../images/icons/entryIcon/bbgl2.png')} />
                        <EItem title='签约管理' path='singList' auth={!guest} icon={require('./../../images/icons/entryIcon/qygl2.png')} />
                        <EItem title='资讯干货' path='articleList' auth={true} icon={require('./../../images/icons/entryIcon/zxgh2.png')} />
                    </EGroup>
                    <EGroup title='工具助手'>
                        <EItem title='工作报表' path='workReport' locked={guest} auth={!guest} icon={require('./../../images/icons/entryIcon/gzbb.png')} />
                        <EItem title='驻场助手' path='stationHelper' locked={guest || !user.isResident} auth={!guest}
                            icon={require('./../../images/icons/entryIcon/zczs.png')} />
                        <EItem title='房贷计算器' path='calculate' icon={require('./../../images/icons/entryIcon/fdjsq.png')} />
                        <EItem title='侦探寻铺' path='searchBuilding' locked={guest || freeUser} auth={!guest}
                            icon={require('./../../images/icons/entryIcon/ztxf.png')} />
                    </EGroup>
                </EntryIcons>
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
            {/* 开屏广告 */}
            {
                ADOnOpen.length >= 1 &&
                <Advertisement img={{ uri: ADOnOpen[0].cover }} onPress={() => this.handlePressADOnOpen(ADOnOpen[0])} />
            }
        </>
    }
}

const mapStateToProps: MapStateToProps<TStateProps, any, StoreState> = ({
    user, config, location, weather
}) => ({
    config,
    user: user.userInfo,
    freeUser: user.status === 202, // 自由经纪人
    guest: user.status === 404, // 未登陆经纪人
    location,
    weather,
})

export default connect(mapStateToProps)(Workbench)
