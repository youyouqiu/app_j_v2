/**
 * 报备信息-业务组件(签约，到访详情有用到)
 * created by chenfengxia 2019-08-28
 *  */
import React,{Component} from 'react';
import {Text, View} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil'
import moment from 'moment';
const reportInfoStyles = {
    wrap:{
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
    column:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start'
    },
    titleBox:{
        height:scaleSize(88),
        borderBottomWidth:scaleSize(1),
        borderColor:'#EAEAEA',
        justifyContent:'space-between'
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
    sexBox:{
        width:scaleSize(30),
        height:scaleSize(30),
        marginRight:scaleSize(9),
        justifyContent:'center',
        borderRadius:scaleSize(4),
        lineHeight:scaleSize(30)
    },
    sexText:{
        color:'#ffffff',
        fontSize:scaleSize(22)
    }
}
export default class ReportInfo  extends Component {
    render(){
        let {data = {},title} = this.props
        let customer = (data.customers || [])[0] || {}
        let sex = customer.clientSex
        let name = customer.clientName
        // console.log(data,'report')
        return(
            <View style={reportInfoStyles.wrap}>
                <View style={[reportInfoStyles.row,reportInfoStyles.titleBox]}>
                    <Text style={reportInfoStyles.title}>{title}</Text>
                </View>
                <View style={[reportInfoStyles.row,reportInfoStyles.contentBox]}>
                    <Text style={[reportInfoStyles.label]}>单号:</Text>
                    <Text style={[reportInfoStyles.normalText]}>{data.reportNo}</Text>
                </View>
                <View style={[reportInfoStyles.row,reportInfoStyles.contentBox]}>
                    <Text style={[reportInfoStyles.label]}>报备客户:</Text>
                    <View style={reportInfoStyles.row}>
                        <View style={[
                            reportInfoStyles.row,
                            reportInfoStyles.sexBox,
                            {backgroundColor:sex == 0 ? '#FF5374':sex == 1 ?'#49A1FF':'#fff'}
                        ]}>
                            <Text style={reportInfoStyles.sexText}>{sex == 0?'女':sex == 1?'男':''}</Text>
                        </View>
                        <Text style={[reportInfoStyles.normalText]}>{name}</Text>
                    </View>
                </View>
                <View style={[reportInfoStyles.row,reportInfoStyles.contentBox]}>
                    <Text style={[reportInfoStyles.label]}>报备时间:</Text>
                    <Text style={[reportInfoStyles.normalText]}>{data.reportTime && moment(data.reportTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </View>
                <View style={[reportInfoStyles.row,reportInfoStyles.contentBox,{alignItems:'flex-start'}]}>
                    <Text style={[reportInfoStyles.label]}>联系电话:</Text>
                    <View style={reportInfoStyles.column}>
                        {
                            (data.customers || []).map((item,key)=>{
                                return <Text key={key} style={[reportInfoStyles.normalText,{paddingBottom:scaleSize(8)}]}>{item.clientPhone}</Text>
                            })
                        }
                    </View>
                </View>

            </View>
        )
    }
}