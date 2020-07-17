import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  main: {
    width: scaleSize(240),
    height: scaleSize(179),
    borderRadius: scaleSize(8),
  },
  tag: {
    position: 'absolute',
    top: scaleSize(15),
    left: scaleSize(-6),
    width: scaleSize(78),
    height: scaleSize(35.5),
  },
})
