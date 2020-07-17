import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, DeviceEventEmitter } from 'react-native'
import { deviceWidth, scaleSize } from '../../../../../utils/screenUtil';
import ApiCustom from "../../../../../services/customManager";
import moment from "moment";
import { typeIcon } from "../../followUp/FollowUp";
import { stringify } from "qs";
import BuryingPoint from "@/utils/BuryPoint";

const ICON_CLOCK = require('../../../../../images/icons/clock.png');

const ICON_EXCLAMATION = require('../../../../../images/icons/exclamation.png');
const ICON_NEXT = require('../../../../../images/icons/chose.png');

let id: string //监听事件用
const Progress = (props: any) => {
    const [followData, setFollowData] = useState({} as any);

    useEffect(() => {
        const listener = DeviceEventEmitter.addListener('hadAddFollowUp', getFollowData)
        return () => listener && listener.remove()
    }, [])

    useEffect(() => {
        props.id && (id = props.id) && getFollowData()
    }, [props.id]);

    const getFollowData = async () => {
        let requestData = {
            "customerId": props.id || id,
            "pageIndex": 0,
            "pageSize": 1
        };
        const result = await ApiCustom.getFollowData(requestData).catch(err => {
            console.error('获取跟进信息失败', err)
        });
        try {
            if (!result) return;
            const { extension } = result;
            console.log('result', result);
            if (extension.length === 0) return;
            const flag = extension[0].source === 1;

            const content = flag ? JSON.parse(result.extension[0].content) : null;
            const followData = {
                icon: flag ? typeIcon(extension[0].type).icon_2 : typeIcon('跟进').icon_2,
                type: flag ? extension[0].type : '跟进',
                text: extension[0].type,
                time: moment(extension[0].createTime).format('YYYY-MM-DD HH:mm:ss'),
                buildingTreeName: flag ? content.buildingTreeName : extension[0].content
            };
            setFollowData(followData);

        } catch (e) {
            console.log('获取跟进信息失败', e)
        }
    };

    const gotoMoreFollow = () => {
        BuryingPoint.add({
            page: '工作台-客户管理',
            target: '客户跟进_button',
        });
        props.navigation.navigate('followUp', { id: props.id })
    };

    return (
        JSON.stringify(followData) !== '{}' ? (
            <TouchableOpacity style={[styles.wrapper]} activeOpacity={0.8} onPress={gotoMoreFollow}>
                <View style={styles.leftContainer}>
                    <Image style={{ width: scaleSize(40), height: scaleSize(40) }} source={followData.icon} />
                    <Text style={{ marginTop: scaleSize(8), fontSize: scaleSize(28) }}>{followData.type}</Text>
                </View>
                <View style={styles.line} />
                <View>
                    <View style={styles.rightContentBase}>
                        <Image source={ICON_CLOCK} style={{ ...styles.rightIconBase, marginRight: scaleSize(8) }} />
                        <Text style={{ fontSize: scaleSize(24), color: '#868686' }}>最新 {followData.time}</Text>
                    </View>
                    <View style={{ ...styles.rightContentBase, paddingBottom: 0 }}>
                        <Image source={ICON_EXCLAMATION} style={{ ...styles.rightIconBase, marginRight: scaleSize(8) }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Text style={{ color: '#FE5139' }} numberOfLines={1}>{followData.text}&emsp;</Text>
                            <Text style={{ color: '#000' }} numberOfLines={1}>{followData.buildingTreeName}</Text>
                        </View>
                    </View>
                </View>
                {/* next */}
                <Image source={ICON_NEXT} style={{ ...styles.rightIconBase, position: 'absolute', right: scaleSize(32) }} />
            </TouchableOpacity>
        ) : null
    )
};

const styles = StyleSheet.create({
    wrapper: {
        width: deviceWidth,
        paddingBottom: scaleSize(52),
        paddingTop: scaleSize(65),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: scaleSize(98),
        position: 'relative',
        backgroundColor: '#fff',
    },
    leftContainer: {
        alignItems: 'center',
        marginRight: scaleSize(115),
    },
    line: {
        height: scaleSize(62),
        width: scaleSize(2),
        backgroundColor: '#EAEAEA',
        marginRight: scaleSize(32)
    },
    rightContentBase: {
        flexDirection: 'row',
        paddingRight: scaleSize(32),
        paddingBottom: scaleSize(22)
    },
    rightIconBase: {
        width: scaleSize(30),
        height: scaleSize(30),

    },
});

export default Progress
