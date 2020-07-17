/**
 * 大版本更新提示框
 */

import React, { PureComponent } from 'react'
import { View, Text,ImageBackground } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'
import Modal from '../../components/Modal/index'
import storage from '@/utils/storage'

class MainModal extends PureComponent {
    state={
        text: '请立即更新下载', 
        disabled: false
    }

    onOk = () => {
        let {disabled} = this.state
        if (disabled) return;
        let {onOk} = this.props
        storage.remove('initFirst') // 在新版本下载的时候移除此key，在下次打开的时候会有开屏四张图
        this.setState({ // 禁止点击.并修改文字
            text: '已进入后台下载，请在后台查看',
            disabled: true
        })
        onOk && onOk() // 下载函数
    }
    render() {
        let { visible } = this.props
        let {text, disabled} = this.state
        return (
            <Modal
                visible={visible}
                // onOk={onOk}
                onClose={this.onOk}
                type='basic'
                width='540'
                height='560'
                footerType='one'
                // cancelText='稍后再说'
                cancelText='立即更新'
                cancelBtnStyle={disabled ? {backgroundColor: '#CBCBCB'} : {}}
                contentStyle={{paddingLeft:0,marginTop:scaleSize(-55)}}
            >
                <ImageBackground style={{width: scaleSize(540),height: scaleSize(204),}} source={require('../../images/pictures/updateTop.png')} />
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={mainModalStyles.content}>
                        <View style={mainModalStyles.contentHeader}>
                            <Text style={mainModalStyles.contentHeaderText}>{text}</Text>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }
}
const mainModalStyles = {
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxHeight: scaleSize(450),
        minHeight: scaleSize(300),
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        paddingTop: scaleSize(32),
        alignItems: 'center',
    },
    contentHeaderText: {
        color: '#1F3070',
        fontSize: scaleSize(26)
    },
    contentHeader: {
        width: '100%',
        marginBottom: scaleSize(32)
    },
}

export default MainModal