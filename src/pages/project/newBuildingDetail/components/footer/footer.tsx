import {IShopDetailFooterPropsType} from "@/pages/project/shopDetail/types/shopDetailFooter";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import ReportCountDown from "@/businessComponents/ReportCountDown";

/**
 * @author: zxs
 * @date: 2020/5/25
 */
const Footer = ({
                            gotoReport,
                            startTime
                          }: IShopDetailFooterPropsType) => {

  const [finished, setFinished] = useState(true);

  useEffect(()=>{
    if (startTime){
      setFinished(moment(startTime).unix() <= new Date().getTime() / 1000 );
    }
  },[startTime]);

  const onEnd = () => {
    setFinished(true)
  };

  const baseStyle: ViewStyle = {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(8)
  };

  const activeStyle: ViewStyle = {
    ...baseStyle,
    backgroundColor: '#1F3070',
  };

  const disableStyle: ViewStyle = {
    ...baseStyle,
    backgroundColor: '#CBCBCB'
  };

  const activeTextStyle: TextStyle = {
    fontSize: scaleSize(28),
    color: '#fff',
    lineHeight: scaleSize(40),
    fontWeight: '600'
  };

  const disableTextStyle: TextStyle = {
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
    color: '#000',
    fontWeight: '600'
  };

  return (
    <View style={styles.detailFooterBtn2}>
      <TouchableOpacity style={finished ? activeStyle : disableStyle}
                        activeOpacity={0.8}
                        onPress={finished ? gotoReport : () => null}>
        <Text style={finished ? activeTextStyle : disableTextStyle}>报备客户</Text>
        {!finished ? (
          <ReportCountDown onEnd={onEnd} startTime={startTime}/>
        ) : null}
      </TouchableOpacity>
    </View>
  )
};

export default Footer

const styles = StyleSheet.create({
  detailFooterBtn2:{
    backgroundColor: '#1F3070',
    height: scaleSize(90),
    width: scaleSize(339),
    borderRadius: scaleSize(8)
  }
});

// <TouchableOpacity onPress={() => this.footerClick(2)} activeOpacity={.8} style={style['detailFooterBtn2']}>
//   <Text style={style['textInButton']}>报备客户</Text>
//   </TouchableOpacity>
