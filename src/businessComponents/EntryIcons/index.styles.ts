import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default StyleSheet.create({
  'container': {
    paddingTop: scaleSize(4),
    marginLeft: scaleSize(24),
    marginRight: scaleSize(24),
  },
  'group': {
    paddingTop: scaleSize(36),
    paddingBottom: scaleSize(39),
    paddingLeft: scaleSize(8),
    paddingRight: scaleSize(8),
  },
})
