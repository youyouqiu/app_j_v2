import {Modal, View, StyleSheet, TouchableOpacity, Text, Image, Platform} from "react-native";
import React, {useState, ReactElement} from "react";
import {scaleSize} from "../../utils/screenUtil";
import {Theme} from 'teaset'


const data: any = {
    "shareToTimeline": {
        "key": 'shareToTimeline',
        "icon": require('../../images/icons/shareToTimeline.png'),
        "text": '微信朋友圈'
    },
    "sharingFriends": {
        "key": 'sharingFriends',
        "icon": require('../../images/icons/sharingFriends.png'),
        "text": '微信客户'
    },
    "copyLink": {
        "key": 'copyLink',
        "icon": require('../../images/icons/copyLink.png'),
        "text": '复制链接'
    },
    "savePicture": {
        "key": 'savePicture',
        "icon": require('../../images/icons/savePicture.png'),
        "text": '保存图片'
    }
};

const ShareView = ({visible, keys, closeModal, shareSelect, slot}: ShareViewProps) => {

    const _closeModal = () => {
        closeModal ? closeModal() : null
    };

    const _shareSelect = (key: string) => {
        shareSelect && key !== '' ? shareSelect(key) : null
    };

    return (
        <Modal visible={visible} animationType='slide' transparent={true} onRequestClose={_closeModal}>
            <TouchableOpacity onPress={_closeModal} style={styles.sv_container} activeOpacity={1}>
                {slot ? slot : null}
                <View style={styles.sv_content}>
                    {keys.map((key: string) => (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => _shareSelect(key)} key={key} style={styles.sv_shareItem}>
                            <Image source={data[key].icon} style={styles.sv_icon}/>
                            <Text style={styles.sv_text}>{data[key].text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{backgroundColor: '#F8F8F8', height: scaleSize(32), width: '100%'}}/>
                <TouchableOpacity onPress={_closeModal} activeOpacity={1} style={styles.sv_footer}>
                    <Text style={styles.sv_footerText}>取消</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
};

export default ShareView

interface ShareViewProps {
    visible: boolean,
    keys: Array<string>,
    closeModal: Function,
    shareSelect?: Function,
    slot?: ReactElement
}

const styles = StyleSheet.create({
    sv_container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    sv_content: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop: scaleSize(24),
        paddingBottom: scaleSize(36),
    },
    sv_shareItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sv_icon: {
        width: scaleSize(70),
        height: scaleSize(70)
    },
    sv_text: {
        color: '#4D4D4D',
        fontSize: scaleSize(26),
        paddingTop: scaleSize(22)
    },
    sv_footer: {
        width: '100%',
        paddingTop: scaleSize(30),
        ...Platform.select({
            ios: {
                paddingBottom: Theme.isIPhoneX ? scaleSize(50) : scaleSize(30)
            },
            android: {
                paddingBottom: scaleSize(30),
            }
        }),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#efefef',
    },
    sv_footerText: {

        fontSize: scaleSize(30)
    }
});
