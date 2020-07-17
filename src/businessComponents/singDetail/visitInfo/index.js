/**
 * 到访信息-业务组件(签约，到访详情有用到)
 * created by chenfengxia 2019-08-28
 *  */
import React,{Component} from 'react';
import {Text, View,TouchableOpacity,Image} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil'
import Phone from '../../phone/index'
import moment from 'moment';
const visitInfoStyles = {
    wrap:{
        backgroundColor:'#ffffff',
        paddingLeft:scaleSize(32),
        paddingRight:scaleSize(32),
        paddingBottom:scaleSize(32)
    },
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start'
    },
    column:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    titleBox:{
        height:scaleSize(88),
        borderBottomWidth:1,
        borderColor:'#EAEAEA',
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    title:{
        color:'#000000',
        fontSize:scaleSize(28),
        fontWeight:'bold'
    },
    title_reportTime:{
        fontSize: scaleSize(28),
        color: '#868686'
    },
    contentBox:{
        paddingTop:scaleSize(20)
    },
    label:{
        marginRight:scaleSize(16),
        color:'#868686',
        fontSize:scaleSize(28),
        lineHeight:scaleSize(40)
    },
    normalText:{
        color:'#000000',
        fontSize:scaleSize(28),
        lineHeight:scaleSize(40),
        flex:1
    },
    img:{
        width:scaleSize(217),
        height:scaleSize(217),
        marginTop:scaleSize(24),
        borderRadius:scaleSize(8)
    },
    customer_phones:{
        width: '100%'
    }
}
export default class VisitInfo  extends Component {
    constructor(){
        super()
    }

    render(){
        let {data = {},title,gotoPreview,isHistory,zhuData = {}} = this.props
        let fileList = data.files || []
        let customers = data.customers || []
        let beltProtectDay = data.beltProtectDay
        if( data.beltProtectDay !== '当天' && data.beltProtectDay !== '永久'){
            if(data.beltProtectDay >= 99999){
                beltProtectDay = '永久'
            } else if(data.beltProtectDay == 0){
                beltProtectDay = '当天'
            } else {
                beltProtectDay = `${data.beltProtectDay}天`
            }
        }
        if (typeof(beltProtectDay) === 'undefined') {
            beltProtectDay = ''
        }
        return(
            <View style={visitInfoStyles.wrap}>
                <View style={visitInfoStyles.titleBox}>
                    <Text style={visitInfoStyles.title}>{title}</Text>
                    {data.visitTime && (
                        <Text style={visitInfoStyles.title_reportTime}> | {moment(data.reportTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    )}
                </View>
                {
                    !isHistory?
                        <View style={[visitInfoStyles.row,visitInfoStyles.contentBox,{justifyContent:'space-between',alignItems:'center'}]}>
                            <View style={[visitInfoStyles.row,{flex: 1}]}>
                                <Text style={[visitInfoStyles.label]}>项目经理：</Text>
                                <Text style={[visitInfoStyles.normalText,{flex: 1}]} numberOfLines={1}>
                                    {zhuData.trueName}
                                </Text>
                            </View>
                            {
                                zhuData.phoneNumber?<Phone telPhone={zhuData.phoneNumber}/>
                                    :null
                            }

                        </View>
                        :null
                }

                <View style={[visitInfoStyles.row,visitInfoStyles.contentBox]}>
                    <Text style={visitInfoStyles.label}>到访客户：</Text>
                    <Text style={visitInfoStyles.normalText}>{customers[0] && customers[0].clientName}</Text>
                </View>

                <View style={[visitInfoStyles.row,visitInfoStyles.contentBox,{alignItems:'flex-start'}]}>
                    <Text style={[visitInfoStyles.label]}>联系电话：</Text>
                    <View style={visitInfoStyles.customer_phones}>
                        {
                            customers.map((item,key)=>{
                                return(
                                    <View key={key} style={[visitInfoStyles.row,{paddingBottom:scaleSize(16)}]}>
                                        <Text style={[visitInfoStyles.normalText]}>{item.clientPhone}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>

                <View style={[visitInfoStyles.row,visitInfoStyles.contentBox]}>
                    <Text style={visitInfoStyles.label}>实际到访时间：</Text>
                    <Text style={visitInfoStyles.normalText}>{data.visitTime && moment(data.visitTime).format('YYYY-MM-DD HH:mm')}</Text>
                </View>

                <View style={[visitInfoStyles.row,{flexWrap:'wrap',flex:1}]}>

                    {
                        fileList.map((item,key)=>{
                            return(
                                <TouchableOpacity
                                    key={key}
                                    activeOpacity={0.9}
                                    onPress={()=>gotoPreview(key,fileList)}
                                >
                                    <Image style={[visitInfoStyles.img,{marginRight: ((key+1)%3)? scaleSize(16):0}]} source={{uri:item.fileUrl}} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}
