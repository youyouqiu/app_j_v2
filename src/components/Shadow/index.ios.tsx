import React, { FunctionComponent } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'

interface ShadowProps {
  style?: StyleProp<ViewStyle>
}
const Shadow: FunctionComponent<ShadowProps> = ({ style, children }) => {
  const defaultStyle = {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
  }
  if (Array.isArray(style)) {
    style = Object.assign(defaultStyle, ...style.flat(Infinity))
  } else {
    style = Object.assign(defaultStyle, style)
  }
  return <View style={style}>{children}</View>
}

export default Shadow
