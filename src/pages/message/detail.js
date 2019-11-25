/**
 * 消息详情
 */

import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import Page from '../../components/Page'
import {newsStyles} from './styles'
import {scaleSize} from '../../utils/screenUtil'
import {connect} from 'react-redux'
import Api from '../../services/message'
import Modal from '../../components/Modal/index'
import WarnItem from './item/warnInfo'
import YewuItem from './item/yewu'
import DtItem from './item/dtInfo';
import Activity from './item/activity'
import NoData from '../../businessComponents/noData';
import {Toast} from 'teaset'

class MessageDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            visible: false,
            pageIndex: 0,
            pageSize: 30,
            total: 0,
            refreshing: false,
            hasMore: false,
            showFooter: false
        }
    }

    // 删除按钮
    gotoDelete = () => {
        this.setState({visible: true})
    }

    // 删除消息
    deleteNews = async () => {
        this.setState({refreshing: true})
        try {
            let {api} = this.props.config.requestUrl
            let type = this.props.navigation.state.params.type
            let params = {
                type
            }
            await Api.delete(api, params)
            this.setState({refreshing: false}, this.getList)

        } catch (e) {
            console.log(e)
            Toast.message('删除消息失败！')
            this.setState({refreshing: false})
        }
    }

    // 删除动态消息
    deleteDtNews = async () => {
        this.setState({refreshing: true})
        try {
            let {api} = this.props.config.requestUrl
            let type = this.props.navigation.state.params.type
            let params = {
                type
            }
            await Api.deleteDt(api, params)
            this.setState({refreshing: false}, this.getDtList)

        } catch (e) {
            console.log(e)
            Toast.message('删除动态消息失败！')
            this.setState({refreshing: false})
        }
    }

    onClose = () => {
        this.setState({visible: false})
    }

    onOk = () => {
        let type = this.props.navigation.state.params.type
        if (type === 3) {
            this.deleteDtNews()
        } else {
            this.deleteNews()
        }
        this.setState({
            visible: false,
            showFooter: false
        })
    }

    // 获取消息列表
    getList = async () => {
        this.setState({refreshing: true})
        try {
            let {api} = this.props.config.requestUrl
            let type = this.props.navigation.state.params.type
            let {pageIndex, pageSize, hasMore, data} = this.state
            let params = {
                type,
                pageIndex,
                pageSize
            }
            let res = await Api.otherList(api, params)
            console.log(res)
            if (res.code === '0') {
                hasMore = (pageIndex + 1) * pageSize < res.totalCount
                let list = res.extension || []
                data = res.pageIndex > 0 ? data.concat(list) : list
                this.setState({
                    refreshing: false,
                    hasMore,
                    pageIndex: res.pageIndex,
                    total: res.totalCount,
                    showFooter: !hasMore && res.totalCount,
                    data
                })
            }

        } catch (e) {
            console.log(e)
            Toast.message('获取消息列表失败！')
            this.setState({refreshing: false})
        }
    }

    // 获取动态消息列表数据
    getDtList = async () => {
        this.setState({refreshing: true})
        try {
            let {api} = this.props.config.requestUrl
            let {pageIndex, pageSize, hasMore, data} = this.state
            let params = {
                pageIndex,
                pageSize
            }
            console.log(api, params, 'api,params')
            let res = await Api.dtList(api, params)
            console.log(res, 'dtList')

            if (res.code === '0') {
                hasMore = (pageIndex + 1) * pageSize < res.totalCount
                let list = res.extension || []
                data = res.pageIndex > 0 ? data.concat(list) : list
                this.setState({
                    refreshing: false,
                    hasMore,
                    pageIndex: res.pageIndex,
                    total: res.totalCount,
                    showFooter: !hasMore && res.totalCount,
                    data
                })
            }

        } catch (e) {
            console.log(e)
            Toast.message('获取动态消息列表失败！')
            this.setState({refreshing: false})
        }
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        let type = this.props.navigation.state.params.type
        if (type == 3) {
            this.getDtList()
        } else {
            this.getList()
        }
    }

    // 消息跳转页面
    gotoPage = (item) => {
        let url = ''
        switch (item.messageType) {
            case'ReportRepetition' : // 报备重客,,
            case'RemindComfirmBeltLook': //还有到访未确认
                url = 'reportList' // 报备列表
                break;
            case'RemindProtectBeltLook': //保护期即将到期 ->到访详情
            case'BusinessConfirmBeltLook': //到访单已确认 ->到访详情
                url = 'visitDetail'
                break;
            default:
                url = 'singDetail' //签约详情
                break
        }
        let params = JSON.parse(item.data) || (JSON.parse(item.data) || {}).extData || {}
        this.navigatePage(url, params)
    }

    navigatePage = (url, params) => {
        console.log('navigatePage',url);
        this.props.navigation.navigate(url === 'webView' ? 'xkjWebView' : url, params)
    }

    contents = (item) => {
        let type = this.props.navigation.state.params.type
        let content = null
        if (type == 1) {
            content = <WarnItem item={item} gotoPage={() => this.gotoPage(item)}/>
        } else if (type == 2) {
            content = <YewuItem item={item} gotoPage={() => this.gotoPage(item)}/>
        } else if (type == 3) {
            content = <DtItem item={item} navigation={this.props.navigation}/>
        } else if (type === 4) {
            content = <Activity onPress={this.navigatePage} info={item}/>
        }

        return content
    }

    onRefresh = () => {
        this.setState({pageIndex: 0}, this.init)
    }

    getMore = () => {
        let {pageIndex, total, pageSize} = this.state
        pageIndex++
        if (total / pageSize <= pageIndex) {
            return;
        }
        this.setState({pageIndex}, this.init)
    }

    footerContent = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50}}>
                <Text style={newsStyles.titleText}>没有更多了</Text>
            </View>
        )
    }

    headContent = (title, type, number) => {
        if (type == 4) {
            return null
        } else {
            if (number) {
                return (
                    <View style={[newsStyles.row, newsStyles.titleWrap]}>
                        <Text style={newsStyles.titleText}>
                            你有
                            <Text style={[newsStyles.numText, {fontSize: scaleSize(24)}]}>{number}</Text>
                            {`条${title}未读`}
                        </Text>
                    </View>
                )
            }
        }
    }

    render() {
        let {visible, refreshing, hasMore, data = [], showFooter} = this.state
        let params = this.props.navigation.state.params
        let type = params.type
        let number = params.number
        let title = type == 1 ? '预警消息' : type == 2 ? '业务消息' : type == 3 ? '客户动态' : type == 4 ? '活动推荐' : '客户动态';
        return (
            <Page
                title={title}
                bodyStyle={{backgroundColor: '#F7F7F7'}}
                scroll={false}
                rightView={
                    data.length ?
                        <TouchableOpacity activeOpacity={0.8} onPress={this.gotoDelete}>
                            <Image style={{width: scaleSize(45), height: scaleSize(45), marginRight: scaleSize(32)}}
                                   source={require('../../images/icons/delete_black.png')}/>
                        </TouchableOpacity>
                        : null
                }
                backButtonPress={() => {
                    params.init ? params.init() : null
                    this.props.navigation.goBack()
                }}
            >

                <FlatList
                    data={data}
                    refreshing={refreshing}
                    onEndReachedThreshold={0.2}
                    style={{flex: 1}}
                    ListHeaderComponent={number && showFooter ? () => this.headContent(title, type, number) : null}
                    onEndReached={hasMore && !showFooter ? this.getMore : null}
                    ListFooterComponent={!hasMore && showFooter ? this.footerContent : null}
                    ListEmptyComponent={<NoData tips='抱歉，暂无消息～'/>}
                    onRefresh={this.onRefresh}
                    renderItem={({item}) => this.contents(item)}
                />

                <Modal
                    visible={visible}
                    onClose={this.onClose}
                    onOk={this.onOk}
                    type='conform'
                    width={540}
                    height={275}
                >
                    <View style={[newsStyles.row, {justifyContent: 'center', paddingTop: scaleSize(40)}]}>
                        <Text style={newsStyles.contentText}>是否清空全部消息</Text>
                    </View>
                </Modal>

            </Page>
        )
    }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
}
export default connect(mapStateToProps)(MessageDetail)
