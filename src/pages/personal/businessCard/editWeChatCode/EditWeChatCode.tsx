/**
 * @author: zxs
 * @date: 2020/6/10
 */
import Page from "@/components/Page";
import React, {useEffect, useMemo, useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "@/pages/personal/businessCard/styles";
import {WeChatCodeCommonType, WeChatCodePropsType, WeChatCodeStateType} from "@/pages/personal/businessCard/editWeChatCode/types";
import ImagePicker, {ImagePickerType} from "@/components/ImagePicker";
import {connect} from "react-redux";
import Loading from "@/components/Loading/Loading";
import businessCardService from "@/services/businessCardService/businessCardService";
import {Toast} from "@new-space/teaset";
// @ts-ignore
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';
import request from "@/utils/request";

const default_code = require('../../../../images/icons/default_code.jpg');

const imagePicker: Array<ImagePickerType> = [{
  label: '从手机相册选取',
  code: 'album'
}];

const defaultState: WeChatCodeStateType = {
  visible: false,
  weChatCodeIcon: default_code,
  weChatCodeIconShort: ''
};

const defaultCommon: WeChatCodeCommonType = {
  loadingNumber: -1,
};

const EditWeChatCode = ({
                          userInfo,
                          businessCard,
                          dispatch,
                          navigation
                        }: WeChatCodePropsType) => {

  const [state, setState] = useState<WeChatCodeStateType>(() => {
    return {
      ...defaultState,
      weChatCodeIcon: businessCard.weChatCodeIcon ? {uri: businessCard.weChatCodeIcon} : default_code
    }
  });

  const common = useMemo(() => defaultCommon, []);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      weChatCodeIcon: businessCard.weChatCodeIcon ? {uri: businessCard.weChatCodeIcon} : default_code
    }))
  }, [businessCard.weChatCodeIcon]);

  const saveWeChatCode = async () => {
    common.loadingNumber === -1 && (common.loadingNumber = Loading.show());
    const res = await businessCardService.saveWeChatCode(state.weChatCodeIconShort).catch(() => {
      Toast.message('上传失败')
    });
    if (common.loadingNumber > 0) {
      Loading.hide(common.loadingNumber);
      common.loadingNumber = -1;
    }
    if (res.code === '0') {
      Toast.message('上传成功');
      dispatch({type: 'businessCard/getWeChatCodeAsync'})
    }
  };

  const modalToggle = async (e?: any) => {
    if (e) {
      setState(prevState => ({
        ...prevState,
        visible: false
      }));
      common.loadingNumber = Loading.show();
      const res = await recoginze(e?.file?.base64 || '');
      Loading.hide(common.loadingNumber);
      if (!res) {
        Toast.message('未检测到二维码，请重新上传');
        return
      }
      setState(prevState => ({
        ...prevState,
        weChatCodeIcon: {uri: request.getUrl().upload + '/image/' + e.extension},
        weChatCodeIconShort: e.extension,
        visible: false
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        visible: !prevState.visible
      }))
    }
  };

  const recoginze = async (imageBase64: string) => {
    try {
      return await LocalBarcodeRecognizer.decode(imageBase64, {codeTypes: ['ean13', 'qr']});
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <Page scroll={false} title='微信二维码名片'>

      <View style={styles.bc_code_container1}>
        <Text style={styles.bc_code_text1}>我的微信二维码名片</Text>
        <Text style={styles.bc_code_text2}>客户可以从店铺里直接添加微信好友</Text>
        <View style={styles.bc_code_icon_wrapper}>
          <Image source={state.weChatCodeIcon} defaultSource={default_code} style={styles.bc_code_add_icon}/>
        </View>
        <Text style={styles.bc_code_text3} onPress={() => modalToggle()}>
          {state.weChatCodeIcon ? '重新上传' : '上传二维码'}
        </Text>
      </View>

      <View style={styles.bc_code_container2}>
        <Text style={styles.bc_code_text4}>哪里可以保存微信二维码？</Text>
        <Text style={styles.bc_code_text5}>1.打开微信底部“我”的功能，找到“个人信息”页面</Text>
        <Text style={styles.bc_code_text5}>2.点击“我的二维码”；</Text>
        <Text style={styles.bc_code_text5}>3.点击右上角的“···”，选择“保存图片”即可</Text>
        <Text style={styles.bc_code_text6}>若重制二维码，之前保存的二维码也会失效，需要重新上传</Text>
      </View>

      <View style={styles.bc_footer_wrapper}>
        <TouchableOpacity style={styles.bc_footer_touch} activeOpacity={0.8} onPress={saveWeChatCode}>
          <Text style={styles.bc_footer_touch_text}>保存</Text>
        </TouchableOpacity>
      </View>

      {/**头像修改modal*/}
      <ImagePicker imagePicker={imagePicker} addId={userInfo.id} onSuccess={e => modalToggle(e)} visible={state.visible} onClose={() => modalToggle()}/>
    </Page>
  )
};

const mapStateToProps = ({config, user, businessCard}: any) => {
  return {config, userInfo: user?.userInfo, businessCard}
};
export default connect(mapStateToProps)(EditWeChatCode)

