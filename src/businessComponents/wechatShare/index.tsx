import React, { FC, useEffect } from 'react'
import { Text, Image, View, GestureResponderEvent, StyleProp, ViewStyle, ImageURISource } from 'react-native'
import styles, { rowCenter, columnCenter } from './styles'
import { scaleSize } from '@/utils/screenUtil'
import WeChatButton, { props as weChatButtonProps } from './weChatButton'

interface props extends weChatButtonProps {
    style?: StyleProp<ViewStyle>
    number?: Number
    avatorSourceList?: string[]
    projectInfo?: any
    pageFrom?: string
}

const wechatShare: FC<props> = ({
    onPress,
    style,
    number,
    avatorSourceList,
    projectInfo,
    pageFrom
}) => {
    const Avators = () => {
        return (avatorSourceList && avatorSourceList.length >= 2) ?
            <>
                <Image style={styles.avator} source={{ uri: avatorSourceList[0] }} />
                <Image style={[styles.avator, { position: 'relative', right: scaleSize(12) }]} source={{ uri: avatorSourceList[1] }} />
            </>
            :
            <>
                <View style={[styles.avator, { backgroundColor: '#EAEAEA', alignItems: 'center' }]}></View>
                <View style={[styles.avator, { backgroundColor: '#EAEAEA', position: 'relative', right: scaleSize(12), alignItems: 'center' }]}></View>
            </>
    }
    return (
        <View style={[styles.layout, style]}>
            {/* avator and text for share */}
            <View style={rowCenter}>
                <Avators />
                <View style={[styles.avator, { backgroundColor: '#EAEAEA', position: 'relative', right: scaleSize(24), alignItems: 'center' }]}>
                    <Text style={{ fontWeight: '600', color: '#868686', lineHeight: scaleSize(35) }}>...</Text>
                </View>
                <Text style={styles.textOnAvatorRight}>
                    {number ?? '-'}<Text style={{ color: '#4D4D4D' }}>人已推广获客</Text>
                </Text>
            </View>
            {/* WeChat button for share */}
            <WeChatButton onPress={onPress} projectInfo={projectInfo} pageFrom={pageFrom} />
        </View>
    )
}


export default wechatShare