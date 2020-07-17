import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scaleSize(24),
  },
  'container-separator': {
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  main: {
    flexDirection: 'row',
    // paddingHorizontal: scaleSize(32),
  },
  right: {
    flex: 1,
    marginLeft: scaleSize(24),
  },
  'row-1': {
    flexDirection: 'row',
  },
  name: {
    flex: 1,
    color: '#000000',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  'row-2': {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: scaleSize(7),
  },
  remain: {
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    marginLeft: scaleSize(10),
  },
  'row-3': {
    flex: 1,
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(34),
    marginTop: scaleSize(5),
  },
  'row-4': {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(7),
  },
  'row-5': {
    marginTop: scaleSize(16),
  },
})
