import React from 'react'
import { Animated, Easing, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import HeaderInfo from './components/headerInfo'
import MatchingInfo from './components/matchingInfo'
import RelevantInfo from './components/relevantInfo'
import ReportRule from './components/reportRule'
import projectService from '../../../services/projectService'
import { connect } from 'react-redux'
import ShopIntroduce from './components/shopIntroduce'
import Theme from 'teaset/themes/Theme'
import { scaleSize } from '../../../utils/screenUtil'
import FunctionDesk from './components/functionDesk'
import { wxApi } from '../../../utils/wxUtils'
import { Toast } from 'teaset'
import buryPoint from '@/utils/BuryPoint'
import shopJson from './shopJson'

class ShopDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shopDetail: {},
            fdVisible: false,
            activeTabKey: 'otherY',
            headerOpacity0: new Animated.Value(0),
            headerOpacity1: new Animated.Value(1),
            hasRule: false,
        }
        this.common = {
            shopId: props.navigation.state.params.shopId,
            buildingTreeId: props.navigation.state.params.buildingTreeId,
            buildingId: '',
            layouts: {},
        }
        this.baseHeight = Theme.navBarContentHeight + Theme.statusBarHeight + scaleSize(96)
        this.tabs = [
            { label: '基本信息', key: 'relevantY' },
            { label: '房源简介', key: 'introY' },
            { label: '配套信息', key: 'matchingY' },
            { label: '报备规则', key: 'ruleY' },
        ]
    }

    componentDidMount() {
        this.initDictionary()
        this.getShopDetail()
    }

    initDictionary = () => {
        this.props.dispatch({
            type: 'dictionaries/getDictionaryDefines',
            payload: {
                requestData: [
                    'SHOP_CATEGORY', 'HOUSE_TYPE', 'SHOP_TOWARD',
                    'PARKING_TYPE', 'LEVEL_OFFICE_LEVEL', 'APART_TYPE',
                ]
            }
        })
    }

    getShopDetail = async () => {
        try {
            const { shopId } = this.common
            const { requestUrl } = this.props
            const response = await projectService.shopDetailReq(requestUrl.api, shopId)
            this.common.buildingId = response.extension.buildingId
            let shopDetail = response.extension
            let otherField = ['propertyTerm', 'preferentialPolicies', 'landExpireDate']
            otherField.map(item => {
                shopDetail.basicInfo[item] = shopDetail[item] || ''
            })
            this.setState({ shopDetail })
        } catch (e) {
            console.log(e)
        }
    }

    handleShare = async () => {
        const { shopDetail } = this.state
        const { userInfo = {} } = this.props.user
        if (!shopDetail.buildingTreeId || !shopDetail.buildingId || !shopDetail.buildingTreeName) return
        let path = `/pages/share/index?build_tree_id=${shopDetail.buildingTreeId}&build_id=${shopDetail.buildingId}`
        if (userInfo.isResident) {
            path += `&company_id=${userInfo.filialeId || ''}&type=2`
        } else {
            path += `&type=1`
        }

        let thumbImage = this.buildIcon || `${this.props.requestUrl.cqAuth}/images/defaultProject.png`

        const data = {
            type: 'miniProgram',
            webpageUrl: 'https://www.baidu.com/',
            title: `${userInfo.trueName || ''}邀请你报备${shopDetail.buildingTreeName}！`,
            description: 'description',
            thumbImage: thumbImage,
            userName: 'gh_76def9e899ca',
            path: path
        }
        wxApi.handleShareToSession(data)
            .then(() => {
            }).catch(e => {
                Toast.message(e.message)
            })
        buryPoint.add({
            target: '分享报备小程序_button',
            page: '房源-房源详情',
            action_param: {
                buildingid: shopDetail.buildingId,
                companyid: userInfo.filialeId
            }
        })
    }

    onClick = (type) => {
        this.setState(prev => ({
            fdVisible: !prev.fdVisible
        }), () => {
            if (type === 'gzt') {
                this.props.navigation.navigate('Workbench')
            } else if (type === 'building') {
                const { buildingTreeId } = this.common
                this.props.navigation.navigate('buildingDetail', { buildingTreeId })
            } else if (type === 'house') {
                this.props.navigation.navigate('Project')
            }
        })
    }

    isCanReport = () => {
        // const residentUserInfo = this.state.shopDetail.residentUserInfo || [];//是否有驻场
        // if (residentUserInfo.length <= 0) return false;
        if (!this.state.hasRule) return false // 没有报备规则；
        const cityCode = ((this.props.user || {}).userInfo || {}).city || null
        const shopDetail = (this.state.shopDetail || {})
        if (!cityCode || !shopDetail.cityCode || cityCode !== shopDetail.cityCode) return false // 不在同一城市
        return true
    }

    handleHasRule = (hasRule) => {
        this.setState({ hasRule: hasRule })
    }

    onLayout = (key, e) => {
        this.common.layouts[key] = e.nativeEvent.layout.y
    }

    onScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y
        const { headerOpacity0, headerOpacity1 } = this.state
        const { layouts } = this.common
        Animated.timing(headerOpacity0, {
            toValue: offsetY / 150,
            duration: 0,
            easing: Easing.linear,
        }).start()
        Animated.timing(headerOpacity1, {
            toValue: 1 - (offsetY / 150),
            duration: 0,
            easing: Easing.linear,
        }).start()
        if (offsetY >= 0) {
            this.setState({ activeTabKey: 'relevantY' })
        }
        if (offsetY >= layouts['introY'] - this.baseHeight) {
            this.setState({ activeTabKey: 'introY' })
        }
        if (offsetY >= layouts['matchingY'] - this.baseHeight) {
            this.setState({ activeTabKey: 'matchingY' })
        }
        if (offsetY >= layouts['ruleY'] - this.baseHeight) {
            this.setState({ activeTabKey: 'ruleY' })
        }
    }

    scrollTo = (key) => {
        this.setState({ activeTabKey: key }, () => {
            const y = this.common.layouts[key]
            this.scrollRef && this.scrollRef.scrollTo({ x: 0, y: y - this.baseHeight, animated: false })
        })
    }

    modalToggle = () => {
        this.setState(prev => ({
            fdVisible: !prev.fdVisible
        }))
    }

    gotoReport = () => {
        const { buildingTreeId, buildingId } = this.common
        const { shopDetail } = this.state
        let param = {
            buildTreeId: buildingTreeId,
            buildingId: buildingId,
            buildingName: shopDetail.buildingTreeName
        }
        this.props.navigation.navigate('addReport', { buildingInfo: param })
        buryPoint.add({ target: '报备客户_button', page: '商铺详情' })
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { shopDetail, activeTabKey, headerOpacity0, headerOpacity1, fdVisible } = this.state
        const { requestUrl, user, dictionaries } = this.props
        const { buildingTreeId, shopId } = this.common
        const isCanReport = this.isCanReport()
        const { shopCategoryType, shopTreeExtdata } = shopDetail;
        return (
            <View style={styles.bd_wrapper}>
                <StatusBar
                    translucent={true}
                    barStyle='dark-content'
                    backgroundColor='rgba(255,255,255,0)'
                />

                {/*动态header*/}
                <View style={styles.bd_headerAbsolute}>
                    <Animated.View style={[styles.bd_headerContainer, { opacity: headerOpacity1 }]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
                            <Image style={[styles.bd_headerIcon]}
                                source={require('../../../images/icons/project/back_white.png')} />
                        </TouchableOpacity>
                        <Text style={styles.bd_headerIconDivision} />
                        <TouchableOpacity activeOpacity={0.8} onPress={this.modalToggle}>
                            <Image style={styles.bd_headerIcon}
                                source={require('../../../images/icons/project/more_white.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.bd_headerAnimated, { opacity: headerOpacity0 }]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.goBack}>
                            <Image style={styles.bd_headerIcon}
                                source={require('../../../images/icons/project/back_black.png')} />
                        </TouchableOpacity>
                        <Text style={styles.bd_headerIconDivision}>{shopJson[shopCategoryType || 1].shopCategoryType + '详情'}</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.modalToggle}>
                            <Image style={styles.bd_headerIcon}
                                source={require('../../../images/icons/project/more_black.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/*动态tabs*/}
                <Animated.View style={[styles.bd_animatedHeader, { opacity: headerOpacity0 }]}>
                    {this.tabs.map(item => (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.scrollTo(item.key)}
                            key={item.key} style={styles.bd_animatedHeaderItem}>
                            <View style={[styles.bd_animatedHeaderTextWrap]}>
                                <Text
                                    style={[styles.bd_animatedHeaderText, { color: activeTabKey === item.key ? '#1F3070' : '#868686' }]}>
                                    {item.label}
                                </Text>
                            </View>
                            <Text
                                style={[styles.bd_animatedHeaderLine, { backgroundColor: activeTabKey === item.key ? '#1F3070' : '#fff' }]} />
                        </TouchableOpacity>
                    ))}
                </Animated.View>

                <FunctionDesk visible={fdVisible} modalClose={this.modalToggle} onClick={this.onClick} />

                <View style={styles.bd_content}>
                    <ScrollView
                        bounces={false}
                        scrollEventThrottle={16}
                        onScroll={this.onScroll}
                        ref={ref => this.scrollRef = ref}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: scaleSize(-24) }}
                    >
                        {/*头部信息*/}
                        <HeaderInfo
                            shopId={shopId}
                            shopInfo={shopDetail}
                            baseInfo={shopDetail.basicInfo}
                            dictionaries={dictionaries}
                        />

                        {/**基本信息 */}
                        <RelevantInfo
                            shopInfo={shopDetail}
                            onLayout={e => this.onLayout('relevantY', e)}
                        />

                        {/*商铺简介*/}
                        <ShopIntroduce shopCategoryType={shopCategoryType} summary={shopDetail.summary} onLayout={e => this.onLayout('introY', e)} />

                        {/*配套信息*/}
                        <MatchingInfo
                            shopCategoryType={shopCategoryType}
                            facility={(shopTreeExtdata || {}).facility}
                            onLayout={e => this.onLayout('matchingY', e)}
                        />

                        {/*报备规则*/}
                        <ReportRule
                            handleShare={this.handleShare}
                            shareWeChat={user.status !== '404'}
                            handleHasRule={this.handleHasRule}
                            buildingTreeId={buildingTreeId}
                            onLayout={e => this.onLayout('ruleY', e)}
                            requestUrl={requestUrl}
                        />
                    </ScrollView>

                    {/* 报备按钮 */}
                    <View style={styles.bd_footer}>
                        <TouchableOpacity disabled={!isCanReport} style={[styles.bd_footerContent, { opacity: isCanReport ? 1 : 0.8 }]} activeOpacity={0.8} onPress={this.gotoReport}>
                            <Text style={styles.bd_footerContentText}>报备客户</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ config, dictionaries, user }) => ({
    requestUrl: config.requestUrl,
    dictionaries,
    user,
})

export default connect(mapStateToProps)(ShopDetail)
