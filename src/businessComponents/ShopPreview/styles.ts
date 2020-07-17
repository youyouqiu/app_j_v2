import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  'container': {
    paddingVertical: scaleSize(24),
    paddingHorizontal: scaleSize(20),
    borderRadius: scaleSize(8),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  'left': {
    marginRight: scaleSize(16),
  },
  'right': {
    flex: 1,
  },

  'right-row1': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  'right-row1-text': {
    flex: 1,
    color: '#000000',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },

  'right-row2': {
    width: '100%',
    marginTop: scaleSize(8),

  },
  'right-row2-text1': {
    color: '#FE5139',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(40),
    marginRight: scaleSize(1),
  },
  'right-row2-text2': {
    color: '#FE5139',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(40),
    marginRight: scaleSize(5),
  },
  'right-row2-line': {
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'right-row2-text3': {
    color: '#000000',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },

  'right-row3': {
    marginTop: scaleSize(11),
    width: '100%',
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(34),
  },

  'right-row4': {
    marginTop: scaleSize(13),
    flexDirection: 'row',
  },

  'right-row5': {
    marginTop: scaleSize(16),
  },

  'right-row6': {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(16),
  },
  'right-row6-dot': {
    backgroundColor: '#4B6AC5',
    width: scaleSize(10),
    height: scaleSize(10),
    borderRadius: scaleSize(5),
  },
  'right-row6-text': {
    flex: 1,
    marginLeft: scaleSize(10),
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'right-row6-cklp': {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'right-row6-cklp-text': {
    color: '#1F3070',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'right-row6-cklp-arrow': {
    marginLeft: scaleSize(8),
    width: scaleSize(28),
    height: scaleSize(28),
  },
})
