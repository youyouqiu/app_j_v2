import styles from "../styles";
import {Image, Text, View} from "react-native";
import React from "react";
import {facilities} from "../common";

const MatchingInfo = ({facilitiesInfo = {},onLayout}) => {
    console.log('facilitiesInfo',facilitiesInfo);
    let renderContent = [];

    for (let key in facilitiesInfo) {
        if (facilitiesInfo.hasOwnProperty(key) && facilities.hasOwnProperty(key)) {
            const text = facilities[key].name;
            const icon = facilitiesInfo[key] ? facilities[key].icon_dark : facilities[key].icon_gray;
            renderContent.push(<MatchItem key={key} text={text} icon={icon} decorationLine={facilitiesInfo[key]}/>)
        }
    }

    return (
        <View style={styles.bd_subWrapper} onLayout={onLayout}>
            <View style={styles.bd_subContainer}>
                <Text style={styles.bd_subHeader}>配套信息</Text>
                <View style={styles.bd_matchItemContent}>
                    {renderContent}
                </View>
            </View>
        </View>
    )
};

export default MatchingInfo

const MatchItem = ({text = '', icon, decorationLine = false}) => {

    const textStyle = {
        textDecorationLine: decorationLine ? 'none' : 'line-through',
        color: decorationLine ? '#000000' : '#CBCBCB'
    };

    return (
        <View style={styles.bd_matchItem}>
            <Image style={styles.bd_matchItemImage} source={icon}/>
            <Text style={[styles.bd_matchItemLabel, textStyle]}>{text}</Text>
        </View>
    )
};
