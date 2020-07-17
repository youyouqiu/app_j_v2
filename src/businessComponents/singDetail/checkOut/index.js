/**
 * 退房-业务组件
 * created by chenfengxia 2019-08-29
 *  */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil'
import moment from 'moment'

const checkOutStyles = {
    wrap: {
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        paddingBottom: scaleSize(32),
        backgroundColor: '#fff'
    },
    titleBox: {
        height: scaleSize(88),
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        justifyContent: 'center'
    },
    title: {
        color: '#000000',
        fontSize: scaleSize(28),
        fontWeight: 'bold'
    },
    time: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(10)
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titlePre: {
        width: scaleSize(6),
        height: scaleSize(26),
        backgroundColor: '#1F3070',
        marginRight: scaleSize(21)
    },
    label: {
        width: scaleSize(127),
        marginRight: scaleSize(16),
        color: '#868686',
        fontSize: scaleSize(28)
    },
    normalText: {
        color: '#000000',
        fontSize: scaleSize(28)
    },
    sexBox: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(9),
        justifyContent: 'center',
        borderRadius: scaleSize(4),
        lineHeight: scaleSize(30)
    },
    sexText: {
        color: '#ffffff',
        fontSize: scaleSize(22)
    },
    img: {
        width: scaleSize(217),
        height: scaleSize(217),
        marginTop: scaleSize(24),
        borderRadius: scaleSize(8)
    },
    contentBox: {
        paddingTop: scaleSize(20)
    }
}

export default class CheckOut extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {data = {}, title, gotoPreview} = this.props
        let fileList = data.files || []
        let customers = data.customers || []
        // console.log(data,'tuifang')
        return (
            <View style={checkOutStyles.wrap}>
                <View style={checkOutStyles.titleBox}>
                    <View style={[checkOutStyles.row]}>
                        <View style={checkOutStyles.row}>
                            <Text style={checkOutStyles.title}>{title}</Text>
                            {data.markTime && (
                                <Text style={{color: '#868686', fontSize: scaleSize(28)}}> | {moment(data.markTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                            )}

                        </View>

                    </View>

                </View>

                <Text style={[checkOutStyles.normalText, {paddingTop: scaleSize(24)}]}>退房信息</Text>

                <View style={[checkOutStyles.row, checkOutStyles.contentBox, {alignItems: 'flex-start'}]}>
                    <Text style={[checkOutStyles.label]}>客户信息:</Text>
                    <View>
                        {
                            customers.map((item, key) => {
                                return (
                                    <View key={key} style={[checkOutStyles.row, {paddingBottom: scaleSize(16)}]}>
                                        <Text style={[checkOutStyles.normalText, {paddingRight: scaleSize(8)}]}>{item.clientName}</Text>
                                        <Text style={[checkOutStyles.normalText]}>{item.clientPhone}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={[checkOutStyles.row]}>
                    <Text style={checkOutStyles.label}>退房时间:</Text>
                    <Text style={[checkOutStyles.normalText]}>
                        {data.returnTime && moment(data.returnTime).format('YYYY-MM-DD HH:mm')}
                    </Text>
                </View>
                <View style={[checkOutStyles.row, checkOutStyles.contentBox, {alignItems: 'flex-start'}]}>
                    <Text style={checkOutStyles.label}>退房原因:</Text>
                    <Text style={[checkOutStyles.normalText, {width: scaleSize(492)}]}>{data.content}</Text>
                </View>

                <Text style={[checkOutStyles.label, checkOutStyles.contentBox]}>附件:</Text>

                <View style={[checkOutStyles.row, {flexWrap: 'wrap', flex: 1}]}>

                    {
                        fileList.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    key={key}
                                    activeOpacity={0.9}
                                    onPress={() => gotoPreview(key, fileList)}
                                >
                                    <Image style={[checkOutStyles.img, {marginRight: ((key + 1) % 3) ? scaleSize(16) : 0}]} source={{uri: item.fileUrl}}/>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>


            </View>
        )
    }
}
