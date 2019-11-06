import React from "react";
import {Text, View} from "react-native";
import styles from '../styles'
import moment from "moment";

export const checkBlank = (text, unit = '') => {
    return text ? text + unit : '暂无数据'
};

const BaseInfo = ({basicInfo = {}, onLayout}) => {
    let expireDate = '';
    if (basicInfo.landExpireDate) {
        expireDate = moment(new Date(basicInfo.landExpireDate)).format('YYYY-MM')
    } else {
        expireDate = '暂无数据'
    }
    return (
        <View style={styles.subContent} onLayout={onLayout}>
            <Text style={styles.subHeader}>基本信息</Text>
            <View style={{flexDirection: 'column'}}>
                <View style={styles.BIDescWrap}>
                    <Descriptions label='开发商'>{checkBlank(basicInfo.developerName)}</Descriptions>
                </View>
                <View style={styles.BIDescWrap}>
                    <Descriptions label='物业公司'>{checkBlank(basicInfo.pmc)}</Descriptions>
                </View>
                <View style={styles.BIDescWrap}>
                    <Descriptions label='建筑面积'>{checkBlank(basicInfo.builtupArea, '㎡')}</Descriptions>
                    <Descriptions label='产权'>{checkBlank(basicInfo.propertyTerm, '年')}</Descriptions>
                </View>
                <View style={styles.BIDescWrap}>
                    <Descriptions label='占地面积'>{checkBlank(basicInfo.floorSurface, '㎡')}</Descriptions>
                    <Descriptions label='楼栋数'>{checkBlank(basicInfo.buildingNum,'栋')}</Descriptions>
                </View>
                <View style={styles.BIDescWrap}>
                    <Descriptions
                        label='土地到期'>{expireDate}</Descriptions>
                    <Descriptions label='容积率'>{checkBlank(basicInfo.plotRatio)}</Descriptions>
                </View>
                <View style={styles.BIDescWrap}>
                    <Descriptions label='绿化率'>{checkBlank(basicInfo.greeningRate, '%')}</Descriptions>
                    <Descriptions label='物业费'>{checkBlank(basicInfo.pmf, '元/㎡')}</Descriptions>
                </View>
            </View>
        </View>
    )
};
export default BaseInfo

export const Descriptions = ({children = '', label}) => {
    let childrenDom = typeof children === "string" ? <Text style={styles.BIDescText} numberOfLines={1}>{children}</Text> : children;
    return (
        <View style={styles.BIDescContent}>
            <Text style={styles.BIDescLabel}>{label}:&emsp;</Text>
            {childrenDom}
        </View>
    )
};
