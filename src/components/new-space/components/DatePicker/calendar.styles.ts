import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default StyleSheet.create({
  'container': {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  'day': {
    width: `${100 / 7}%`,
    height: scaleSize(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  'day-text': {
    fontSize: scaleSize(24),
    lineHeight: scaleSize(30),
  },
  'day-side': {
    backgroundColor: '#4B6AC5',
  },
  'day-side-left': {
    borderTopLeftRadius: scaleSize(8),
    borderBottomLeftRadius: scaleSize(8),
  },
  'day-side-right': {
    borderTopRightRadius: scaleSize(8),
    borderBottomRightRadius: scaleSize(8),
  },
  'day-side-text': {
    color: '#FFF',
  },
  'day-middle': {
    backgroundColor: '#F4F5F9',
  },
  'day-disabled-text': {
    color: '#CBCBCB',
  },
  'bubble': {
    position: 'absolute',
    top: scaleSize(-50),
    alignItems: 'center',
  },
  'bubble-content': {
    paddingTop: scaleSize(7),
    paddingBottom: scaleSize(10),
    paddingHorizontal: scaleSize(6),
    marginHorizontal: scaleSize(-65),
    borderRadius: scaleSize(8),
    backgroundColor: '#000',
  },
  'bubble-content-text': {
    color: '#FFF',
    fontSize: scaleSize(20),
    lineHeight: scaleSize(24),
  },
  'bubble-triangle': {
    width: 0,
    borderTopColor: '#000',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: scaleSize(8),
    borderLeftWidth: scaleSize(6),
    borderRightWidth: scaleSize(6),
  },
})
