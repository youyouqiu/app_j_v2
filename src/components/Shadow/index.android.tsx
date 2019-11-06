import React, { FunctionComponent } from 'react'
import { View, Text } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

const Shadow: FunctionComponent<any> = props => {
  const { style = {} } = props
  const shadowOpt = {
    width: style.width || 160,
    height: style.height || 170,
    color: style.shadowColor || '#000',
    opacity: style.shadowOpacity || 0.1,
    border: style.border || 1,
    radius: style.borderRadius || 0,
    x: (style.shadowOffset || {}).width || 0,
    y: (style.shadowOffset || {}).height || 5,
    style: {
      marginVertical: 5,
    }
  }
  const ViewStyle = {
    // width: style.width || 160,
    // height: style.height || 170,
    backgroundColor: '#fff',
    borderColor: '#00000024',
    borderWidth: scaleSize(1),
    ...style
  }
  return (
    // <BoxShadow setting={shadowOpt}>
    //     <View style={ViewStyle}>
    //         {props.children}
    //     </View>
    // </BoxShadow>
    <View style={[style, ViewStyle]}>
      {props.children}
    </View>
  )
}

export default Shadow
