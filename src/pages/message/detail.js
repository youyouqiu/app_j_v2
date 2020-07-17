/**
 * 消息详情
 */
import React, {Component} from 'react';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import Page from '../../components/Page'
import {newsStyles} from './styles'
import {scaleSize} from '../../utils/screenUtil'
import {connect} from 'react-redux'
import Api from '../../services/message'
import DtItem from './item/dtInfo';
import Activity from './item/activity'
import NoData from '../../businessComponents/noData';
import {Toast} from '@new-space/teaset'
import {newsType} from "../../models/getLastNews";
import {SwitchView} from "../../components/new-space";
import Project from "./item/project";
import Business from "./item/business";
import System from "./item/system";
const SwitchViewItem = SwitchView.Item;


class MessageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            refreshing: false,
            moreLoading: false,
        }
    }
    pageIndex = 0;
    pageSize = 30;
    total = 0;

    componentDidMount() {
        this.read();
        this.init('init', 0)
    }

    /**
     *
     * @param pageIndex number
     * @param type 'init'|'more'|'refresh'
     * @returns {Promise<void>}
     */
    init = async (type, pageIndex) => {
        try {
            if (type === 'init') await this.setState({loading: true});
            if (type === 'more') await this.setState({moreLoading: true});
            if (type === 'refresh') await this.setState({refreshing: true});
            const res = await this.getMessageList(pageIndex);
            console.log(res)
            let list = res.extension || [];
            this.setState(prev => ({
                data: (type === 'more') ? [...prev.data, ...list] : list,
                total: res.totalCount
            }));
            this.pageIndex = pageIndex;
        } catch (e) {
            console.log(e, '获取消息列表失败');
            Toast.message('获取消息列表失败！')
        } finally {
            if (type === 'init') this.setState({loading: false});
            if (type === 'more') this.setState({moreLoading: false});
            if (type === 'refresh') this.setState({refreshing: false});
        }
    };

    getMessageList = (pageIndex) => {
        let {api} = this.props.config.requestUrl;
        let type = this.props.navigation.state.params.type;
        // if (type === newsType.customer) return Api.dtList(api, {pageIndex: pageIndex, pageSize: this.pageSize});
        return Api.otherList(api, {pageIndex: pageIndex, pageSize: this.pageSize, type: type});
    };

    read = async () => {
        try {
            let type = this.props.navigation.state.params.type;
            // if (type === newsType.customer) {
            //     await Api.readDt();
            // } else {
            // }
            await Api.read({type});
            this.props.dispatch({type:'getLastNews/getList'})
        } catch (e) {
        }
    };

    onRefresh = () => {
        !this.state.refreshing && this.init('refresh', 0)
    };

    getMore = () => {
        const {total, data, moreLoading} = this.state;
        if (total > data.length && !moreLoading) {
            this.init('more', this.pageIndex++)
        }
    };

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
        this.props.navigation.navigate(url === 'webView' ? 'xkjWebView' : url, params)
    }

    contents = (item) => {
        const type = +(this.props.navigation.state.params.type);
        return <SwitchView current={type}>
            <SwitchViewItem type={newsType.system}>
                <System item={item} userInfo={this.props.user.userInfo} navigation={this.props.navigation}/>
            </SwitchViewItem>
            <SwitchViewItem type={newsType.activity}>
                <Activity onPress={this.navigatePage} info={item}/>
            </SwitchViewItem>
            <SwitchViewItem type={newsType.business}>
                <Business item={item} navigation={this.props.navigation} />
            </SwitchViewItem>
            <SwitchViewItem type={newsType.project}>
                <Project item={item} navigation={this.props.navigation}/>
            </SwitchViewItem>
            <SwitchViewItem type={newsType.customer}>
                <DtItem item={item} navigation={this.props.navigation}/>
            </SwitchViewItem>
        </SwitchView>

    };

    footerContent = () => {
        const {loading, moreLoading, data, total} = this.state;
        if (!data.length) {
            if (loading) {
                return <ActivityIndicator style={{paddingTop: 20}}/>
            } else {
                return <NoData tips='抱歉，暂无消息～'/>
            }
        } else {
             if (moreLoading) {
                 return <ActivityIndicator style={{paddingTop: 20}}/>
             } else if (total <= data.length) {
                 return <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50}}>
                     <Text style={newsStyles.titleText}>没有更多了</Text>
                 </View>
             }
            return null
        }
    };

    render() {
        let {refreshing, data = []} = this.state;
        let params = this.props.navigation.state.params;
        let type = params.type;
        let title = newsType.getTitle(type);
        return (
            <Page
                title={title}
                bodyStyle={{backgroundColor: '#F7F7F7'}}
                scroll={false}
                backButtonPress={() => {
                    params.init ? params.init() : null;
                    this.props.navigation.goBack()
                }}
            >
                <FlatList
                    data={data}
                    refreshing={refreshing}
                    onEndReachedThreshold={0.2}
                    style={{flex: 1, paddingHorizontal: scaleSize(32)}}
                    onEndReached={this.getMore}
                    ListFooterComponent={this.footerContent}
                    onRefresh={this.onRefresh}
                    renderItem={({item}) => this.contents(item)}
                    showsVerticalScrollIndicator={false}
                />
            </Page>
        )
    }
}

const mapStateToProps = ({config, user}) => {
    return {config, user}
}
export default connect(mapStateToProps)(MessageDetail)
