import styles from "@/pages/project/shopDetail/styles";
import {StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle, Image} from "react-native";
import ReportCountDown from "@/businessComponents/ReportCountDown";
import React, {useEffect, useState} from "react";
import {IShopDetailFooterPropsType} from "@/pages/project/shopDetail/types/shopDetailFooter";
import {scaleSize} from "@/utils/screenUtil";
import moment from "moment";
import navigation from "@/utils/navigation";

/**
 * @author: zxs
 * @date: 2020/5/25
 */
const ShopDetailFooter = ({
                            gotoReport,
                            startTime,
                            buildingTreeId
                          }: IShopDetailFooterPropsType) => {

  const [finished, setFinished] = useState(true);

  useEffect(()=>{
    if (startTime){
      setFinished(moment(startTime).unix() <= new Date().getTime() / 1000 )
    }
  },[startTime]);

  const onEnd = () => {
    setFinished(true)
  };

  const gotoGslp = () => {
    navigation.push({type: 'Navigation/PUSH', routeName: 'buildingDetail', params: {buildingTreeId}})
  }

  const baseStyle: ViewStyle = {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(8),
    flex: 1
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
    fontSize: scaleSize(32),
    color: '#fff',
    paddingHorizontal:scaleSize(10)
  };

  const disableTextStyle: TextStyle = {
    fontSize: scaleSize(32),
    color: '#000',
    paddingHorizontal:scaleSize(10)
  };

  return (
    <View style={styles.bd_footer}>
      <TouchableOpacity style={styles.gslpBtn} onPress={gotoGslp}>
        <Image style={styles.gslp} source={require('@/images/icons/project/gsLp.png')}/>
        <Text style={styles.gslpText}>归属楼盘</Text>
      </TouchableOpacity>
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

export default ShopDetailFooter
