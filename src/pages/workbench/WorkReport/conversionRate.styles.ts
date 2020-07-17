import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'

export default {
  'container': <ViewStyle>{
    paddingVertical: scaleSize(28),
    paddingHorizontal: scaleSize(20),
  },
  'label': <ViewStyle>{
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleSize(73),
    height: scaleSize(73),
    borderRadius: scaleSize(50),
  },
  'label-text': <TextStyle>{
    color: '#FFF',
    fontWeight: '500',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'conversion': <ViewStyle>{
    width: scaleSize(125),
    alignItems: 'center',
  },
  'conversion-title': <TextStyle>{
    color: '#CBCBCB',
    fontSize: scaleSize(22),
    lineHeight: scaleSize(24),
  },
  'conversion-value': <TextStyle>{
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'conversion-line': (reverse?: boolean): ViewStyle => ({
    width: scaleSize(113),
    marginTop: scaleSize(9),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000',
    flexDirection: 'row',
    justifyContent: reverse ? 'flex-start' : 'flex-end',
  }),
  'conversion-angle': (reverse?: boolean): ViewStyle => ({
    position: 'absolute',
    width: StyleSheet.hairlineWidth,
    height: scaleSize(19.2),
    backgroundColor: '#000',
    transform: [
      { translateY: scaleSize(-15) },
      { translateX: scaleSize(reverse ? 6 : -6) },
      { rotate: `${reverse ? '+' : '-'}51.34deg` }
    ],
  }),
  'row': <ViewStyle>{
    flexDirection: 'row',
    alignItems: 'center',
  },
  'row-middle': <ViewStyle>{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scaleSize(271),
    height: scaleSize(125),
  },
  'conversion-transform': <ViewStyle>{
    width: scaleSize(73),
    alignItems: 'center',
    justifyContent: 'center',
    transform: [
      { rotate: '90deg' }
    ],
  },
  'middle-text': <TextStyle>{
    fontSize: scaleSize(20),
    lineHeight: scaleSize(28),
  },
}
