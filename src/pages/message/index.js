import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity,FlatList, DeviceEventEmitter, StatusBar, Platform, NativeModules } from 'react-native';
import { newsStyles } from './styles'
import { scaleSize } from '../../utils/screenUtil'
import { connect } from 'react-redux'
import QuickEntry from '../../businessComponents/quickEntry'
import { setTimeFormat } from '../../utils/time'
import {  Theme, NavigationBar } from '@new-space/teaset'
import {SwitchView} from '../../components/new-space'
import BuryingPoint from '@/utils/BuryPoint';
import {newsType} from '../../models/getLastNews';
import {customerDynamics} from './handle';
import {checkPermission} from '../../utils/utils';
import API_cleanMessage from '@/services/collection/cleanMessage';

const SwitchViewItem = SwitchView.Item
class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            num: 0,
            closeNotice: true,
            list:[
                {type: newsType.system},
                {type: newsType.activity},
                {type: newsType.business, number:0},
                {type: newsType.project},
                {type: newsType.customer},
            ]
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: '消息',
        tabBarIcon: ({ focused }) => {
            const { params = {} } = navigation.state || {}; // 选项卡名称
            let {count} = params
            let icon = focused ?
                require('../../images/icons/bottomTab/message_active.png')
                :
                require('../../images/icons/bottomTab/message.png')
            return(
                <View>
                    {
                        count > 0 ?
                        <View style={newsStyles['numberView']}>
                            <Text style={[{fontSize:12, color:'#fff', textAlign:'center',}]}>{count > 99 ? '99⁺' : count}</Text>
                        </View> : null
                    }
                    <Image style={{ width: 25, height: 25 }} source={icon} />
                </View>
            )
        },
        tabBarOnPress: async obj => {
            let {user} = global.store.getState()
            if (user.status === 404) {
              obj.navigation.navigate('login')
            } else {
              obj.defaultHandler()
            }
          },
          tabBarOnLongPress: async obj => {
            let { user } = global.store.getState()
            if (user.status === 404) {
              obj.navigation.navigate('login')
            } else {
              obj.defaultHandler()
            }
          },
      })

    componentDidMount() {
        // 游客模式
        if(this.props.guest) return
        this.init()
        this.setMessageProps(this.props)
        this.listener = DeviceEventEmitter.addListener('initMessage', () => {
            this.init()
        })
        // 监听在tab栏点击到这一栏的时候就会刷新数据
        this.navigateListen = this.props.navigation.addListener('didFocus', this.didFocusMessage)
        this.checkNotifyPermission();
    }

    checkNotifyPermission = async () => {
        try {
            if (Platform.OS === 'ios') {
                const res = await checkPermission('notification', 0 , false);
                this.setState({closeNotice: res})
            } else {
                await NativeModules.AndroidNotificationCheck.checkedNotifyEnabled((result)=>{
                    this.setState({closeNotice: result})
                });
            }
        } catch (e) {

        }
    };

    componentWillUnmount () {
        if(this.props.guest) return
        this.listener && this.listener.remove()
        this.navigateListen && this.navigateListen.remove()
    }

    didFocusMessage = () => {
        StatusBar.setBarStyle('dark-content', true)
        this.init()
    }

    init = async () => {
        this.props.dispatch({type:'getLastNews/getList'})
    }

    // 跳转详情
    gotoDetail = async (item) => {
        BuryingPoint.add({
            page: '消息',
            target: this.setIcon(item.type).title+'_button',
        });
        if(this.props.guest) return;
        this.props.navigation.navigate('messageDetail', { ...item})
    };

    // 消息入口的配置
    setIcon = (type) => {
        const icons = [
            { type: newsType.system, title: '系统消息', icon: require('../../images/icons/message/message(5).png'),  empty: '您还未收到系统通知'},
            { type: newsType.activity, title: '活动推荐', icon: require('../../images/icons/message/message(1).png'),  empty: '你还没收到活动推荐' },
            { type: newsType.business, title: '业务信息', icon: require('../../images/icons/message/message(2).png'),  empty: '您还没有收到业务消息，快去报备吧' },
            { type: newsType.project, title: '项目动态', icon: require('../../images/icons/message/message(3).png'),  empty: '您还没有收到项目动态，快去订阅吧' },
            { type: newsType.customer, title: '客户动态', icon: require('../../images/icons/message/message(4).png'),  empty: '您还没收到客户动态，快去分享获客吧' },
        ];
        return icons.find(item => item.type === type)
    }

    // 业务消息的配置
    setContent = (type) => {
        const contents = [
            { type: 'BusinessConfirmBeltLook', title: '到访单已确认', text: '到访', bgColor: '#DEEEFF', textColor: '#49A1FF', endTitle: '' },
            { type: 'BusinessConfirmSubscription', title: '认购已确认', text: '认购', bgColor: '#E6ECFF', textColor: '#66739B', endTitle: '请尽快跟进签约' },
            { type: 'BusinessConfirmSigned', title: '签约已确认', text: '签约', bgColor: '#FFE1DC', textColor: '#FE5139', endTitle: '恭喜开单' },
            { type: 'BusinessConfirmExchangeShops', title: '已换房', text: '换房', bgColor: '#FFD9E9', textColor: '#FF5A9D', endTitle: '请知晓' },
            { type: 'BusinessConfirmExchangeCustomer', title: '已换客', text: '换客', bgColor: '#FFD9E9', textColor: '#FF5A9D', endTitle: '请知晓' },
        ]
        return contents.find(item => item.type === type) || {}
    }

    numberView = (number) => {
        return <SwitchView current={!!number ? 1 : 2}>
            <SwitchViewItem type={1}>
                <View style={[newsStyles.row, newsStyles.marker]}>
                    <Text style={newsStyles.markerText}>{ (number > 99) ?  '99⁺' : number}</Text>
                </View>
            </SwitchViewItem>
            <SwitchViewItem type={2}>{null}</SwitchViewItem>
        </SwitchView>
    };

    // 每项布局
    contents = (item) => {
        const type = item.type;
        const customerDynamics_text = type === newsType.customer ? (item.messageType === 'NotPush' ? customerDynamics(item.simpleContent) : item.simpleContent) : '';
        return (
            <TouchableOpacity
                style={[newsStyles.row, newsStyles.newsBox]}
                activeOpacity={0.8}
                onPress={() => this.gotoDetail(item)}
                key={item.type}
            >
                <View style={newsStyles.row}>
                    <Image style={newsStyles.listIcon} source={(this.setIcon(item.type) || {}).icon} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={[newsStyles.row, { justifyContent: 'space-between', paddingBottom: scaleSize(20) }]}>
                        <Text style={newsStyles.text}>{(this.setIcon(item.type) || {}).title}</Text>
                        {
                            item.sendTime ?
                            <Text style={newsStyles.timeText}>{setTimeFormat(item.sendTime)}</Text>
                            :
                            null
                        }
                    </View>
                    <SwitchView current={type}>
                        <SwitchViewItem type={[newsType.business]}>
                            <View style={[newsStyles.row, { width: scaleSize(567) }]}>
                                {(item.messageTypeName && <View style={[newsStyles.row, newsStyles.flagBox]}>
                                    <Text style={newsStyles.flagText}>{item.messageTypeName}</Text>
                                </View>)}
                                <View style={[newsStyles.row, { height: scaleSize(40), flex: 1}]}>
                                    <Text style={[newsStyles.contentText, {flex: 1}]} numberOfLines={1}>
                                        {(item.simpleContent) ? item.simpleContent : this.setIcon(item.type)?.empty}
                                    </Text>
                                    {this.numberView(item.number)}
                                </View>
                            </View>
                        </SwitchViewItem>
                        <SwitchViewItem type={[newsType.system, newsType.activity, newsType.project]}>
                            <View style={[newsStyles.row, { height: scaleSize(40)}]}>
                                <Text style={[newsStyles.contentText, {flex: 1}]} numberOfLines={1}>{(item.simpleContent) ? item.simpleContent : this.setIcon(item.type)?.empty}</Text>
                                {this.numberView(item.number)}
                            </View>
                        </SwitchViewItem>
                        <SwitchViewItem type={[newsType.customer]}>
                            <View style={[newsStyles.row, { height: scaleSize(40)}]}>
                                <Text style={[newsStyles.contentText, {flex: 1}]}  numberOfLines={1}>{(customerDynamics_text) ? customerDynamics_text : this.setIcon(item.type)?.empty}</Text>
                                {this.numberView(item.number)}
                            </View>
                        </SwitchViewItem>
                    </SwitchView>
                </View>
            </TouchableOpacity>
        )
    };

    cleanUpLoading = false;
    cleanUp = async () => {
        if (this.cleanUpLoading) return;
        try {
            this.cleanUpLoading = true;
            await API_cleanMessage();
            this.init();
        } catch (e) {
            console.log(e, '清除消息失败')
        } finally {
            this.cleanUpLoading = false;
        }
    };

    openNotice = async () => {
        try {
            if (Platform.OS === 'ios') {
                await checkPermission('notification', 0 , true);
            } else {
                await NativeModules.AndroidNotificationCheck.openSet();
            }
            this.setState({closeNotice: true});
        } catch (e) {
            console.log('AndroidNotificationCheckPackage-err', e)
        }
    };

    handleCloseNotice = () => {
        this.setState({
            closeNotice: true
        })
    };

    renderItemHead = () => {
        return <SwitchView current={this.state.closeNotice}>
            <SwitchViewItem type={false}>
                <View style={[newsStyles.row, newsStyles.noticeView]}>
                    <TouchableOpacity onPress={this.handleCloseNotice} activeOpacity={0.9} style={newsStyles.noticeViewBtn}>
                        <Image style={newsStyles.noticeViewBtnImg} source={require('../../images/icons/message/close.png')} />
                    </TouchableOpacity>
                    <Text style={newsStyles.noticeViewText}>打开消息通知，了解最新的项目和客户动态</Text>
                    <TouchableOpacity activeOpacity={0.9} style={newsStyles.openNoticeBtn} onPress={this.openNotice}>
                        <Text style={newsStyles.openNoticeBtnText}>打开通知</Text>
                    </TouchableOpacity>
                </View>
            </SwitchViewItem>
            <SwitchViewItem type={true}>{null}</SwitchViewItem>
        </SwitchView>
    };

    setMessageProps = (props) => {
        let {count,newsInfo} = props.getLastNews || {}
        let data = newsInfo.sysMessageList || []
        let list = data
        list = list.sort((a,b) => {return a.type - b.type})
        this.setState({
            num: count,
            list
        });
        // console.log(list, '外面的消息');
        if(!props.getLastNews.flag){
            this.props.navigation.setParams({count})
        }
    }

    componentWillReceiveProps(newProps){
        // console.log('消息--componentWillReceiveProps')
        if(newProps.getLastNews.searchNum === this.props.getLastNews.searchNum){
            return false
        }
        this.setMessageProps(newProps)
    }

    render() {
        let { list, loading } = this.state;
        return (
            <View style={{height: '100%', flex: 1}}>
                <NavigationBar
                    style={[{ backgroundColor: '#1F3070' }]}
                    title={<View style={[newsStyles.row]}>
                        <Text style={{color: '#fff', fontSize: scaleSize(32), fontWeight:'500'}}>消息</Text>
                        <TouchableOpacity style={[newsStyles.cleanUp]} onPress={this.cleanUp} activeOpacity={0.6}><Image style={newsStyles.cleanUpImage} source={require('../../images/icons/message/cleanUp.png')} /></TouchableOpacity>
                    </View>}
                />
                <View style={{flex: 1, marginTop: Theme.statusBarHeight + Theme.navBarContentHeight }}>
                    <FlatList
                        data={list || []}
                        refreshing={loading}
                        ListHeaderComponent={this.renderItemHead}
                        style={{ flex: 1}}
                        onRefresh={this.init}
                        renderItem={({ item }) => this.contents(item)}
                    />
                </View>
                <QuickEntry visible={this.props.config.showQuickPage.routeName === 'Message'} />
            </View>
        )
    }
}

const mapStateToProps = ({ config, user, getLastNews }) => {
    return { config, user, getLastNews, guest: user.status === 404 }
}
export default connect(mapStateToProps)(MessageList)


