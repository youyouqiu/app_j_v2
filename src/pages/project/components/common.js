import {scaleSize} from "../../../utils/screenUtil";
import {Image, Text, View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import useCyclicChange from '@/hooks/useCyclicChange'
import moment from "moment";

const DOWN = require('../../../images/icons/down.png');
const UP = require('../../../images/icons/up.png');
export const Trend = ({trendRes, startShow}) => {
    const [trend, setTrend] = useState({});

    useEffect(() => {
        setTrend(trendRes)
    }, [trendRes]);

    const dateMonthTransform = (dateMonth) => {
        if (dateMonth) {
            return moment(dateMonth).format('M')
        }
    };
    let price = useCyclicChange(trend.price, startShow, 30)
    let trendProportion = trend.proportion || 0 // 因为下面要用到数学函数。所以先处理一下
    let proportion = useCyclicChange(Math.abs(trendProportion * 100), startShow, 30)
    proportion = proportion * (trend.floatType === 1 ? 1 : -1)
    return (
        <View style={[styles.contentCont1, {margin: scaleSize(32)}]}>
            <View style={{paddingRight:scaleSize(40)}}>
                <Text>
                    <Text style={{fontSize: scaleSize(36), marginBottom: scaleSize(4)}}>{trend.cityName} </Text>
                    <Text style={styles.contentStateText}>/ {dateMonthTransform(trend.dateMonth)}月</Text>
                </Text>
                <Text style={styles.contentItemHead}>商业行情走势</Text>
            </View>
            <View style={[styles.line, {height: scaleSize(72)}]}/>
            <View style={{flex:1,flexDirection: 'row',}}>
                <View style={{alignItems: 'center',flex:1}}>
                    <Text>
                        <Text style={{fontSize: scaleSize(36), color: '#FE5139'}}>{price}</Text>
                        <Text style={styles.headText1}> 元/㎡</Text>
                    </Text>
                    <Text style={styles.contentItemHead}>平均价格</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={styles.location} source={trend.floatType === 1 ? UP : DOWN}/>
                        <Text style={{fontSize: scaleSize(36), color: '#000'}}>{proportion / 100 }%</Text>
                    </View>
                    <Text style={styles.contentItemHead}>增长率</Text>
                </View>
            </View>
        </View>
    )
};

export const ProjectNum = ({projectNumRes, shopStatus, startShow}) => {

    const [projectNum, setProjectNum] = useState({});

    useEffect(() => {
        setProjectNum(projectNumRes)
    }, [projectNumRes]);

    const shops = useCyclicChange(projectNum.shops, startShow)
    const shopsStock = useCyclicChange(projectNum.shopsStock, startShow)
    // 因为hooks不能写到循环里面。所以如果修改了数据字端房源类型。则需要对此的1与2进行修改。 1: 期铺 2: 现铺
    const shopsQp = useCyclicChange((projectNum.shopStocks || {})[1], startShow) // 期铺
    const shopsXp = useCyclicChange((projectNum.shopStocks || {})[2], startShow) // 现铺
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
                <Text style={styles.contentBtom}>{shops || 0}</Text>
            </View>
            <View style={styles.line}/>
            <View style={styles.contentItem}>
                <Text style={styles.contentBtom}>{shopsStock || 0}</Text>
            </View>
            <View style={styles.line}/>
            <View style={[styles.contentItem, {borderRightColor: '#EAEAEA', borderRightWidth: 1 }]}>
                <Text style={styles.contentBtom}>{shopsQp}</Text>
            </View>
            <View style={[styles.contentItem, {borderRightColor: '#EAEAEA', borderRightWidth: 0}]}>
                <Text style={styles.contentBtom}>{shopsXp}</Text>
            </View>
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
