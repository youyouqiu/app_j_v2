import { StyleSheet } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'

export default StyleSheet.create({
  'container': {
    flex: 1,
    borderRadius: scaleSize(8),
    padding: scaleSize(24),
  },
  'separator': {
    marginLeft: scaleSize(22),
  },
  'icon': {
    width: scaleSize(86),
    height: scaleSize(86),
    marginLeft: scaleSize(-7),
  },
  'title': {
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    marginTop: scaleSize(4),
  },
  'data': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: scaleSize(16),
  },
  'value': {
    fontSize: scaleSize(40),
    fontWeight: '500',
    lineHeight: scaleSize(46),
  },
  'unit': {
    color: '#CBCBCB',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
})
