import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default StyleSheet.create({
  'shade': {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  'container': {
    width: '100%',
    maxHeight: '66%',
    backgroundColor: '#FFF',
  },
  'title': {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: scaleSize(36),
  },
  'close': {
    position: 'absolute',
    left: scaleSize(28),
    top: scaleSize(34),
    padding: scaleSize(4),
  },
  'close-img': {
    width: scaleSize(35),
    height: scaleSize(35),
  },
  'title-text': {
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'week': {
    flexDirection: 'row',
    paddingTop: scaleSize(7),
    paddingBottom: scaleSize(30),
  },
  'weekday': {
    flex: 1,
    textAlign: 'center',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(30),
  },
  'weekend': {
    flex: 1,
    textAlign: 'center',
    color: '#4B6AC5',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(30),
  },
  'calendar-title': {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: scaleSize(13),
    paddingBottom: scaleSize(9),
    borderColor: '#EAEAEA',
    borderBottomWidth: scaleSize(1),
    backgroundColor: '#FFF',
  },
  'calendar-title-text': {
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'separator': {
    height: scaleSize(24),
    backgroundColor: '#F8F8F8',
  },
  'ok-container': {
    borderColor: '#EAEAEA',
    borderTopWidth: scaleSize(1),
  },
  'ok': {
    marginHorizontal: scaleSize(32),
    marginVertical: scaleSize(16),
    paddingVertical: scaleSize(32),
    borderRadius: scaleSize(8),
    backgroundColor: '#1F3070',
  },
  'ok-text': {
    width: '100%',
    textAlign: 'center',
    color: '#FFF',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(44),
  },
})
