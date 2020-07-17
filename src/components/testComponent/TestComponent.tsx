import * as React from 'react'
import {Button, Modal, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import RNAliPhoneVerification from 'react-native-ali-phone-verification'
import navigation from "@/utils/navigation";
import BusinessCard from "@/pages/personal/businessCard/Index";


const TestComponent = (props: any) => {

  const onPress = async () => {
    // const res = await RNAliPhoneVerification.tokenInit(key).catch(err => {
    //   console.log('初始化失败', err)
    // });
    // console.log('TestComponent', res)
    navigation.navigate('searchBuilding');
  };

  const login = async () => {
    const res = await RNAliPhoneVerification.getLoginToken();
    console.log('TestComponent', res)
  };

  return (
    <View style={styles.tc_wrapper}>
      <BusinessCard/>
    </View>
  )
};

const mapStateToProps = ({config, global, dictionaries, point}: any) => {
  return {
    config: config,
    global, dictionaries,
    sendPoint: point.buryingPoint
  }
};

export default connect(mapStateToProps)(TestComponent)

const styles = StyleSheet.create({
  tc_wrapper: {
    // width: '100%',
    // padding: 100,
    // flexDirection: 'row'
  }
});

