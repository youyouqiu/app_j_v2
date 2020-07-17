import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default StyleSheet.create({
  'container': {
    paddingTop: scaleSize(4),
    marginLeft: scaleSize(24),
    marginRight: scaleSize(24),
  },
  'group': {
    paddingTop: scaleSize(24),
    paddingBottom: scaleSize(24),
    paddingLeft: scaleSize(8),
    paddingRight: scaleSize(8),
  },
})
