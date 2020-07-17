import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';
import moment from 'moment';
import { NavigationScreenProps } from 'react-navigation';
import {scaleSize} from '@/utils/screenUtil';
import {businessMessageType} from "@/models/getLastNews";
import {SwitchView} from "@/components/new-space";
const SwitchViewItem = SwitchView.Item;

interface labelJsonParam {
    type: businessMessageType;
    title: string;
    text?: string;
    bgColor?: string;
    color?: string;
    icon?: ImageSourcePropType
    toPage?: string
}


const labelJson: labelJsonParam[] = [
    {type: 'BrokerStationing_ReportRemind', title: '经纪人报备成功', text: '报备', color: '#3AD047', bgColor: '#E5F8E7'},
    {type: 'ReportRepetition', title: '报备重客', icon: require('@/images/icons/message/icon_2.png')}, // reportList
    {type: 'RemindComfirmBeltLook', title: '还有到访未确认', icon: require('@/images/icons/message/icon_3.png')},// reportList
    {type: 'RemindProtectBeltLook', title: '保护期即将到期', icon: require('@/images/icons/message/icon_4.png'), toPage: 'visitDetail'},
    {type: 'RemindNotSign', title: '需要跟进签约', icon: require('@/images/icons/message/icon_1.png'), toPage: 'singDetail'},
    {type: 'BusinessConfirmSigned', title: '签约已确认', text: '签约', color: '#FE5139', bgColor: '#FFE1DC', toPage: 'singDetail'},
    {type: 'BusinessConfirmBeltLook', title: '到访单已确认', text: '到访', color: '#49A1FF', bgColor: '#DEEEFF', toPage: 'visitDetail'},
    {type: 'BusinessConfirmSubscription', title: '认购已确认', text: '认购', color: '#66739B', bgColor: '#E6ECFF', toPage: 'singDetail'},
    {type: 'BusinessConfirmExchangeShops', title: '已换房', text: '换房', color: '#FF5A9D', bgColor: '#FFD9E9', toPage: 'singDetail'},
    {type: 'BusinessConfirmExchangeCustomer', title: '已换客', text: '换客', color: '#FF5A9D', bgColor: '#FFD9E9', toPage: 'singDetail'},
];

interface DataProps {
    pushId: string
    url: string
    reportId: string
    buildingId: string
    buildingTreeId: string
    subscriptionId: string
}

interface ItemProps {
    sendTime: string
    title: string
    data?: string
    contents: string
    messageType: businessMessageType
}

const Business: FunctionComponent<{ item: ItemProps} & NavigationScreenProps> = ({item, navigation}) => {
    console.log(item, '业务动态item');
    const labelInfo: labelJsonParam|undefined = labelJson.find((i) => i.type === item.messageType);
    const info: DataProps = JSON.parse(item.data ?? '') ?? {};
    return <TouchableOpacity activeOpacity={0.8} style={styles['item']} onPress={() => {
        const {reportId, buildingId, buildingTreeId, subscriptionId} = info;
        if (labelInfo && labelInfo.toPage) {
            if (labelInfo.toPage === 'visitDetail' && reportId && buildingId && buildingTreeId) {
                navigation.navigate(labelInfo.toPage, info)
            }
            if (labelInfo.toPage === 'singDetail' && reportId && buildingId && buildingTreeId && subscriptionId) {
                navigation.navigate(labelInfo.toPage, info)
            }
        }
            (labelInfo && labelInfo.toPage) && navigation.navigate(labelInfo.toPage, info)
    }}>
        <Text style={styles['time']}>{moment(item.sendTime!).format('YYYY-MM-DD HH:mm:ss')}</Text>
        <View style={styles['item-main']}>
            <View style={styles['title']}>
                <SwitchView current={labelInfo ? labelInfo.icon ? 1 : 2 : 3}>
                    <SwitchViewItem type={1}>
                        <Image style={styles['title-icon']} source={labelInfo!.icon!}/>
                    </SwitchViewItem>
                    <SwitchViewItem type={2}>
                        <Text style={styles['title-label']}>{(labelInfo || {}).text}</Text>
                    </SwitchViewItem>
                    <SwitchViewItem type={2}>{null}</SwitchViewItem>
                </SwitchView>
                <Text style={styles['title-text']}>{item.title}</Text>
            </View>
            <Text style={styles['content']} numberOfLines={(labelInfo || {}).toPage ? 2 : 0}>{item.contents}</Text>
            {((labelInfo || {}).toPage) && <View style={styles['details']}>
                <Text style={styles['details-text']}>查看详情</Text>
                <Image style={styles['details-img']} source={require('@/images/icons/message/jt.png')}/>
            </View>}

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
        alignItems: 'center'
    },
    'title-text': {
        color: '#000000',
        fontSize: scaleSize(32)
    },
    'title-icon': {
        width: scaleSize(40),
        height: scaleSize(40),
        marginRight: scaleSize(20)
    },
    'title-label': {
        backgroundColor: '#F4F5F9',
        color: '#1F3070',
        borderRadius: scaleSize(2),
        textAlign: 'center',
        paddingHorizontal: scaleSize(5),
        paddingVertical: scaleSize(5),
        marginRight: scaleSize(20)
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

export default Business