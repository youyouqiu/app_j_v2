import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity,FlatList, DeviceEventEmitter, StatusBar } from 'react-native';
// import Page from '../../components/Page'
import { newsStyles } from './styles'
import { scaleSize } from '../../utils/screenUtil'
import { connect } from 'react-redux'
import Api from '../../services/message'
import QuickEntry from '../../businessComponents/quickEntry'
import { setTimeFormat } from '../../utils/time'
import { CommonItem } from './item/commom'
import { Toast } from 'teaset'
import {SwitchView} from '../../components/new-space'
import BuryingPoint from "@/utils/BuryPoint";
import { NavigationBar } from 'teaset'

const SwitchViewItem = SwitchView.Item
class MessageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            num:0,
            list:[
                {type:1},
                {type:2},
                {type:3,number:0},
                {type:4}
            ]
        }
    }


    static navigationOptions = ({ navigation }) => ({
        title: '消息',
        tabBarIcon: ({ focused }) => {
            const { params } = navigation.state || {}; // 选项卡名称
            let setIcon = (focused,isNews) =>{
                let icons = [
                    {focused:true,isNews:true,icon:require('../../images/icons/entryIcon/message_active_has.png')},
                    {focused:true,isNews:false,icon:require('../../images/icons/entryIcon/message_active.png')},
                    {focused:false,isNews:false,icon:require('../../images/icons/entryIcon/message.png')},
                    {focused:false,isNews:true,icon:require('../../images/icons/entryIcon/message_has.png')},
                ]
                return icons.find((item)=>item.focused === focused && item.isNews === isNews) || {icon:require('../../images/icons/entryIcon/message.png')}
            }
            let icon = setIcon(focused,(params || {}).isNews).icon
            if(focused && !(params || {}).isNews){
                icon = require('../../images/icons/entryIcon/message_active.png')
            }
            return(<Image style={{ width: 25, height: 25 }} source={icon} />)
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
    }

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
        let { api } = this.props.config.requestUrl
        this.props.dispatch({
            type:'getLastNews/getList',
            payload:api
        })
    }
    // 阅读消息
    read = async (type) => {
        this.setState({ loading: true })
        try {
            let { api } = this.props.config.requestUrl
            let params = { type }
            await Api.read(api, params)
            this.setState({ loading: false })

        } catch (e) {
            Toast.message('阅读消息失败！')
            this.setState({ loading: false })
        }
    }

    // 阅读动态消息
    readDt = async () => {
        this.setState({ loading: true })
        try {
            let { api } = this.props.config.requestUrl
            await Api.readDt(api)
            this.setState({ loading: false })

        } catch (e) {
            this.setState({ loading: false })
            Toast.message('阅读动态消息失败！')
        }
    }
    // 跳转详情
    gotoDetail = async (item) => {
        BuryingPoint.add({
            page: '消息',
            target: this.setIcon(item.type).title+'_button',
        });
        if(this.props.guest) return;
        if (item.type === 3) {
            this.readDt()
        } else {
            this.read(item.type)
        }
        this.props.navigation.navigate('messageDetail', { ...item, init: this.init })
    }
    // 消息入口的配置
    setIcon = (type) => {
        const icons = [
            { type: 1, title: '重要提醒', icon: require('../../images/icons/news_zytx.png') },
            { type: 2, title: '业务信息', icon: require('../../images/icons/news_yewu.png') },
            { type: 3, title: '动态消息', icon: require('../../images/icons/news_dt.png') },
            { type: 4, title: '活动推荐', icon: require('../../images/icons/news_hdtj.png') },
        ]
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
    // 每项布局
    contents = (item) => {
        // 类型为3 的时候判断number是否为0    其他的时候是判断simpleContent
        const type = item.type === 3 ? ((item.number === 0 && item.simpleContent === '0') || !item.messageType ? 'other' : item.type) : item.simpleContent ? item.type : 'other'
        const simpleContent = (item.simpleContent && (item.type === 1 || item.type === 2)) ? JSON.parse(item.simpleContent) : {}
        return (
            <TouchableOpacity
                style={[newsStyles.row, newsStyles.newsBox]}
                activeOpacity={0.8}
                onPress={() => this.gotoDetail(item)}
                key={item.type}
            >
                <View style={newsStyles.row}>
                    <Image style={newsStyles.listIcon} source={(this.setIcon(item.type) || {}).icon} />
                    {
                        item.number ?
                            <View style={[newsStyles.row, newsStyles.marker]}>
                                <Text style={newsStyles.markerText}>{item.number}</Text>
                            </View>
                            : null
                    }
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
                        <SwitchViewItem type={[1,2]}>
                            <View style={[newsStyles.row, { width: scaleSize(567) }]}>
                                <View style={[newsStyles.row, newsStyles.flagBox]}>
                                    <Text style={newsStyles.flagText}>{item.messageTypeName}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[newsStyles.contentText]} numberOfLines={1}>
                                        {CommonItem(item.messageType || '', simpleContent, this.setContent(item.messageType))}
                                    </Text>
                                </View>
                            </View>
                        </SwitchViewItem>
                        <SwitchViewItem type={3}>
                            {
                                item.messageType === 'CustomerNumber'
                                ?
                                <Text style={[newsStyles.contentText, { width: scaleSize(497) }]} numberOfLines={1}>您有
                                    <Text style={{ color: '#FE5139', fontSize: scaleSize(28) }}>{item.number}</Text>
                                位客户有了新动态
                                </Text>
                                :
                                <Text style={[newsStyles.contentText, { width: scaleSize(497) }]} numberOfLines={1}>您一共有
                                    <Text style={{ color: '#FE5139', fontSize: scaleSize(28) }}>{item.simpleContent}</Text>
                                条客户动态消息
                                </Text>
                            }

                        </SwitchViewItem>
                        <SwitchViewItem type={4}>
                            <View style={{ height: scaleSize(40) }}><Text style={newsStyles.contentText}>{item.simpleContent}</Text></View>
                        </SwitchViewItem>
                        <SwitchViewItem type='other'>
                            <View style={{ height: scaleSize(40) }}><Text style={newsStyles.contentText}>暂无</Text></View>
                        </SwitchViewItem>
                    </SwitchView>
                </View>
            </TouchableOpacity>
        )

    }

    setMessageProps = (props) => {
        let {count,newsInfo,isNews} = props.getLastNews || {}
        let num = count
        let data = newsInfo.sysMessageList || []
        let list = data
        list = list.sort((a,b) => {return a.type - b.type})
        this.setState({
            num,list,isNews
        });
        if(!props.getLastNews.flag){
            this.props.navigation.setParams({isNews})
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.getLastNews.searchNum === this.props.getLastNews.searchNum){
            return false
        }
        this.setMessageProps(newProps)
    }

    render() {
        let { num,list, loading } = this.state
        return (
            // <Page TopBarProps={{statusBarStyle: 'dark-content'}} title={`通知消息 ${num ? '(' + num + ')' : ''} `} leftView={null} scroll={false}>
            <View style={{height: '100%', flex: 1}}>
                <NavigationBar
                    style={[{ backgroundColor: '#FFF' }]}
                    title={`通知消息 ${num ? '(' + num + ')' : ''} `}
                    titleStyle={{ color: '#000', fontSize: scaleSize(32),fontWeight:'500' }}
                />
                <View style={{flex: 1}}>
                    <FlatList
                        data={list}
                        refreshing={loading}
                        style={{ flex: 1, marginTop: 80 }}
                        onRefresh={this.init}
                        renderItem={({ item }) => this.contents(item)}
                    />
                </View>
                <QuickEntry visible={this.props.config.showQuickPage.routeName === 'Message'} />
            </View>
            // </Page>
        )
    }
}

const mapStateToProps = ({ config, user, getLastNews }) => {
    return { config, user, getLastNews, guest: user.status === 404 }
}
export default connect(mapStateToProps)(MessageList)


