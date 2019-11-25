import { StyleSheet } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'

export default StyleSheet.create({
  'top-bar': {
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: scaleSize(1),
  },
  'page-body': {
    backgroundColor: '#F8F8F8',
    paddingBottom: scaleSize(12),
  },
  'multiple-wrapper': {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: scaleSize(32),
    marginBottom: scaleSize(24),
  },
  'record-ul': {
    marginHorizontal: scaleSize(32),
    marginBottom: scaleSize(24),
  },

  'separator': {
    width: scaleSize(22),
    backgroundColor: 'transparent',
  },
})
