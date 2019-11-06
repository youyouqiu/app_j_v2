/**
 * 拨打电话
 * created by chenfengxia 2019-08-29
 */

import React,{Component} from 'react';
import {Text, View, TouchableOpacity, Image,Linking} from 'react-native';
import {scaleSize} from '../../utils/screenUtil'

const phoneStyles = {
    wrap:{
        width:scaleSize(175),
        height:scaleSize(55),
        borderWidth:scaleSize(2),
        borderColor:'#4B6AC5',
        borderRadius:scaleSize(8),
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:scaleSize(20)
    },
    phoneIcon:{
        width:scaleSize(30),
        height:scaleSize(30),
        marginRight:scaleSize(8),
        marginLeft:scaleSize(20)
    },
    phoneText:{
        color:'#4B6AC5',
        fontSize:scaleSize(24)
    }
}

export default class Phone  extends Component {
    constructor(props){
        super(props)
    }

    // 调用手机拨打电话功能
    selectTopic = (telPhone) => {
        let url = 'tel:' + telPhone
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                } else {
                    return Linking.openURL(url)
                }
            })
    }

    render(){
        let {telPhone} = this.props
        return(
            <View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={phoneStyles.wrap}
                    onPress={()=>this.selectTopic(telPhone)}
                >
                    <Image style={phoneStyles.phoneIcon} source={require('../../images/icons/phone.png')}/>
                    <Text style={phoneStyles.phoneText}>拨打电话</Text>
                </TouchableOpacity>
            </View>
        )
    }
}