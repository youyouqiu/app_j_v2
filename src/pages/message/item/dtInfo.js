/**
 * 客户动态
 */

import React,{Component} from 'react';
import {Text, View, Image} from 'react-native';
import {newsStyles} from '../styles'
import {scaleSize} from '../../../utils/screenUtil'
import moment from 'moment'

export default class DtItem  extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    setContent = (item) =>{
        let content = null
        if(item.trackType == 1){
            content = (
                <Text style={newsStyles.contentText}>
                    <Text style={newsStyles.nameText}>{item.userName}</Text>第
                    <Text style={newsStyles.nameText}>{item.viewCount}</Text>次浏览了
                    <Text style={newsStyles.nameText}>{item.buildingName}</Text>
                    {`${item.shopName? '的':''}`}
                    <Text style={newsStyles.nameText}>{item.shopName}</Text>
                </Text>
            )
        } else if(item.trackType == 2){
            content = (
                <Text style={newsStyles.contentText}>
                    <Text style={newsStyles.nameText}>{item.userName}</Text>关注了
                    <Text style={newsStyles.nameText}>{item.buildingName}</Text>
                    {`${item.shopName? '的':''}`}
                    <Text style={newsStyles.nameText}>{item.shopName}</Text>
                </Text>
            )
        } else if(item.trackType == 3){
            content = (
                <Text style={newsStyles.contentText}>
                    <Text style={newsStyles.nameText}>{item.userName}</Text>取消关注了
                    <Text style={newsStyles.nameText}>{item.buildingName}</Text>
                    {`${item.shopName? '的':''}`}
                    <Text style={newsStyles.nameText}>{item.shopName}</Text>
                </Text>
            )
        } else if(item.trackType == 4){
            content = (
                <Text style={newsStyles.contentText}>
                    <Text style={newsStyles.nameText}>{item.userName}</Text>搜索了
                    <Text style={newsStyles.nameText}>{item.word}</Text>
                </Text>
            )
        } else if(item.trackType == 5 && item.dataType == 1){
            content = (
                <Text style={newsStyles.contentText}>
                    <Text style={newsStyles.nameText}>{item.userName}</Text>筛选了
                    {item.wordType == 1?'价格':item.wordType == 2?'面积':''}
                    <Text style={newsStyles.nameText}>{item.word}</Text>的楼盘
                </Text>
            )
        }
        else if(item.trackType == 5 && item.dataType == 2){
            content = (
                <Text style={newsStyles.contentText}>
                    <Text style={newsStyles.nameText}>{item.userName}</Text>在
                    <Text style={newsStyles.nameText}>{item.buildingName}</Text>筛选了
                    {item.wordType == 1?'价格':item.wordType == 2?'面积':''}
                    <Text style={newsStyles.nameText}>{item.word}</Text>的商铺
                </Text>
            )
        }

        return content
    }

    render(){
        let {item} = this.props
        let content = this.setContent(item)
        let imgUrl = item.headImg ? {uri: item.headImg} : require('../../../images/pictures/head.png')
        let data = {}
        return(
            <View key={item.id} style={newsStyles.wranWrap}>
                <View style={newsStyles.row}>
                    <Image style={newsStyles.userIcon} source={imgUrl}/>
                    <View style={{flex:1}}>
                        <View style={[newsStyles.row,{justifyContent:'space-between'}]}>
                            <Text style={[newsStyles.rightTime,{paddingBottom:scaleSize(22)}]}>
                                {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                            </Text>
                            {
                                data.isRead == false?
                                    <View style={newsStyles.unRead}/>
                                    :null
                            }
                        </View>
                        <View style={{width:scaleSize(542)}}>{content}</View>
                    </View>
                </View>
                
            </View>
        )
    }
}