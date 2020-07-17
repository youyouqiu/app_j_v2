/**
 * @author: zxs
 * @date: 2020/5/27
 */
import React, {useEffect, useMemo, useState} from "react";
import {View} from "react-native";
import {getQRCodeAsync} from "@/services/auth";
import request from "@/utils/request";
import {ICompanyCodePropsType, ICompanyCodeStateType} from "@/businessComponents/companyQRCode/types";
import BaseCode from "@/businessComponents/companyQRCode/components/baseCode/BaseCode";
import styles from './styles'
import CodeFooter from "@/businessComponents/companyQRCode/components/codeFooter/CodeFooter";
import ViewShot, {captureRef} from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import {Toast} from "@new-space/teaset";
import * as WeChat from "xkj-react-native-wechat";
import {scaleSize} from "@/utils/screenUtil";

const defaultState = {
  qrCodeData: '',
  qrCodeError: '',
  qrCodeLoading: true
} as ICompanyCodeStateType;

const CompanyQRCode = ({
                         handleSaveCode,
                         handleShareCode
                       }: ICompanyCodePropsType) => {

  const [state, setState] = useState<ICompanyCodeStateType>(defaultState);

  let viewShotRef: any = useMemo(() => React.createRef(), []);

  useEffect(() => {
    getQRCode()
  }, []);

  /**获取公司id及二维码信息*/
  const getQRCode = async () => {
    const res = await getQRCodeAsync(request.getUrl().cqAuth);
    if (res?.extension) {
      const qrCodeData = res.extension;
      setState(prevState => ({
        ...prevState,
        qrCodeData: qrCodeData,
        qrCodeLoading: false
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        qrCodeError: res.message || '二维码不见啦',
        qrCodeLoading: false
      }))
    }
  };

  /**重置二维码*/
  const resetCode = () => {
    setState(prevState => ({
      ...prevState,
      qrCodeLoading: true
    }));
    getQRCode()
  };

  /**保存二维码*/
  const saveCode = async () => {
    try {
      let url = await captureRef(viewShotRef, {format: 'jpg', quality: 0.8});
      await CameraRoll.saveToCameraRoll(url);
      Toast.message('保存成功，请在相册查看')
    } catch (e) {
      Toast.message(`保存失败：${e.message}`)
    } finally {
      handleSaveCode && handleSaveCode();
    }
  };

  /**分享二维码*/
  const shareCode = async () => {
    const installed = await WeChat.isWXAppInstalled();
    if (!installed) {
      handleShareCode && handleShareCode();
      Toast.message('请您安装微信之后再试');
      return
    }
    try {
      let fileName = '分享';
      let url = await captureRef(viewShotRef, {format: 'jpg', quality: 0.8});
      let result = await WeChat['shareToSession']({
        type: 'imageFile',
        title: fileName, // WeChat app treat title as file name
        description: '公司二维码',
        mediaTagName: '公司二维码',
        imageUrl: 'file://' + url
      });
    } catch (e) {
      if (e instanceof WeChat.WechatError) {
        console.error(e.stack);
      } else {
        throw e;
      }
    } finally {
      handleShareCode && handleShareCode();
    }
  };

  return (
    <View style={styles.cc_wrapper}>
      <BaseCode qrCodeData={state.qrCodeData}
                qrCodeLoading={state.qrCodeLoading}
                size={scaleSize(300)}
                qrCodeError={state.qrCodeError}/>
      <CodeFooter qrCodeLoading={state.qrCodeLoading}
                  resetCode={resetCode}
                  saveCode={saveCode}
                  shareCode={shareCode}/>
      <ViewShot ref={el => viewShotRef = el} style={styles.cc_vs_wrapper}>
        <BaseCode qrCodeData={state.qrCodeData}
                  qrCodeLoading={state.qrCodeLoading}
                  size={scaleSize(300)}
                  qrCodeError={state.qrCodeError}/>
      </ViewShot>
    </View>
  )

};

export default CompanyQRCode
