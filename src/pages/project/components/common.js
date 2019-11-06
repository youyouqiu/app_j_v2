import {scaleSize} from "../../../utils/screenUtil";
import {Image, Text, View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import projectService from "../../../services/projectService";

const DOWN = require('../../../images/icons/down.png');
const UP = require('../../../images/icons/up.png');
export const Trend = ({requestUrl, cityCode, refreshing}) => {
    const [trend, setTrend] = useState({});
    const [_cityCode, setCityCode] = useState('');

    const getTrend = async () => {
        const response = await projectService.trendReq(requestUrl.public, _cityCode);
        setTrend(response.extension || {})
    };

    useEffect(() => {
        _cityCode ? getTrend() : null;
    }, [_cityCode]);

    refreshing ? getTrend() : null;

    const dateMonthTransform = (dateMonth) => {
        if (dateMonth) {
            return parseInt(new Date(dateMonth).getMonth()) + 1
        }
    };

    if (_cityCode != cityCode) {
        setCityCode(cityCode);
    }


    return (
        <View style={[styles.contentCont1, {margin: scaleSize(32)}]}>
            <View>
                <Text>
                    <Text style={{fontSize: scaleSize(36), marginBottom: scaleSize(4)}}>{trend.cityName} </Text>
                    <Text style={styles.contentStateText}>/ {dateMonthTransform(trend.dateMonth)}月</Text>
                </Text>
                <Text style={styles.contentItemHead}>商业行情走势</Text>
            </View>
            <View style={[styles.line, {height: scaleSize(72)}]}/>
            <View style={{alignItems: 'center'}}>
                <Text>
                    <Text style={{fontSize: scaleSize(36), color: '#FE5139'}}>{trend.price}</Text>
                    <Text style={styles.headText1}> 元/㎡</Text>
                </Text>
                <Text style={styles.contentItemHead}>平均价格</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.location} source={trend.floatType === 1 ? UP : DOWN}/>
                    <Text style={{fontSize: scaleSize(36), color: '#000'}}>{trend.proportion}%</Text>
                </View>
                <Text style={styles.contentItemHead}>增长率</Text>
            </View>
        </View>
    )
};

export const ProjectNum = ({requestUrl, cityCode, shopStatus, refreshing}) => {

    const [projectNum, setProjectNum] = useState({});
    const [_cityCode, setCityCode] = useState('');

    const getBuildingShopTotalNumber = async () => {
        const response = await projectService.buildingShopTotalNumberReq(requestUrl.api, cityCode);
        setProjectNum(response.extension || {})
    };

    useEffect(() => {
        _cityCode ? getBuildingShopTotalNumber() : null;
    }, [_cityCode]);

    refreshing ? getBuildingShopTotalNumber() : null;

    const check = (shopsStocks, value) => {
        if (!shopsStocks || JSON.stringify(shopsStocks) === '{}') {
            return 0
        }
        return shopsStocks[value] || 0
    };
    if (_cityCode != cityCode) {
        setCityCode(cityCode);
    }
    return [
        <View key={1} style={[styles.contentCont1, {marginTop: scaleSize(20)}]}>
            <View style={[styles.contentItem, {alignItems: 'flex-start', paddingLeft: scaleSize(32), flex: 0.8}]}>
                <Text style={styles.contentItemHead}>铺源数</Text>
            </View>
            <View style={styles.contentItem}>
                <Text style={styles.contentItemHead}>在售数</Text>
            </View>

            {shopStatus.map((item, idx) => (
                <View key={idx} style={styles.contentItem}>
                    <Text style={styles.contentItemHead}>{item.key}</Text>
                </View>
            ))}
        </View>,
        <View key={2} style={styles.contentCont1}>
            <View style={[styles.contentItem, {alignItems: 'flex-start', paddingLeft: scaleSize(32), flex: 0.8}]}>
                <Text style={styles.contentBtom}>{projectNum.shops || 0}</Text>
            </View>
            <View style={styles.line}/>
            <View style={styles.contentItem}>
                <Text style={styles.contentBtom}>{projectNum.shopsStock || 0}</Text>
            </View>
            <View style={styles.line}/>
            {shopStatus.map((item, idx) => (
                <View key={idx} style={styles.contentItem}>
                    <Text style={styles.contentBtom}>{check(projectNum.shopStocks, item.value)}</Text>
                </View>
            ))}
        </View>
    ]
};

const styles = StyleSheet.create({
    contentCont1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentStateText: {
        fontSize: scaleSize(24)
    },
    contentItemHead: {
        color: '#CBCBCB',
        paddingTop: scaleSize(10),
        fontSize: scaleSize(24),
    },
    headText1: {
        fontSize: scaleSize(24),
        color: '#000'
    },
    location: {
        width: scaleSize(45),
        height: scaleSize(45)
    },
    contentItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentBtom: {
        fontSize: scaleSize(34),
        color: '#000000',
        marginTop: scaleSize(6)
    },
    line: {
        height: '80%',
        width: scaleSize(2),
        paddingTop: scaleSize(10),
        backgroundColor: '#EAEAEA'
    },
});
