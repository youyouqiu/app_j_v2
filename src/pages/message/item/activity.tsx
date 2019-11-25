import React, {FunctionComponent} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity,} from 'react-native'
import moment from 'moment'
import {scaleSize} from '../../../utils/screenUtil'

interface DataProps {
    pushId?: string
    extData?: string
    url: string
    id: string
}

interface InfoProps {
    sendTime?: string
    title?: string
    data?: string
}

const Activity: FunctionComponent<{ info: InfoProps, onPress: (url: string, param: any) => void }> = ({info, onPress}) => {
    const data: DataProps = info.data ? JSON.parse(info.data) : {}
    const extData = data.extData ? JSON.parse(data.extData) : {}
    let param: any;
    switch (data.url) {
        case 'webView':
            param = {title: info.title, url: data.id};
            break;
        case 'buildingDetail':
            param = {buildingTreeId: data.id};
            break
        case 'textDetail':
            param = {id: data.pushId};
            break
        default:
    }
    return (
        <TouchableOpacity onPress={() => {
            param && onPress(data.url, param)
        }}>
            <View style={[styles.flexRow, styles.itemHeader]}>
                <Text style={styles.headerText}>{moment(info.sendTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </View>
            <View style={[styles.content]}>
                <Image style={styles.img} resizeMode='stretch' source={{uri: extData.cover}}/>
                <Text style={styles.title}>{info.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img: {
        width: scaleSize(686),
        height: scaleSize(288)
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemHeader: {
        height: scaleSize(65),
        width: '100%'
    },
    headerText: {
        color: '#CBCBCB',
        fontSize: scaleSize(24),
        fontWeight: '400',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        padding: scaleSize(32),
        backgroundColor: '#fff'
    },
    title: {
        color: '#000000',
        fontSize: scaleSize(32),
        fontWeight: '500',
        marginTop: scaleSize(16)
    }
})


export default Activity
