import AccountLogin from "@/pages/login/accountLogin";
import {ActivityIndicator} from "react-native";
import React from "react";
import {Toast} from "@new-space/teaset";

/**
 * @author: zxs
 * @date: 2020/6/12
 */
class Loading {

  static show = () => {
    return Toast.show({
      text: '请稍后...',
      modal: true,
      icon: <ActivityIndicator size='large'/>,
      position: 'center',
      duration: 1000000,
    })
  };

  static hide = (loading: number) => {
    Toast.hide(loading);
  };

}

export default Loading
