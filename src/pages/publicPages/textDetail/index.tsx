import React, { useState, FunctionComponent, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { NavigationScreenProps } from 'react-navigation'
import Page from '../../../components/Page'
import Api from '../../../services/message'
import {scaleSize} from '../../../utils/screenUtil'
import { setTimeFormat } from '../../../utils/time'

const TextDetail: FunctionComponent<NavigationScreenProps> = ({
  navigation,
}) => {
    const [loading, setLoading] = useState(true)
    const [messageInfo, setMessageInfo] = useState({title: '', contents: '', sendTime: ''})

    useEffect(() => {
        const {id = ''} = navigation.state.params || {}
        if (id) {
            Api.textDetail(id).then(res => {
                console.log(res)
                setLoading(false)
                setMessageInfo(res.extension)
            }).catch(e => {
                setLoading(false)
            })
        }
    }, [])
    
    return <Page  topBarStyle={styles.stationPage} scroll={false} title='活动推荐' loading={loading}>
        <View style={styles.content}>
            <Text style={styles.title}>{messageInfo.title}</Text>
            <View style={styles.tileContent}>
                <Text style={styles.time}>{setTimeFormat(messageInfo.sendTime)}</Text>
            </View>
            <Text style={styles.contentText}>
                {messageInfo.contents} 
            </Text>
        </View>
    </Page>
}

const styles = StyleSheet.create({
    content: {
        padding: scaleSize(24)
    },
    contentText: {
        color: '#868686',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(50),
        fontWeight: '400'
    },
    title: {
        color: '#000',
        fontSize: scaleSize(40),
        fontWeight: '600'
    },
    tileContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: scaleSize(16),
        marginBottom: scaleSize(40)
    },
    time: {
        color: '#CBCBCB',
        fontSize: scaleSize(24),
        fontWeight: '400'
    },
    stationPage: {
        borderBottomColor: '#EAEAEA', 
        borderBottomWidth: scaleSize(1)
    },
})

export default TextDetail
