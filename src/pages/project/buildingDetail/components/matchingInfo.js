import styles from '../styles'
import { Image, Text, View } from 'react-native'
import React from 'react'
import { FACILITIES } from '../common'

const MatchingInfo = ({
    treeCategory,
    facility = [],
    onLayout,
    ...props
}) => {
    let renderContent = []

    for (let key in FACILITIES) {
        const FACILITY = FACILITIES[key]
        if (FACILITY.type.has(treeCategory)) {
            const isValid = (facility.findIndex(item => item.facilityvalue ===key)) !== -1
            const text = FACILITY.label
            const icon = isValid ? FACILITY.icon1 : FACILITY.icon2
            renderContent.push(
                <MatchItem
                    key={key}
                    text={text}
                    icon={icon}
                    decoration={!isValid}
                />
            )
        }
    }

    return (
        <View style={styles.bd_subWrapper} onLayout={onLayout} {...props}>
            <View style={styles.bd_subContainer}>
                <Text style={styles.bd_subHeader}>基础设施</Text>
                <View style={styles.bd_matchItemContent}>
                    {renderContent}
                </View>
            </View>
        </View>
    )
}

const MatchItem = ({ text, icon, decoration = false }) => {

    const textStyle = {
        textDecorationLine: decoration ? 'line-through' : 'none',
        color: decoration ? '#CBCBCB' : '#000000',
    }

    return (
        <View style={styles.bd_matchItem}>
            <Image style={styles.bd_matchItemImage} source={icon} />
            <Text style={[styles.bd_matchItemLabel, textStyle]}>{text}</Text>
        </View>
    )
}

export default MatchingInfo
