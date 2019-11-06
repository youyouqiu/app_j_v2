/**
 * 列表无数据显示
 * created by chenfengxia 2019-09-10
 */

import React, { PureComponent } from 'react'
import { View, Text, Image } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default class NoData extends PureComponent {
    render() {
        let { tips, style = {} } = this.props
        return (
            <View style={[nodataStyles.wrap, style]}>
                <Image style={nodataStyles.icon} source={require('../../images/icons/wu.png')} />
                <Text style={nodataStyles.text}>{tips || '抱歉，没有搜索到相关内容'}</Text>
            </View>
        )
    }
}

const nodataStyles = {
    wrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: scaleSize(245),
        width: scaleSize(500),
        marginTop: scaleSize(55)
    },
    text: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginTop: scaleSize(26)
    }
}
