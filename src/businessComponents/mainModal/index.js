/**
 * 大版本更新提示框
 */

import React, { PureComponent } from 'react'
import { View, Text,ImageBackground } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'
import Modal from '../../components/Modal/index'

class MainModal extends PureComponent {
    render() {
        let { visible, onClose, onOk } = this.props
        return (
            <Modal
                visible={visible}
                onOk={onOk}
                onClose={onClose}
                type='basic'
                width='540'
                height='560'
                footerType='two'
                cancelText='稍后再说'
                confirmText='立即更新'
                contentStyle={{paddingLeft:0,marginTop:scaleSize(-55)}}
            >
                <ImageBackground style={{width: scaleSize(540),height: scaleSize(204),}} source={require('../../images/pictures/updateTop.png')} />
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={mainModalStyles.content}>
                        <View style={mainModalStyles.contentHeader}>
                            <Text style={mainModalStyles.contentHeaderText}>请立即更新下载</Text>
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