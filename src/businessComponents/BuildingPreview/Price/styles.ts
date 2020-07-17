import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    color: '#FE5139',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(40),
  },
  line: {
    marginHorizontal: scaleSize(8),
    color: '#FE5139',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  unit: {
    marginLeft: scaleSize(8),
    color: '#FE5139',
    fontSize: scaleSize(20),
    lineHeight: scaleSize(30),
  },
})
