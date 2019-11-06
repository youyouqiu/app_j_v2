import React from "react";
import {Image, Text, View} from "react-native";
import styles from "../styles";
import {scaleSize} from "../../../../utils/screenUtil";

const surroundData = {
    1: {type: 1, label: '交通配套', icon: require('../../../../images/icons/surround1.png')},
    2: {type: 1, label: '医疗配套', icon: require('../../../../images/icons/surround2.png')},
    3: {type: 1, label: '周边教育', icon: require('../../../../images/icons/surround3.png')},
    4: {type: 1, label: '品质生活', icon: require('../../../../images/icons/surround4.png')},
    5: {type: 1, label: '其他配套', icon: require('../../../../images/icons/surround5.png')},
};


const Surround = ({onLayout, facilitiesInfo = []}) => {
    return (
        <View style={[styles.subContent, {paddingBottom: scaleSize(8)}]} onLayout={onLayout}>
            <Text style={styles.subHeader}>周边配套</Text>
            {facilitiesInfo.map(item => (
                <View style={styles.SIItem} key={item.type}>
                    <Image style={styles.SIItemIcon} source={surroundData[item.type].icon}/>
                    <View style={styles.SIItemRight}>
                        <Text style={styles.SIItemTitle} numberOfLines={1}>{surroundData[item.type].label}</Text>
                        <Text style={styles.SIItemDesc} numberOfLines={5}>{item.content}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
};

export default Surround;
