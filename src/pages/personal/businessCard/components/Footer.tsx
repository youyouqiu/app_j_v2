/**
 * @author: zxs
 * @date: 2020/6/9
 */
import {Image, Modal, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import styles from '../styles'
import {FooterStateType} from "@/pages/personal/businessCard/types";
import navigation from "@/utils/navigation";

const share_white = require('../../../../images/icons/project/share_white.png');
const shareToTimeline = require('../../../../images/icons/shareToTimeline.png');
const sharingFriends = require('../../../../images/icons/sharingFriends.png');

const defaultState: FooterStateType = {
  visible: false
};

const Footer = () => {

  const [state, setState] = useState<FooterStateType>(defaultState);

  const modalToggle = () => {
    setState(prevState => ({
      ...prevState,
      visible: !prevState.visible
    }))
  };

  return (
    <View style={styles.bc_footer_wrapper}>
      <TouchableOpacity onPress={modalToggle} style={styles.bc_footer_touch} activeOpacity={0.8}>
        <Image source={share_white} style={styles.bc_footer_touch_icon}/>
        <Text style={styles.bc_footer_touch_text}>分享个人名片</Text>
      </TouchableOpacity>
      <Modal visible={state.visible} transparent={true} animationType='fade'>
        <TouchableOpacity style={styles.bc_footer_container} activeOpacity={1} onPress={modalToggle}>
          <View style={styles.bc_footer_btn_group}>
            <View style={styles.bc_footer_btn_row}>
              <TouchableOpacity style={styles.bc_footer_btn_touch} activeOpacity={0.8}>
                <Image source={sharingFriends} style={styles.bc_footer_btn_icon}/>
                <Text style={styles.bc_footer_btn_text}>分享到微信客户</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bc_footer_btn_row}>
              <TouchableOpacity style={styles.bc_footer_btn_touch} activeOpacity={0.8}>
                <Image source={shareToTimeline} style={styles.bc_footer_btn_icon}/>
                <Text style={styles.bc_footer_btn_text}>分享到朋友圈</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.bc_footer_cancel} activeOpacity={0.8} onPress={modalToggle}>
            <Text style={styles.bc_footer_cancel_text}>取消</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  )
};

export default Footer
