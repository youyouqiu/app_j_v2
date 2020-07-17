import {StyleSheet, ViewStyle} from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export const rowCenter : ViewStyle = { flexDirection: 'row', alignItems: 'center' }
export default StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleSize(8)
  },
  text: {
    color: '#25305A',
  },
  font26: {
    fontSize: scaleSize(26)
  },
  font22: {
    fontSize: scaleSize(22)
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(168),
    height: scaleSize(60),
    backgroundColor: '#1F3070',
    borderRadius: scaleSize(30)
  },
  btnText: {
    fontSize: scaleSize(28),
    color: '#fff',
    fontWeight: '400'
  },
  avator: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(25),
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFFFFF',
  },
  avatorText: {
    fontWeight: '600', 
    color: '#868686', 
    lineHeight: scaleSize(35)
  },
  textOnAvatorRight: {
    fontSize: scaleSize(24),
    fontWeight: '400',
    lineHeight: scaleSize(38),
    color: '#25305A'
  },
  avatorAn: {
    backgroundColor: '#EAEAEA', 
    position: 'relative', 
    right: scaleSize(24), 
    alignItems: 'center'
  },
  avatorOne: {
    position: 'relative', 
    right: scaleSize(12)
  },
  avatorViewOne: {
    backgroundColor: '#EAEAEA', 
    alignItems: 'center'
  },
  avatorViewTwo: { 
    backgroundColor: '#EAEAEA', 
    position: 'relative', 
    right: scaleSize(12), 
    alignItems: 'center' 
  }
})