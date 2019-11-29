import React, { FunctionComponent } from 'react'
import {
  StyleSheet, ImageBackground, Image,
  TouchableOpacity, View, Text,
} from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

const InitGuide: FunctionComponent<any> = ({ visible, onPress }) => {
  if (!visible) return null
  return <>
    <ImageBackground
      style={styles['container']}
      imageStyle={styles['background']}
      source={require('../../images/guide/bg.png')}
    >
      <View style={styles['button-view']}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles['button']}
          onPress={onPress}
        >
          <Text style={styles['text']}>我知道了</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles['bottom']}
        source={require('../../images/guide/bottom.png')}
      />
    </ImageBackground>
  </>
}

const styles = StyleSheet.create({
  'container': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#4c4c4c',
  },
  'background': {
    width: scaleSize(750),
    height: scaleSize(1385),
  },
  'button-view': {
    position: 'absolute',
    bottom: scaleSize(370),
    width: '100%',
    alignItems: 'center',
  },
  'button': {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    paddingTop: scaleSize(26),
    paddingBottom: scaleSize(26),
    paddingLeft: scaleSize(112),
    paddingRight: scaleSize(112),
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: scaleSize(8),
  },
  'text': {
    color: '#FFF',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  'bottom': {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: scaleSize(148),
  },
})

export default InitGuide
