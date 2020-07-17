import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  'separator': {
    marginRight: scaleSize(18),
  },
  'container': {
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(33),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E8FF',
    borderRadius: scaleSize(4),
  },
  'text': {
    color: '#1F3070',
    fontWeight: '500',
    fontSize: scaleSize(26),
    lineHeight: scaleSize(37),
  },
  'img': {
    position: 'absolute',
    right: scaleSize(15),
    width: scaleSize(12),
    height: scaleSize(12),
  },

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
