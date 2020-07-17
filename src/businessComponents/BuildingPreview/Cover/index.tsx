import React, { FC, memo } from 'react'
import { View, Image, ImageSourcePropType, Platform, ImageBackground } from 'react-native'
import styles from './styles'

interface IProps {
  source: ImageSourcePropType
  showTag: boolean
}

const Cover: FC<IProps> = ({ source, showTag }) => {
  return (
    <View style={styles['container']}>
      {Platform.OS === 'ios' ? (
        <Image
          style={styles['main']}
          source={source}
          defaultSource={require('@/images/defaultImage/default_2.png')}
        />
      ) : (
          <ImageBackground source={source} style={styles['main']}>
            <Image style={[styles['main'], { zIndex: -1 }]} source={require('@/images/defaultImage/default_2.png')} />
          </ImageBackground>
        )}
      {showTag && <Image style={styles['tag']} source={require('@/images/icons/06.png')} />}
    </View>
  )
}

export default memo(Cover)
