import React, { FC, ReactElement } from 'react'
import { View } from 'react-native'
import { Theme } from '@new-space/teaset'

interface SafeAreaViewProps {
  color?: string
  top?: string
  bottom?: string
}

const SafeAreaView: FC<SafeAreaViewProps> = ({
  color = '#FFFFFF',
  top = color,
  bottom = color,
  children,
}) => {
  if (Theme.isIPhoneX) {
    return (
      <View style={{ height: '100%' }}>
        <View style={{
          height: 44,
          backgroundColor: top,
        }} />
        <View style={{ flex: 1 }}>{children}</View>
        <View style={{
          height: 34,
          backgroundColor: bottom,
        }} />
      </View>
    )
  }
  return children as ReactElement
}

export default SafeAreaView
