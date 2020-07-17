import {Modal, StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import React from "react";
import {Theme} from "@new-space/teaset";
import {scaleSize} from "../../../../utils/screenUtil";

const fd_data = [
    {
        key: 'building',
        label: '返回楼盘',
        icon: require('../../../../images/icons/fd_building.png')
    },
    {
        key: 'main',
        label: '首页',
        icon: require('../../../../images/icons/fb_house.png')
    },
    {
        key: 'gzt',
        label: '工作台',
        icon: require('../../../../images/icons/fb_gongzuotai.png')
    },
];

const FunctionDesk = ({visible, modalClose, onClick}: functionDeskProps) => {

    const _onClick = (key: any) => {
        onClick ? onClick(key) : null
    };

    return (
        <Modal visible={visible} transparent={true} animationType='fade' onRequestClose={() => modalClose()}>
            <View style={styles.fd_wrapper}>
                <View style={styles.fd_container}>
                    <View style={styles.fd_header}>
                        <Text style={styles.fd_headerLeft}>功能直达</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => modalClose()}>
                            <Image style={styles.fd_closeIcon} source={require('../../../../images/icons/closeWhite.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fd_content}>
                        {fd_data.map(item => (
                            <TouchableOpacity key={item.key} activeOpacity={0.8} onPress={() => _onClick(item.key)}
                                              style={styles.fd_funcItem}>
                                <Image style={styles.fd_funcItemIcon} source={item.icon}/>
                                <Text style={styles.fd_funcItemText}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => modalClose()} style={styles.fd_fill}/>
            </View>
        </Modal>
    )
};

interface functionDeskProps {
    visible: boolean,
    modalClose: Function,
    onClick?: Function
}

export default FunctionDesk

const styles = StyleSheet.create({
    fd_wrapper: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
    },
    fd_closeIcon: {
        width: scaleSize(46),
        height: scaleSize(46)
    },
    fd_container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32),
        paddingTop: Theme.statusBarHeight,
    },
    fd_content: {
        flexDirection: 'row',
        paddingTop: scaleSize(40),
        paddingBottom: scaleSize(40)
    },
    fd_header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scaleSize(22),
        paddingBottom: scaleSize(22),
        paddingRight: scaleSize(6)
    },
    fd_headerLeft: {
        flex: 1,
        fontSize: scaleSize(28),
        color: '#fff'
    },
    fd_fill: {
        flex: 1,
    },
    fd_funcItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(140),
        width: scaleSize(140),
        marginRight: scaleSize(32),
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: scaleSize(8)
    },
    fd_funcItemIcon: {
        width: scaleSize(40),
        height: scaleSize(40)
    },
    fd_funcItemText: {
        fontSize: scaleSize(28),
        color: '#fff',
        paddingTop: scaleSize(16)
    }
});
