import React from 'react';
import {Text} from 'react-native';
import {newsStyles} from '../styles'
import moment from 'moment'

export const CommonItem = (type,extData = {},info = {}) =>{
    let content = null
    if(type == 'ReportRepetition'){
        content = (
            <Text style={newsStyles.contentText}>
                <Text style={newsStyles.nameText}>{extData.userTrueName}</Text>和<Text style={newsStyles.nameText}>{extData.repetitionTrueName}</Text>
                报备的<Text style={newsStyles.nameText}>{extData.repetitionPhone}</Text>可能存在重客风险，请关注实际情况
            </Text>
        )
    } 
    else if(type == 'RemindProtectBeltLook'){
        content = (
            <Text style={newsStyles.contentText}>
                <Text style={newsStyles.nameText}>{extData.clientNameAndPhone}</Text>的到访保护期还剩
                <Text style={newsStyles.numText}>{extData.day}</Text>天
                {extData.buildingName && `(${extData.buildingName})`}
            </Text>
        )
    }
    else if(type == 'RemindNotSign'){
        content = (
            <Text style={newsStyles.contentText}>
                <Text style={newsStyles.nameText}>{extData.clientNameAndPhone}</Text>确认认购
                {extData.buildingName && `'${extData.buildingName} '`}
                {extData.shopName}
                已超过
                <Text style={newsStyles.numText}>{extData.day}</Text>天，请尽快跟进签约
            </Text> 
        )
    }
    else if(type == 'RemindComfirmBeltLook'){
        content = (
            <Text style={newsStyles.contentText}>
                <Text style={newsStyles.nameText}>{extData.clientNameAndPhone}</Text>到访的
                <Text style={newsStyles.nameText}>{extData.buildingName}</Text> 还未进行确认，
                <Text style={newsStyles.numText}>{extData.hour}小时</Text>后将失效
            </Text>
        )
    } else if(type.indexOf('B') !== -1) {
        content = (
            <Text style={newsStyles.contentText}>
                {extData.buildingName && `"${extData.buildingName}"`}
                的项目经理
                <Text style={newsStyles.nameText}>{extData.onSiteName}</Text>
                已确认<Text style={newsStyles.nameText}>{extData.clientNameAndPhone || ''}</Text>
                {
                    info.text == '到访'?
                        <Text style={newsStyles.contentText}>{`的${info.text}记录，保护期至`}
                            <Text style={newsStyles.numText}>{extData.date && moment(extData.date).format('MM-DD HH:mm')}</Text>
                        </Text>
                        :
                        <Text style={newsStyles.contentText}>
                            {`的${info.text}${info.text == '认购'?`的${extData.shopName || ''}`:''}，${info.endTitle || ''}`}
                        </Text>
                }
                
            </Text>
        )
    }
    return content
}