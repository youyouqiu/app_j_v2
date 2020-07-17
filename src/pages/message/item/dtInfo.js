/**
 * 客户动态
 */

import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
// import {newsStyles} from '../styles'
import { StyleSheet } from 'react-native';
import {scaleSize} from '../../../utils/screenUtil'
import moment from 'moment'
import {customerDynamics} from "../handle";

 export default class DtItem extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    gotoBuildingDetail = (id) => {
        this.props.navigation.navigate('buildingDetail',{buildingTreeId:id})
    };

     gotoShopDetail = (buildingTreeId, shopId) => {
         this.props.navigation.navigate('shopDetail', {shopId, buildingTreeId})
     };

    render() {
        let {item} = this.props;
        const contents = item.messageType === 'NotPush' ? JSON.parse(item.contents) : JSON.parse(item.data)
        let imgUrl
        if (item.messageType === 'NotPush') {
          imgUrl = contents.headImg ? {uri: contents.headImg} : require('../../../images/pictures/head.png');
        } else {
          const data = JSON.parse(item.data)
          imgUrl = data.headimg ? {uri: data.headimg} : require('../../../images/pictures/head.png');
        }
        return (
            <TouchableOpacity activeOpacity={0.8}  style={styles['item']} onPress={() => {
              if (item.messageType === 'NotPush') {
                contents.customerId && this.props.navigation.navigate('dynamicLogging', { id: contents.customerId, source: 'weixin' })
                return
              } 
              const data = JSON.parse(item.data)
              data?.customerId && this.props.navigation.navigate('dynamicLogging', { id: data?.customerId, source: 'weixin' })
            }}>
                <Text style={styles['time-text']}>{moment(item.sendTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <View style={styles['content']}>
                    <Image style={styles['user-icon']} source={imgUrl}/>
                    <View style={styles['user-info']}>
                        <Text style={styles['user-name']}>{item.title}</Text>
                        <Text style={styles['user-browse']}>{item.messageType === 'NotPush' ? customerDynamics(contents || {}) : item.contents}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        /*return (
            <View key={item.id} style={newsStyles.wranWrap}>
                <View style={newsStyles.row}>
                    <Image style={newsStyles.userIcon} source={imgUrl}/>
                    <View style={{flex: 1}}>
                        <View style={[newsStyles.row, {justifyContent: 'space-between'}]}>
                            <Text style={[newsStyles.rightTime, {paddingBottom: scaleSize(22)}]}>
                                {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                            </Text>
                            {
                                data.isRead == false ?
                                    <View style={newsStyles.unRead}/>
                                    : null
                            }
                        </View>
                        <View style={{width: scaleSize(542)}}>{content}</View>
                    </View>
                </View>

            </View>
        )*/
    }
}


const styles = StyleSheet.create({
    'item': {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical: scaleSize(16),
        // paddingHorizontal: scaleSize(32),
        backgroundColor: '#F8F8F8'
    },
    'time-text': {
        marginBottom: scaleSize(24),
        color: '#CBCBCB',
        fontSize: scaleSize(24)
    },
    'content': {
        display:'flex',
        flexDirection:'row',
        width: '100%',
        alignItems:'center',
        backgroundColor: '#FFFFFF',
        padding: scaleSize(24)
    },
    'user-icon': {
        width:scaleSize(100),
        height:scaleSize(100),
        borderRadius: scaleSize(50),
        marginRight:scaleSize(16)
    },
    'user-info': {
        display:'flex',
        flexDirection:'column',
        flex: 1
    },
    'user-name': {
        fontSize: scaleSize(32),
        color: '#000',
        marginBottom: scaleSize(16)
    },
    'user-browse': {
        fontSize: scaleSize(28),
        color: '#868686',
        width: '100%',
    }
});
