import React, { FC } from "react";
import {Image, Text, View} from 'react-native'
import SwitchView from '@/components/SwitchView'
import style, {rowCenter} from './index.style'
const Item = SwitchView.Item

interface props {
  number?: Number
  avatorSourceList?: string[]
}

const Viewed: FC<props> = props => {
  const Avators = () => {
    return (props.avatorSourceList && props.avatorSourceList.length >= 2) ?
    <>
      <Image style={style.avator} source={{ uri: props.avatorSourceList[0] }} />
      <Image style={[style.avator, style.avatorOne]} source={{ uri: props.avatorSourceList[1] }} />
    </>
    :
    <>
      <View style={[style.avator, style.avatorViewOne]}></View>
      <View style={[style.avator, style.avatorViewTwo]}></View>
    </>
  }

  return <View style={rowCenter}>
    <Avators />
    <View style={[style.avator, style['avatorAn']]}>
        <Text style={style.avatorText}>...</Text>
    </View>
    <Text style={style.textOnAvatorRight}>
        {props.number ?? '-'}<Text>人已查看项目价值分析报告</Text>
    </Text>
  </View>
}

export default Viewed