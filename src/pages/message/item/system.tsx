/**
 * Created by Kary on 2020/05/11 11:39.
 */
import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,} from 'react-native';
import moment from 'moment';
import { NavigationScreenProps } from 'react-navigation';
import {scaleSize} from '@/utils/screenUtil';
import {UserInfo} from "@/models/types";
import {systemMessageType} from "@/models/getLastNews";
import {Toast} from '@new-space/teaset';

interface DataProps {
    pushId: string
    url?: string
    buildingTreeId?: string
}

interface ItemProps {
    sendTime: string
    contents: string
    title: string
    data?: string
    messageType: systemMessageType
}

const System: FunctionComponent<{ item: ItemProps} & NavigationScreenProps & {userInfo: UserInfo}> = ({item, navigation, userInfo}) => {
    console.log(item, '系统消息item');
    const info: DataProps = JSON.parse(item.data ?? '') ?? {};
    // let messageType = item.messageType;
    // if (messageType === 'BrokerStationing') messageType = 'BrokerStationing'
    const goPage = () => {
        switch (item.messageType) {
            case 'ReportRulesUpOk':// 楼盘报备规则已上传
                info.buildingTreeId && navigation.navigate('buildingDetail',{buildingTreeId: info.buildingTreeId});
                break;
            case 'BrokerStationing': // 已开启驻场权限
                    if (!userInfo.isResident) {
                        Toast.message('暂无驻场权限')
                    } else {
                        navigation.navigate('stationHelper');
                    }
                break;
            default:
                break;
        }
    };
    return <TouchableOpacity activeOpacity={0.8} style={styles['item']} onPress={goPage}>
        <Text style={styles['time']}>{moment(item.sendTime!).format('YYYY-MM-DD HH:mm:ss')}</Text>
        <View style={styles['item-main']}>
            <View style={styles['title']}>
                <Text style={styles['title-text']}>{item.title}</Text>
            </View>
            <Text style={styles['content']} numberOfLines={
                ['ReportRulesUpOk', 'brokerStationing'].includes(item.messageType) ? 2 : 0
            }>{item.contents}</Text>
            {(     (item.messageType === 'ReportRulesUpOk' && info.buildingTreeId)
                || (item.messageType === 'BrokerStationing' && userInfo.isResident) ) ? <View style={styles['details']}>
                <Text style={styles['details-text']}>查看详情</Text>
                <Image style={styles['details-img']} source={require('@/images/icons/message/jt.png')}/>
            </View> : null}

        </View>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    'item': {
        width: '100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginVertical: scaleSize(16)
    },
    'item-main': {
        backgroundColor: '#fff',
        padding: scaleSize(24),
    },
    'time': {
        marginBottom: scaleSize(24),
        color: '#CBCBCB',
        fontSize: scaleSize(24),
        width: '100%',
        textAlign: 'center'
    },
    'title': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    'title-text': {
        color: '#000000',
        fontSize: scaleSize(32)
    },
    'title-label': {
        width: scaleSize(108),
        // height: scaleSize(33),
        backgroundColor: '#F4F5F9',
        color: '#1F3070',
        borderRadius: scaleSize(2),
        textAlign: 'center',
        paddingHorizontal: scaleSize(10),
        paddingVertical: scaleSize(5)
    },
    'content': {
        marginVertical: scaleSize(24),
        color: '#868686'
    },
    'details': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    'details-text': {
        color: '#1F3070',
        fontSize: scaleSize(28),
        marginRight: scaleSize(6)
    },
    'details-img': {
        width: scaleSize(30),
        height: scaleSize(30)
    }
});

export default System;