/**
 * Created by Kary on 2020/05/11 11:39.
 */
import React, {FunctionComponent} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity,} from 'react-native'
import moment from 'moment';
import { NavigationScreenProps } from 'react-navigation'
import {scaleSize} from '@/utils/screenUtil'
import {systemMessageType} from "@/models/getLastNews";

interface DataProps {
    pushId: string
    url: string
    bulidingTreeId?: string
    dynamicType?: string
}

interface ItemProps {
    sendTime: string
    contents: string
    title: string
    data?: string
    messageType: systemMessageType
}

const Project: FunctionComponent<{ item: ItemProps} & NavigationScreenProps> = ({item, navigation}) => {
    const info: DataProps = JSON.parse(item.data ?? '') ?? {};
    console.log(info)
    return <TouchableOpacity  activeOpacity={0.8} style={styles['item']} onPress={() => {
        (info.bulidingTreeId) && navigation.navigate(info.url, {buildingTreeId: info.bulidingTreeId, buildingTreeName: ''})
    }}>
        <Text style={styles['time']}>{moment(item.sendTime!).format('YYYY-MM-DD HH:mm:ss')}</Text>
        <View style={styles['item-main']}>
            <View style={styles['title']}>
                <Text style={styles['title-text']}>{item.title}</Text>
                {info.dynamicType && <Text style={styles['title-label']}>{info.dynamicType}</Text>}
            </View>
            <Text style={styles['content']} numberOfLines={2}>{item.contents}</Text>
            <View style={styles['details']}>
                <Text style={styles['details-text']}>查看详情</Text>
                <Image style={styles['details-img']} source={require('@/images/icons/message/jt.png')}/>
            </View>
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
    },
    'title-text': {
        color: '#000000',
        fontSize: scaleSize(32),
        flex: 2,
        marginRight: scaleSize(10)
    },
    'title-label': {
        height: scaleSize(42),
        lineHeight: scaleSize(42),
        backgroundColor: '#F4F5F9',
        color: '#1F3070',
        borderRadius: scaleSize(2),
        textAlign: 'center',
        paddingHorizontal: scaleSize(10),
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

export default Project
