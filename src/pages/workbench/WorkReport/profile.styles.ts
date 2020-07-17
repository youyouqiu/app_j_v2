import { StyleSheet } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'

export default StyleSheet.create({
  'container': {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(32),
    marginBottom: scaleSize(24),
    marginHorizontal: scaleSize(32),
    paddingVertical: scaleSize(44),
    paddingHorizontal: scaleSize(24),
    borderRadius: scaleSize(8),
  },
  'left': {
    flex: 1,
    flexDirection: 'row',
  },
  'avatar': {
    width: scaleSize(105),
    height: scaleSize(105),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: scaleSize(60),
  },
  'left-text': {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: scaleSize(15),
  },
  'left-row1': {
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  'left-row2': {
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    flexDirection: 'row',
  },
  'right': {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scaleSize(193),
    height: scaleSize(70),
    marginRight: scaleSize(-24),
    borderColor: '#EAEAEA',
    borderLeftWidth: 1,
  },
  'right-row1': {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: scaleSize(-18),
  },
  'days-value': {
    fontSize: scaleSize(32),
    fontWeight: '500',
    lineHeight: scaleSize(45),
  },
  'days-unit': {
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    marginLeft: scaleSize(6),
  },
  'right-row2': {
    color: '#CBCBCB',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    marginBottom: scaleSize(-18),
  },
})
