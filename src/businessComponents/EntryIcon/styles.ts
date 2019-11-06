import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default StyleSheet.create({
  'wrapper': {
    alignItems: 'center',
  },
  'img': {
    width: scaleSize(80),
    height: scaleSize(80),
    marginBottom: scaleSize(24),
  },
  'text': {
    color: '#000',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  }
})
