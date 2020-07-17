import {StyleSheet} from 'react-native'
import {scaleSize} from '@/utils/screenUtil'

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'column'
  },
  viewShot_wrapper: {
    position: 'absolute',
    zIndex:-1,
    opacity:0,
    width:'100%'
  },
  'content-switch': {
    flexDirection: 'row',
    width: scaleSize(400),
    height: scaleSize(70),
    borderColor: '#FFFFFF',
    borderWidth: scaleSize(2),
    borderRadius: scaleSize(20),
    overflow: 'hidden',
    marginTop: scaleSize(46),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  'content-switch-item': {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'content-switch-text': {
    color: '#FFFFFF',
    fontSize: scaleSize(26),
    lineHeight: scaleSize(37),
  },
  'projector-out': {
    flex: 1,
  },

  'tab-posters': {
    flex: 1,
  },
  'carousel': {
    flex: 1,
    paddingVertical: scaleSize(20),
  },
  'poster': {
    width: '100%',
    height: '100%',
  },
  'posters-index': {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: scaleSize(35),
  },
  'posters-index-item': {
    width: scaleSize(44),
    height: scaleSize(44),
    borderRadius: scaleSize(22),
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'posters-index-text': {
    color: '#FFFFFF',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },

  'tab-applet': {
    flex: 1,
    alignItems: 'center'
  },
  shareSlot: {
    width: scaleSize(663),
    marginTop: scaleSize(55),
    backgroundColor: '#FFFFFF',
  },
  shareSlotImage: {
    width: scaleSize(663),
    height: scaleSize(572),
    backgroundColor: 'gray',
  },
  shareSlotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(28),
    paddingVertical: scaleSize(18),
  },
  shareSlotBuildInfo: {
    paddingTop: scaleSize(20),
    justifyContent: 'space-between',
  },
  shareSlotQRCode: {
    width: scaleSize(138),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareSlotQRCodeText: {
    color: '#4D4D4D',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  shareSlotBuildInfoName: {
    width: scaleSize(460),
    color: '#000000',
    fontSize: scaleSize(40),
    lineHeight: scaleSize(40),
  },
  shareSlotBuildInfoAddress: {
    marginTop: scaleSize(12),
    color: '#868686',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  shareSlotBuildInfoPrice: {
    marginTop: scaleSize(12),
    color: '#FA553F',
    fontSize: scaleSize(37),
    lineHeight: scaleSize(52),
  },

  bottom: {
    backgroundColor: '#F8F8F8',
  },
  'bottom-row1': {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginBottom: scaleSize(40),
    paddingTop: scaleSize(45),
  },
  'bottom-row1-item': {
    width: '25%',
    alignItems: 'center',
  },
  'bottom-row1-icon': {
    width: scaleSize(70),
    height: scaleSize(70),
  },
  'bottom-row1-text': {
    marginTop: scaleSize(8),
    marginBottom: scaleSize(16),
    color: '#4D4D4D',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'bottom-row2': {
    backgroundColor: '#FFFFFF',
  },
  'bottom-row2-cancel': {
    height: scaleSize(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  'bottom-row2-cancel-text': {
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },

  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#BBBBBB',
    paddingTop: scaleSize(10),
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
})
