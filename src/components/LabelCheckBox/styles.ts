import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  'separator': {
    marginRight: scaleSize(18),
  },
  'container': {
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(33),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: scaleSize(4),
  },
  'text': {
    color: '#535353',
    fontWeight: '500',
    fontSize: scaleSize(26),
    lineHeight: scaleSize(37),
  },
  'checked': {
    color: '#1F3070',
    backgroundColor: '#E0E8FF',
  },
})
