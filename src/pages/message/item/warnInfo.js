/**
 * 预警消息
 */

import React,{Component} from 'react';
import {Text, View, Image,TouchableOpacity} from 'react-native';
import {newsStyles} from '../styles'
import {scaleSize} from '../../../utils/screenUtil'
import {CommonItem} from './commom'
import moment from 'moment';

export default class WarnItem  extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    setContent = (type) =>{
        const contents = [
            {
                type:'ReportRepetition',
                title:'报备重客',
                icon:require('../../../images/icons/news_report.png')
            },
            {
                type:'RemindComfirmBeltLook',
                title:'还有到访未确认',
                icon:require('../../../images/icons/news_visit.png')
            },
            {
                type:'RemindProtectBeltLook',
                title:'保护期即将到期',
                icon:require('../../../images/icons/news_period.png')
            },
            {
                type:'RemindNotSign',
                title:'需要跟进签约',
                icon:require('../../../images/icons/news_sing.png')
            },
        ]

        return contents.find(item => item.type === type)

    }

    render(){
        let {item,gotoPage} = this.props
        let info = this.setContent(item.messageType) || {}
        let extData = (JSON.parse(item.data) || {}).extData || JSON.parse(item.data) ||{}
        let data = item.sysMessageSendRecordResponses || {}
        // console.log(item,'item111')

        return(
            <TouchableOpacity 
                style={newsStyles.wranWrap} 
                key={item.id}
                activeOpacity={0.8}
                onPress={gotoPage}
            >
                <View style={[newsStyles.row,{justifyContent:'space-between',paddingBottom:scaleSize(24)}]}>
                    <View style={newsStyles.row}>
                        <Image style={newsStyles.warnIcon} source={info.icon}/>
                        <Text style={newsStyles.text}>{info.title}</Text>
                        {
                            data.isRead == false?
                                <View style={newsStyles.unRead}/>
                                :null
                        }
                    </View>
                    <Text style={newsStyles.rightTime}>{item.sendTime && moment(item.sendTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </View>

                {CommonItem(item.messageType,extData,{})}
            

            </TouchableOpacity>
        )
    }

}