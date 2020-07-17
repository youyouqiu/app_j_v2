/**
 * @author: zxs
 * @date: 2020/5/27
 */
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {ICodeFooterPropsType} from "@/businessComponents/companyQRCode/components/codeFooter/types";
import styles from './styles'

const refresh_icon = require('../../../../images/icons/refresh.png');

const CodeFooter = ({
                      qrCodeLoading,
                      resetCode,
                      saveCode,
                      shareCode,
                    }: ICodeFooterPropsType) => {
  return (
    <View style={styles.cf_wrapper}>
      <TouchableOpacity activeOpacity={0.9}
                        disabled={qrCodeLoading}
                        style={styles.cf_reset_wrapper}
                        onPress={resetCode}>
        <Image style={styles.cf_reset_icon} source={refresh_icon}/>
        <Text style={styles.cf_reset_text}>点击刷新二维码</Text>
      </TouchableOpacity>

      <View style={styles.cf_btn_group}>
        <TouchableOpacity style={styles.cf_btn_save} activeOpacity={0.8} onPress={saveCode}>
          <Text>保存</Text>
        </TouchableOpacity>
        <View style={styles.cf_btn_line}/>
        <TouchableOpacity style={[styles.cf_btn_save, styles.cf_btn_share]} activeOpacity={0.8} onPress={shareCode}>
          <Text style={{color: '#FFFFFF', fontSize: scaleSize(28)}}>分享</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default CodeFooter
