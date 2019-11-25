import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default StyleSheet.create({
  'container': {
    // marginHorizontal: scaleSize(32),
    marginBottom: scaleSize(24),
    borderRadius: scaleSize(8),
    backgroundColor: '#fff'
  },
  'header': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scaleSize(24),
  },
  'icon': {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  'title': {
    fontSize: scaleSize(24),
    lineHeight: scaleSize(30),
    marginLeft: scaleSize(16),
  },
  'date': {
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(30),
    marginRight: scaleSize(16),
  },
  'body': {
    flexDirection: 'row',
    marginHorizontal: scaleSize(24),
    paddingVertical: scaleSize(48),
    borderColor: '#EAEAEA',
    borderTopWidth: scaleSize(1),
  },
  'item': {
    flex: 1,
    alignItems: 'center',
  },
  'value': {
    fontSize: scaleSize(32),
    lineHeight: scaleSize(40),
  },
  'label': {
    color: '#CBCBCB',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    marginTop: scaleSize(16),
  },
})
