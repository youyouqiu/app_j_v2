import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'
import itemStyles from './Item.styles'

export default StyleSheet.create({
  'title': {
    color: '#000',
    fontWeight: 'bold',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'row': {
    paddingTop: scaleSize(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  'placeholder': {
    width: itemStyles.wrapper.width,
  },
})
