import React, { PureComponent } from 'react'
import Modal from '@/components/Modal/index'
import {scaleSize} from '@/utils/screenUtil'
import {View, Text, StyleSheet} from 'react-native'


class ProtocolModal extends PureComponent<{ visible?: boolean, onOk?: () => void, onCancel?:() => void, navigation:(url: string) => void }> {
  render() {
    const { visible, onOk, navigation, onCancel } = this.props
    return <Modal
      visible={visible}
      onOk={onOk}
      onClose={onCancel}
      type='basic'
      width='540'
      height='560'
      title='温馨提示'
      footerType='two'
      cancelText='仅浏览'
      confirmText='同意'
      cancelTextStyle={style.cancelTextStyle}
      contentStyle={{padding:scaleSize(12)}}
    >
      <View>
        <Text style={style.mainText}>
          欢迎使用铺侦探经纪人App，铺侦探经纪人将竭诚为您服务！在您注册和使用铺侦探经纪人前，请您仔细阅读
          <Text style={style.cliclText} onPress={() => navigation('registrationLogin')}>《铺侦探服务协议》</Text>及
          <Text style={style.cliclText} onPress={() => navigation('privacyLogin')}>《隐私政策》</Text>
          全部条款，您同意并接受后全部条款后可享受我们的全部服务。若您选择仅浏览，则您只能以游客模式进入，仅能享受我们的部分服务，即房源信息查看和浏览。
        </Text>
      </View>
    </Modal>
  }
}

const style = StyleSheet.create({
  mainText: {
    fontSize: scaleSize(26),
    color: '#000',
    lineHeight: scaleSize(34)
  },
  cliclText: {
    color: '#4B6AC5',
    // textDecorationLine: 'underline'
  },
  cancelTextStyle: {
    color: '#868686'
  }
})

export default ProtocolModal
