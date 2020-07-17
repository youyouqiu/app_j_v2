/**
 * 详情-楼盘基本信息-业务组件（签约详情）
 * created by chenfengxia 2019-08-28
 *  */
import React,{Component} from 'react';
import {Text, View, Image,TouchableOpacity} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil'
import Phone from '../../phone/index'
const buildInfoStyle = {
    duiIcon:{
        width:scaleSize(31),
        height:scaleSize(31),
        marginRight:scaleSize(16)
    },
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    column:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
    topBox:{
        height:scaleSize(88),
        backgroundColor:'#3AD047',
        justifyContent:'center'
    },
    topText:{
        color:'#ffffff',
        fontSize:scaleSize(24)
    },
    label:{
        color:'#868686',
        fontSize:scaleSize(28)
    },
    normalText:{
        color:'#000000',
        fontSize:scaleSize(28)
    },
    padding:{
        paddingLeft:scaleSize(32),
        paddingRight:scaleSize(32),
        backgroundColor:'#ffffff'
    },
    buildImg:{
        width:scaleSize(240),
        height:scaleSize(186),
        marginRight:scaleSize(39),
        borderRadius:scaleSize(8)
    },
    stateText:{
        fontSize:scaleSize(22),
        color:'#3AD047',
    },
    buildName:{
        width:scaleSize(406),
        color:'#000000',
        fontSize:scaleSize(32),
        fontWeight:'bold',
    },
    buildCode:{
        width:scaleSize(487),
        color:'#868686',
        fontSize:scaleSize(24),
        paddingBottom:scaleSize(16),
        paddingTop:scaleSize(8)
    },
    baseInfo:{
        // height:scaleSize(272),
        alignItems:'flex-start',
        paddingTop:scaleSize(24),
        paddingBottom:scaleSize(24)
    },
    statusBox:{
        width:scaleSize(64),
        height:scaleSize(33),
        borderRadius:scaleSize(2),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginRight:scaleSize(3)
    },
    buildType:{
        backgroundColor:'#F4F5F9',
        borderRadius:scaleSize(2),
        paddingLeft:scaleSize(8),
        paddingRight:scaleSize(8),
        paddingTop:scaleSize(4),
        paddingBottom:scaleSize(4)
    },
    typeText:{
        color:'#66739B',
        fontSize:scaleSize(22)
    },
}

export default class BuildInfo  extends Component {
    
    render(){
        let {data = {},title,stateBg,stateColor,stateText,gotoProjectDetail} = this.props
        let basicInfo = data.basicInfo || {}
        let zhuc = (data.residentUserInfo || [])[0] || {}
        let realAttar = basicInfo.icon? {uri:basicInfo.icon} : require('../../../images/pictures/building_def.png')
        return(
            <View>
                <View style={[buildInfoStyle.row,buildInfoStyle.topBox]}>
                    <Image style={buildInfoStyle.duiIcon} source={require('../../../images/icons/dui.png')}/>
                    <Text style={buildInfoStyle.topText}>{title}</Text>
                </View>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={[buildInfoStyle.row,buildInfoStyle.padding,buildInfoStyle.baseInfo]}
                    onPress={gotoProjectDetail}
                >
                    <Image style={buildInfoStyle.buildImg} source={realAttar}/>
                    <View>
                        <Text style={buildInfoStyle.buildName}>{data.fullName}</Text>
                        <Text style={buildInfoStyle.buildCode}>{basicInfo.areaFullName}</Text>
                        <View style={[buildInfoStyle.row]}>
                            <View style={[buildInfoStyle.statusBox,{backgroundColor:stateBg}]}>
                                <Text style={[buildInfoStyle.stateText,{color:stateColor}]}>{stateText}</Text>
                            </View>
                            <View style={[buildInfoStyle.row,buildInfoStyle.buildType]}>
                                <Text style={buildInfoStyle.typeText}>{basicInfo.buildingType}</Text>
                            </View>
                        </View>
                    </View>

                </TouchableOpacity>

                <View style={{height:scaleSize(25)}}/>

                <View style={[buildInfoStyle.row,buildInfoStyle.padding,{justifyContent:'space-between',height:scaleSize(116)}]}>
                    <View style={buildInfoStyle.row}>
                        <Text style={buildInfoStyle.normalText}>{zhuc.trueName}</Text>
                        <Text style={[buildInfoStyle.label,{paddingBottom:scaleSize(3)}]}> | </Text>
                        <Text style={buildInfoStyle.label}>新空间驻场</Text>
                    </View>
                    {
                        zhuc.phone?<Phone telPhone={zhuc.phone}/>
                            :null
                    }
                </View>

            </View>
        )
    }
}