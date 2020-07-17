import { StyleSheet } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'

export default StyleSheet.create({
  'container': {
    marginTop: scaleSize(28),
    marginBottom: scaleSize(24),
    marginLeft: scaleSize(90),
    marginRight: scaleSize(60),
  },
  'icon': {
    position: 'absolute',
    left: scaleSize(-65),
    width: scaleSize(40),
    height: scaleSize(40),
  },
  'title': {
    color: '#CBCBCB',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'content': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleSize(16),
  },
  'left': {
    flex: 1,
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  'right': {
    paddingLeft: scaleSize(50),
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
})
