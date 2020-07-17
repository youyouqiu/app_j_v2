import React,{Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'
import navigation from '../../utils/navigation'
import {verifyUser} from '../../utils/utils'
import {connect} from 'react-redux'
import moment from 'moment'
import {checkPermission} from "../../utils/utils";
// import {checkPermission} from "../../utils/utils";

class IconItem extends Component {
    gotoPage = async (text,path) => {
        store.dispatch({type: 'config/updateQuickPage',
            payload: {}
        })
        if(path === 'businessScanPage'){
            const res = await checkPermission('camera', 500);
            if(res){
                navigation.navigate(path);
                let target = `${text}_button`;
                this.props.sendPoint.add({target,page:'快捷入口'})
            } else {

            }
            return false
        }
        if(path === 'addReport'){
            let res = await verifyUser('stronge', '', (
                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Text>您还未完善报备需要的个人信息</Text>
                    <Text>(姓名、经纪公司)</Text>
                </View>
            ), true)
            if(res){
                navigation.navigate(path);
            } else {

            }
            return false
        }
        if (path === 'businessCard'){
          let res = await verifyUser('stronge', '', (
              <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Text>请先加入公司，再使用此功能</Text>
              </View>
          ), false)
          if(res){
              navigation.navigate(path);
          } else {

          }
          return false
      }
        navigation.navigate(path);
        let target = `${text}_button`;
        this.props.sendPoint.add({target,page:'快接入口'})
    }
    render () {
        const {text, imageSource,path} = this.props

        return (
            <TouchableOpacity
                style={[styles.iconItem]}
                activeOpacity={0.8}
                onPress={()=>this.gotoPage(text,path)}
            >
                <Image source={imageSource} style={styles.iconItemImg}/>
                <Text style={[styles.iconItemText]}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}

class Content  extends Component {

    constructor (props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount () {
        Animated.parallel([

        ])
    }

    closeQuickModal = () => {
        store.dispatch({type: 'config/updateQuickPage',
            payload: {}
        })
    }

    render () {
        let quicks = [
            { text: '添加客户', imageSource: require('../../images/icons/tianjiakehu.png'), path: 'addCustom'},
            { text: '快速报备', imageSource: require('../../images/icons/kuaisubaobei2.png'), path: 'addReport'},
            { text: '公司码', imageSource: require('../../images/icons/ma2.png'), path: 'companyCode'},
            { text: '个人名片', imageSource: require('../../images/icons/businessCard.png'), path: 'businessCard'},
            { text: '扫一扫', imageSource: require('../../images/icons/sys2.png'), path: 'businessScanPage'},
            { text: '房贷计算器', imageSource: require('../../images/icons/entryIcon/fdjsq.png'), path: 'calculate'},
            // { text: '邀请注册', imageSource: require('../../images/icons/yaoqingzhuce.png'), path: ''},isResident
        ]
        let {user,weather} = this.props
        let userInfo = (user || {}).userInfo || {}
        // 公司码 必须又驻场
        if(!userInfo.isResident){
            quicks = quicks.filter((item)=>item.path !== 'companyCode')
        }
        // 自由经纪人 不能报备
        // if (user.status === 202) {
        //     quicks = quicks.filter((item)=>item.path !== 'addReport')
        // }

        return <View style={[styles.main]}>
            <View style={styles.header}>
                <Text style={styles.time}>{moment().format('HH:mm')}</Text>
                <View style={styles.secondLine}>
                    <Text style={styles.date}>{`${moment().format('YYYY年MM月DD日')}`}</Text>
                    <Text style={[styles.weather, styles.date]}>{((weather || {}).now || {}).cond_txt}</Text>
                </View>
            </View>
            <View style={styles.quicks}>
                {
                    quicks.map((item, i) => {
                        return <IconItem {...item} key={i} sendPoint={this.props.sendPoint} />
                    })
                }
            </View>
            <View style={styles.bottom}>
                <View style={styles.line}/>
                <Text style={styles.bottomText}>快速入口</Text>
                <View style={styles.line}/>
            </View>
            <View style={[styles.closeBtnView]}>
                <TouchableOpacity style={styles.bottomClose} onPress={this.closeQuickModal}>
                    <Image style={styles.bottomCloseImg} source={require('../../images/icons/close_bold3.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    time: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: scaleSize(72),
        lineHeight: scaleSize(100)
    },
    header: {
        paddingLeft: scaleSize(65),
    },
    date: {
        fontSize: scaleSize(28),
        fontWeight: '400',
        color: '#868686',
        lineHeight: scaleSize(40)
    },
    weather: {
        marginLeft: scaleSize(33)
    },
    secondLine: {
        display: 'flex',
        flexDirection: 'row'
    },
    quicks: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        height: scaleSize(460),
        alignContent: 'space-around',
        padding: 0,
        marginTop: scaleSize(91)
    },
    iconItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '33.3%',
        // position: 'absolute',
        height: scaleSize(144)
    },
    iconItemImg: {
        width: scaleSize(120),
        height: scaleSize(120),
        marginBottom: scaleSize(24)
    },
    iconItemText: {
        fontSize: scaleSize(28),
        color: '#000'
    },
    bottom: {
        marginTop: scaleSize(40),
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    line: {
        width: scaleSize(243),
        height: 1,
        backgroundColor: '#EAEAEA'
    },
    bottomText: {
        color: '#000',
        fontSize: scaleSize(28),
        fontWeight: '400',
        lineHeight: scaleSize(40)
    },
    bottomClose: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleSize(60),
        height: scaleSize(80),
        marginTop: scaleSize(74),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    closeBtnView: {
        bottom: '9%',
        left: 0,
        right: 0,
        position: 'absolute'
    },
    bottomCloseImg: {
        width: scaleSize(68),
        height: scaleSize(68)
    }
})

const mapStateToProps = ({config, user, weather, point})=> {
    return {
        config,
        user,
        weather,
        sendPoint:point.buryingPoint
    }
}
export default connect(mapStateToProps)(Content)
