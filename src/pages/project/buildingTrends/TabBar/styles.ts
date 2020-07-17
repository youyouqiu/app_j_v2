import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  'tabs': {
    flexDirection: 'row',
    borderBottomColor: '#CBCBCB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  'tabs-contenet': {
    paddingHorizontal: scaleSize(22),
  },
  'item': {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: scaleSize(15),
    marginTop: scaleSize(19),
  },
  'text': {
    color: '#868686',
    fontSize: scaleSize(26),
    lineHeight: scaleSize(37),
  },
  'text-active': {
    color: '#000000',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  'line': {
    width: scaleSize(104),
    height: scaleSize(8),
    borderRadius: scaleSize(4),
    marginVertical: scaleSize(3),
  },
})
