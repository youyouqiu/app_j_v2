import React, {PureComponent} from 'react'
import { Modal, Text, View, Image } from 'react-native' 
import style from '../../style'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ISelectModalProps {
  visible?: boolean
  setSelectModal: (visible: boolean) => void
  sureOperation: (kptx: boolean, xmdt: boolean) => void
}

interface ISelectModalState {
  kptx: boolean // 开盘提醒的选中
  xmdt: boolean // 项目动态选中
}

class SelectModal extends PureComponent<ISelectModalProps, ISelectModalState> {

  constructor (props: ISelectModalProps) {
    super(props)
    this.state = {
      // 这个只在第一次的收藏时候出现，并且都是默认选中，所以都使用true的默认值
      kptx: true,
      xmdt: true
    }
  }

  render ():Element {
    const {visible = false, setSelectModal, sureOperation} = this.props
    const {kptx, xmdt} = this.state
    return <Modal visible={visible} presentationStyle='overFullScreen' transparent={true}>
      <TouchableOpacity style={[style['selectModal']]} onPress={() => {setSelectModal(false)}}>
        <View style={[style['selectModalContent']]}>
          <TouchableOpacity activeOpacity={1}>
            <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween']]}>
              <Text style={[style['font-40']]}>收藏成功</Text>
              <TouchableOpacity style={[style['padding-left-30']]} onPress={() => {setSelectModal(false)}}>
                <Image style={[style['right_close']]} source={require('@/images/icons/close_bold.png')}/>
              </TouchableOpacity>
            </View>
            <Text style={[style['font-26'], style['grayText'], style['selectModalContentRow2']]}>
              收藏成功后，您会第一时间收到服务推送
            </Text>
            <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween'], style['selectModalContentItem']]}>
              <Text style={[style['font-32']]}>开盘提醒<Text style={[style['font-24'], style['grayText']]}>（报备开始时间的通知）</Text></Text>
              <TouchableOpacity style={[style['padding-left-30']]} onPress={() => {this.setState({kptx: !this.state.kptx})}}>
                {
                  kptx
                  ?
                  <Image style={[style['selectIcon']]} source={require('@/images/icons/project/select.png')}/>
                  :
                  <Image style={[style['selectIcon']]} source={require('@/images/icons/project/unSelect.png')}/>
                }
              </TouchableOpacity>
            </View>
            <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween'], style['selectModalContentItem']]}>
              <Text style={[style['font-32']]}>项目动态<Text style={[style['font-24'], style['grayText']]}>（不错过房源销控，动态消息提醒）</Text></Text>
              <TouchableOpacity style={[style['padding-left-30']]} onPress={() => {this.setState({xmdt: !this.state.xmdt})}}>
                {
                  xmdt
                  ?
                  <Image style={[style['selectIcon']]} source={require('@/images/icons/project/select.png')}/>
                  :
                  <Image style={[style['selectIcon']]} source={require('@/images/icons/project/unSelect.png')}/>
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {sureOperation(kptx, xmdt)}} style={[style['sureBtn'], style['justifyCenter'], style['alignCenter']]}>
              <Text style={[style['whiteText'], style['font-32']]}>确定</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  }
}

export default SelectModal
