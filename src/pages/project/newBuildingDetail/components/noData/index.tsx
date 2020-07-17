import React from 'react'
import { Text, View, Image } from 'react-native'
import style from '../../style'
const noData = () => {
  return (
    <View style={style['noData']}>
      <Image style={style['infoNodata']} source={require('@/images/pictures/info_nodata.png')}/>
      <Text style={[style['grayText'], style['font-24']]}>小铺正在录入信息中，敬请期待</Text>
    </View>
  )
}

export default noData
