/**
 * 业务消息
 */

import React,{Component} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {newsStyles} from '../styles'
import {scaleSize} from '../../../utils/screenUtil'
import {setTimeFormat} from '../../../utils/time'
import {CommonItem} from './commom'

export default class YewuItem  extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    setContent = (type) =>{
        const contents = [
            {type:'BusinessConfirmBeltLook',title:'到访单已确认',text:'到访',bgColor:'#DEEEFF',textColor:'#49A1FF',endTitle:''},
            {type:'BusinessConfirmSubscription',title:'认购已确认',text:'认购',bgColor:'#E6ECFF',textColor:'#66739B',endTitle:'请尽快跟进签约'},
            {type:'BusinessConfirmSigned',title:'签约已确认',text:'签约',bgColor:'#FFE1DC',textColor:'#FE5139',endTitle:'恭喜开单'},
            {type:'BusinessConfirmExchangeShops',title:'已换房',text:'换房',bgColor:'#FFD9E9',textColor:'#FF5A9D',endTitle:'请知晓'},
            {type:'BusinessConfirmExchangeCustomer',title:'已换客',text:'换客',bgColor:'#FFD9E9',textColor:'#FF5A9D',endTitle:'请知晓'},
        ]
        return contents.find(item => item.type === type)
    }

    render(){
        let {item,gotoPage} = this.props
        console.log(item,'item222')
        let info = this.setContent(item.messageType) || {}
        let extData = (JSON.parse(item.data) || {}).extData || JSON.parse(item.data) || {}
        let data = item.sysMessageSendRecordResponses || {}
        return(
            <TouchableOpacity 
                style={newsStyles.wranWrap} 
                key={item.id}
                activeOpacity={0.8}
                onPress={gotoPage}
            >
                <View style={[newsStyles.row,{justifyContent:'space-between',paddingBottom:scaleSize(24)}]}>
                    <View style={newsStyles.row}>
                        <View style={[newsStyles.row,newsStyles.litlePre,{backgroundColor:info.bgColor}]}>
                            <Text style={{fontSize:scaleSize(24),color:info.textColor}}>{info.text}</Text>
                        </View>
                        <Text style={newsStyles.text}>{info.title}</Text>
                        {
                            data.isRead == false?
                                <View style={newsStyles.unRead}/>
                                :null
                        }
                    </View>
                    <Text style={newsStyles.rightTime}>{setTimeFormat(item.sendTime)}</Text>
                </View>
                <View>
                    {CommonItem(item.messageType,extData,info)}
                </View>
            </TouchableOpacity>
        )
    }

}