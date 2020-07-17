import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  'overlay-content-wrapper': {
    flex: 1,
  },
  'overlay-mask': {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  'overlay-content': {
    paddingTop: scaleSize(15),
    backgroundColor: '#FFFFFF',
  },
  'selection-item': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleSize(35),
    paddingHorizontal: scaleSize(32),
  },
  'selection-item-text': {
    color: '#000000',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'selection-item-img': {
    width: scaleSize(35),
    height: scaleSize(35),
  },
})
