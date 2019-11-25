/**
 * 认购信息-业务组件
 * created by chenfengxia 2019-08-28
 *  */
import React,{Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil'
import Phone from '../../phone/index'
import moment from 'moment'
const subInfoStyles = {
    wrap:{
        // height:scaleSize(471),
        backgroundColor:'#ffffff',
        paddingLeft:scaleSize(32),
        paddingRight:scaleSize(32),
        paddingBottom:scaleSize(32)
    },
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    titleBox:{
        height:scaleSize(88),
        borderBottomWidth:scaleSize(1),
        borderColor:'#EAEAEA',
        justifyContent:'center'
    },
    title:{
        color:'#000000',
        fontSize:scaleSize(28),
        fontWeight:'bold'
    },
    contentBox:{
        paddingTop:scaleSize(20)
    },
    label:{
        width:scaleSize(127),
        marginRight:scaleSize(16),
        color:'#868686',
        fontSize:scaleSize(28)
    },
    normalText:{
        color:'#000000',
        fontSize:scaleSize(28)
    },
    arrow:{
        width:scaleSize(16),
        height:scaleSize(30),
        marginLeft:scaleSize(8)
    },
    titlePre:{
        width:scaleSize(6),
        height:scaleSize(26),
        backgroundColor:'#49A1FF',
        marginRight:scaleSize(21)
    },
    timeIcon:{
        width:scaleSize(26),
        height:scaleSize(26),
        marginRight:scaleSize(8)
    }
}

export default class SubscriptionInfo  extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let {data = {},title,isHistory,gotoHistory,titleBg,hasHistory,zhuData = {},historyText} = this.props
        // console.log(data,'rengou')
        let amount = title.indexOf('签约') !== -1? data.dealAmount : data.subScriptionAmount
        let time = title.indexOf('签约') !== -1? data.dealTime : data.markTime
        let rgTime = title.indexOf('签约') !== -1? moment(time).format('YYYY-MM-DD HH:mm'):moment(data.subScriptionTime).format('YYYY-MM-DD')
        let text = title.indexOf('签约') !== -1?'签约':'认购'
        let customers = data.customers || []

        return(
            <View style={subInfoStyles.wrap}>
                <View style={subInfoStyles.titleBox}>
                    <View style={[subInfoStyles.row,{justifyContent:'space-between'}]}>
                        <View style={subInfoStyles.row}>
                            {
                                isHistory?
                                    <View style={[subInfoStyles.titlePre,{backgroundColor:titleBg}]}/>
                                    :null
                            }
                            <Text style={subInfoStyles.title}>{title}</Text>
                        </View>
                        {
                            isHistory?
                                <View style={subInfoStyles.row}>
                                    <Image style={subInfoStyles.timeIcon} source={require('../../../images/icons/time.png')}/>
                                    <Text style={{color:'#868686',fontSize:scaleSize(28)}}>
                                        {time && moment(time).format('YYYY-MM-DD HH:mm:ss')}
                                    </Text>
                                </View>
                                :null
                        }

                        {
                            hasHistory?
                                <TouchableOpacity
                                    style={subInfoStyles.row}
                                    activeOpacity={0.9}
                                    onPress={gotoHistory}
                                >
                                    <Text style={{color:'#000000',fontSize:scaleSize(24)}}>{historyText}</Text>
                                    <Image style={subInfoStyles.arrow} source={require('../../../images/icons/arrow_right.png')}/>
                                </TouchableOpacity>
                                :null
                        }
                    </View>
                </View>
                {
                    isHistory?
                        <Text style={[subInfoStyles.normalText,{paddingTop:scaleSize(24)}]}>认购历史</Text>
                        :null
                }
                {
                    !isHistory?
                        <View style={[subInfoStyles.row,subInfoStyles.contentBox,{justifyContent:'space-between'}]}>
                            <View style={subInfoStyles.row}>
                                <Text style={[subInfoStyles.label]}>责任驻场:</Text>
                                <Text style={[subInfoStyles.normalText]}>{zhuData.trueName}</Text>
                            </View>
                            {
                                zhuData.phoneNumber?<Phone telPhone={zhuData.phoneNumber}/>
                                    :null
                            }
                        </View>
                        :null
                }
                <View style={[subInfoStyles.row,subInfoStyles.contentBox]}>
                    <View style={subInfoStyles.row}>
                        <Text style={[subInfoStyles.label]}>订单号:</Text>
                        <Text style={[subInfoStyles.normalText]}>{data.subScriptionNo}</Text>
                    </View>
                </View>
                <View style={[subInfoStyles.row,subInfoStyles.contentBox,{alignItems:'flex-start'}]}>
                    <Text style={[subInfoStyles.label]}>认购商铺:</Text>
                    <Text style={[subInfoStyles.normalText,{flex:1,flexWrap:'wrap',marginRight:scaleSize(32)}]}>{data.shopName}</Text>
                </View>
                <View style={[subInfoStyles.row,subInfoStyles.contentBox,{alignItems:'flex-start'}]}>
                    <Text style={[subInfoStyles.label]}>客户信息:</Text>
                    <View>
                        {
                            customers.map((item,key)=>{
                                return(
                                    <View key={key} style={[subInfoStyles.row,{paddingBottom:customers.length>1?scaleSize(16):0}]}>
                                        <Text style={[subInfoStyles.normalText,{paddingRight:scaleSize(8)}]}>{item.clientName}</Text>
                                        <Text style={[subInfoStyles.normalText]}>{item.clientPhone}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={[subInfoStyles.row,subInfoStyles.contentBox]}>
                    <Text style={[subInfoStyles.label]}>{text}金额:</Text>
                    <Text style={[subInfoStyles.normalText,{color:'#FE5139'}]}>{amount && `￥${String(amount).replace( /\B(?=(\d{3})+(?!\d))/g, ',' )}`}</Text>
                </View>
                <View style={[subInfoStyles.row,subInfoStyles.contentBox]}>
                    <Text style={[subInfoStyles.label]}>{text}时间:</Text>
                    <Text style={[subInfoStyles.normalText]}>{rgTime}</Text>
                </View>

            </View>
        )
    }
}
