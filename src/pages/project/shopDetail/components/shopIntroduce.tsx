import React from 'react'
import { Text, View } from 'react-native'
import shopJson, { ShopCategoryType, ShopInfo } from '../shopJson'
import styles from '../styles'

const ShopIntroduce = (props: { summary: any, onLayout: any, shopCategoryType?: ShopCategoryType }) => {
    const shopJsonInfo: ShopInfo = shopJson[props.shopCategoryType || 1]
    return (
        <View style={styles.bd_subWrapper} onLayout={props.onLayout}>
            <View style={styles.bd_subContainer}>
                <Text style={styles.bd_subHeader}>{`${shopJsonInfo.shopCategoryType}简介`}</Text>
                <Text style={styles.bd_introduce}>{props.summary}</Text>
            </View>
        </View>
    )
}
export default ShopIntroduce
