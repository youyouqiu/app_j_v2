import React,{Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'
import navigation from '../../utils/navigation'
import {connect} from 'react-redux'
import moment from 'moment'
import {checkPermission} from "../../utils/utils";

class IconItem extends Component {
    gotoPage = async (text,path) =>{
        store.dispatch({type: 'config/updateQuickPage',
            payload: {}
        })
        if(path === 'businessScanPage'){
            const res = await checkPermission('camera');
            if(res){
                navigation.navigate(path);
                let target = `${text}_button`;
                this.props.sendPoint.add({target,page:'快接入口'})
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
                <Text>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}

class Content  extends Component {

    constructor (props) {
        super(props)
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
            { text: '扫一扫', imageSource: require('../../images/icons/sys2.png'), path: 'businessScanPage'},
            // { text: '邀请注册', imageSource: require('../../images/icons/yaoqingzhuce.png'), path: ''},isResident

        ]
        let {user,weather} = this.props
        let userInfo = (user || {}).userInfo || {}
        // 公司码 必须又驻场
        if(!userInfo.isResident){
            quicks = quicks.filter((item)=>item.path !== 'companyCode')
        }

        return <View>
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
                        return <IconItem {...item} key={i} sendPoint={this.props.sendPoint}/>
                    })
                }
            </View>
            <View style={styles.bottom}>
                <View style={styles.line}/>
                <Text style={styles.bottomText}>快速入口</Text>
                <View style={styles.line}/>
            </View>
            <View>
                <TouchableOpacity style={styles.bottomClose} onPress={this.closeQuickModal}>
                    <Image style={styles.bottomCloseImg} source={require('../../images/icons/close_bold2.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%'
    },
    time: {
        color: '#000',
        fontWeight: '400',
        fontSize: scaleSize(72),
        lineHeight: scaleSize(100)
    },
    header: {
        paddingLeft: scaleSize(65),
    },
    date: {
        fontSize: scaleSize(28),
        fontWeight: '400',
        color: '#000',
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
        width: scaleSize(80),
        height: scaleSize(80),
        marginBottom: scaleSize(24)
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
        height: scaleSize(1),
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
        marginTop: scaleSize(100),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    closeBtn: {
        padding: scaleSize(30),
    },
    bottomCloseImg: {
        width: scaleSize(40),
        height: scaleSize(40)
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
