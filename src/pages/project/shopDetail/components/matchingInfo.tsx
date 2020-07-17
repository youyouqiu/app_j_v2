import styles from '../styles'
import {Image, Text, View} from 'react-native'
import React from 'react'
import {FACILITIES} from '../common'
import SubHeader from "@/pages/main/components/SubHeader";

interface IMatchingInfoPropsType {
    facility: Array<string>
}

const MatchingInfo = ({facility}: IMatchingInfoPropsType) => {
    return (
        <View style={styles.bd_subWrapper}>
            <SubHeader subTitle='配套信息'/>
            <View style={styles.bd_matchItemContent}>
                {facility.map((v, i) => (
                    <View style={styles.bd_matchItem} key={i}>
                        <Image style={styles.bd_matchItemImage} source={FACILITIES[v]?.icon1}/>
                        <Text style={[styles.bd_matchItemLabel]}>{FACILITIES[v]?.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
};

export default MatchingInfo
