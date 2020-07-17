import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  main: {
    width: scaleSize(240),
    height: scaleSize(186),
    borderRadius: scaleSize(8),
  },
  tag: {
    position: 'absolute',
    top: scaleSize(15),
    left: scaleSize(-6),
    width: scaleSize(78),
    height: scaleSize(35.5),
  },
  cur: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: scaleSize(2),
    backgroundColor: '#4B6AC5',
    borderBottomLeftRadius: scaleSize(8),
    borderBottomRightRadius: scaleSize(8),
  },
  'cur-text': {
    color: '#FFFFFF',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
})
