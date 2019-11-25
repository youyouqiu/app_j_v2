import React from "react";
import {Text, View} from "react-native";
import styles from '../styles'
import buildJson from '../buildJson'
import {checkBlank} from '../../../../utils/utils'
import {ProjectBlockItem} from './detailInfo'
import {verifyUser} from '../../../../utils/utils'
import BuryingPoint from "@/utils/BuryPoint";

const BaseInfo = ({buildingDetail = {}, onLayout, navigation}) => {
    let {basicInfo, treeCategory} = buildingDetail
    let buildJsonInfo = buildJson[treeCategory] || {}
    basicInfo = Object.assign({}, basicInfo, buildingDetail)
    let {basicInfo: basicInfoList = []} = buildJsonInfo
    const gotoMarket = async () => {
        try {
            BuryingPoint.add({
                page: '房源-房源详情',
                target: '销讲资料_button',
            });
            await verifyUser('weak', '加入公司之后即可查看楼盘实时信息')
            navigation.navigate('marketingData', {buildingTreeId: buildingDetail.buildingTreeId})
        } catch (e) {
        }
    };
    return (
        <View style={styles.subContent} onLayout={onLayout}>
            <Text style={styles.subHeader}>基本信息</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    basicInfoList.map(item => {
                        // 没有取到值得时候不展示。 但是有自定义项除外 因为自定义项的key拿不到值
                        if ((basicInfo[item.key] === undefined || basicInfo[item.key] === null) && !item.func) return null
                        if (item.func && item.key) {
                            let key = item.key
                            let keys = key.split(',')
                            keys = keys.map(v => basicInfo[v] || '').filter(item => item)
                            if (keys.length === 0) return null
                        }
                        return <Descriptions style={{width: item.flex ? '100%' : '50%'}} label={item.label}>{checkBlank({
                            value: basicInfo[item.key],
                            key:item.key,
                            basicInfo,
                            unit: item.unit,
                            boolLabel: item.boolLabel,
                            moment: item.moment,
                            func: item.func,
                            dictionary: item.dictionary
                        })}</Descriptions>
                    })
                }
            </View>
            <ProjectBlockItem onPress={gotoMarket} text='获取销讲资料 ' icon={require('../../../../images/icons/material.png')}/>
        </View>
    )
};
export default BaseInfo

export const Descriptions = ({children = '', label, style}) => {
    let childrenDom = typeof children === "string" || typeof children === 'number' ? <Text style={styles.BIDescText} numberOfLines={9}>{children}</Text> : children;
    return (
        <View style={[styles.BIDescContent, style]}>
            <Text style={styles.BIDescLabel}>{label}:&emsp;</Text>
            {childrenDom}
        </View>
    )
};
