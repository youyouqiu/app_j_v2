import React, { FC } from "react";
import {Text, TouchableOpacity} from 'react-native'
import SwitchView from '@/components/SwitchView'
import BdtButton from './bdtButton'
import style from './index.style'
import ViewEd from './viewed'
const Item = SwitchView.Item

interface props {
  buildingFormat?: {
    avgRent?: string | number
    formatNumber?: string | number
    formatName?: string
  }
  buildingTreeId?: string
  avatorSourceList?: string[]
  name?: string
  number?: number
}

const Bdt: FC<props> = props => {
  const {buildingFormat, buildingTreeId, name} = props
  return <TouchableOpacity style={style['main']} activeOpacity={1}>
    <SwitchView current={Math.floor(Math.random()*(buildingFormat ? 5 : 2))}>
    {/* <SwitchView current={3}> */}
      <Item type={0}>
        <Text style={[style['text'], style['font26']]}>想知道周边租金最高的业态吗？点击查看👉</Text>
      </Item>
      <Item type={1}>
        <Text style={[style['text'], style['font26']]}>你肯定想不到周边租金最高的业态是什么！👉</Text>
      </Item>
      <Item type={2}>
        <Text style={[style['text'], style['font26']]}>周边月租约{buildingFormat?.avgRent}元/㎡,点击查看租金地图👉</Text>
      </Item>
      <Item type={3}>
        <ViewEd avatorSourceList={props.avatorSourceList} number={props.number}/>
      </Item>
      <Item type={4}>
        <Text style={[style['text'], style['font26']]}>周边有{buildingFormat?.formatNumber}家{buildingFormat?.formatName},点击查看业态明细👉</Text>
      </Item>
    </SwitchView>
    <BdtButton name={name} buildingTreeId={buildingTreeId} disabled={!buildingFormat}/>
  </TouchableOpacity>
}

export default Bdt