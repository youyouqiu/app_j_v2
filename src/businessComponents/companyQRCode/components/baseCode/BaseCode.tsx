/**
 * @author: zxs
 * @date: 2020/5/27
 */
import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import styles from './styles'
import {connect} from "react-redux";

import {scaleSize} from "@/utils/screenUtil";
import QRCode from "react-native-qrcode-svg";
import {IBaseCodePropsType} from "@/businessComponents/companyQRCode/components/baseCode/types";

const ic_launcher = require('../../../../images/pictures/ic_launcher.png');

const BaseCode = ({
                    qrCodeLoading,
                    qrCodeError,
                    qrCodeData,
                    user,
                    size = scaleSize(260)
                  }: IBaseCodePropsType) => {

  const filiale = user?.userInfo?.filiale;

  const loadingContent = <View style={styles.bc_container}><ActivityIndicator/></View>;

  const qrCodeContent = (
    <View style={styles.bc_container}>
      <QRCode value={qrCodeData} ecl='H'
              color={'#464646'}
              logoSize={30}
              logo={ic_launcher}
              size={size}/>
    </View>
  );

  const errorContent = (
    <View style={styles.bc_container}>
      <Text style={styles.bc_errorText}>获取二维码失败</Text>
      <Text style={styles.bc_errorText}>{qrCodeError}</Text>
    </View>
  );

  const content = qrCodeLoading ? loadingContent : (qrCodeError ? errorContent : qrCodeContent);

  return (
    <View style={styles.bc_wrapper}>
      <Text style={styles.bc_company_name} numberOfLines={2}>{filiale}</Text>
      {content}
    </View>
  )
};

const mapStateToProps = ({config, user}: any) => {
  return {config, user}
};

export default connect(mapStateToProps)(BaseCode)
