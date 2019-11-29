import React, { FunctionComponent } from 'react'
import { View, ViewProps, ViewStyle, Platform } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'
// import { flatStyle } from '../../utils/style'

const Shadow: FunctionComponent<ViewProps> = ({
  style,
  children,
  ...restProps
}) => {
  const defaultStyle = {
    ios: {
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    } as ViewStyle,
    android: {
      backgroundColor: '#FFF',
      borderColor: '#00000024',
			borderWidth: 1,
			elevation: 10,
			shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    } as ViewStyle,
  }

  // 安卓样式根据style -> shadowXXX来生成shadow box样式
  // const parentStyle = flatStyle(style)
  // if (parentStyle.shadowColor) { /* TODO */ }
  // if (parentStyle.shadowOffset) { /* TODO */ }
  // if (parentStyle.shadowOpacity) { /* TODO */ }
  // if (parentStyle.shadowRadius) { /* TODO */ }

  return (
    <View style={[defaultStyle[Platform.OS as 'ios' | 'android'], style]} {...restProps}>
      {children}
    </View>
  )
}

export default Shadow
