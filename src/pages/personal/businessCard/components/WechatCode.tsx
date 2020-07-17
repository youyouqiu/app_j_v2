/**
 * @author: zxs
 * @date: 2020/6/15
 */
import styles from "@/pages/personal/businessCard/styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import navigation from "@/utils/navigation";
import {WechatCodePropsType, WechatCodeStateType} from "@/pages/personal/businessCard/types";
import {connect} from "react-redux";

const upload = require('../../../../images/icons/upload.png');

const defaultState: WechatCodeStateType = {
  weChatCodeIcon: ''
};
const WechatCode = ({
                      businessCard,
                      dispatch
                    }: WechatCodePropsType) => {

  const [state, setState] = useState<WechatCodeStateType>(defaultState);

  useEffect(() => {
    getWeChatCode();
  }, []);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      weChatCodeIcon: businessCard.weChatCodeIcon
    }))
  }, [businessCard.weChatCodeIcon]);

  const gotoWeChatCode = () => {
    navigation.navigate('editWeChatCode', {weChatCodeIcon: state.weChatCodeIcon})
  };

  /**获取微信二维码*/
  const getWeChatCode = async () => {
    dispatch({type: 'businessCard/getWeChatCodeAsync'})
  };

  return (
    <View style={styles.bc_wx_btn_wrapper}>
      <TouchableOpacity style={styles.bc_wx_btn_touch} activeOpacity={0.8} onPress={gotoWeChatCode}>
        <Image style={styles.bc_wx_btn_icon} source={upload}/>
        <Text style={styles.bc_wx_btn_text}>
          {state.weChatCodeIcon ? '点击重新上传微信二维码' : '点击上传微信二维码'}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

const mapStateToProps = ({config, user, businessCard}: any) => {
  return {businessCard}
};
export default connect(mapStateToProps)(WechatCode)

