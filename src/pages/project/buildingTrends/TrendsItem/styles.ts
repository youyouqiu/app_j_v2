import { StyleSheet } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  'container': {
    flexDirection: 'row',
  },
  'left': {
    width: '23%',
    paddingRight: scaleSize(24),
    alignItems: 'flex-end',
  },
  'left-text-1': {
    color: '#1F3070',
    fontWeight: '600',
    fontSize: scaleSize(42),
    lineHeight: scaleSize(46),
  },
  'left-text-2': {
    marginTop: scaleSize(8),
    color: '#868686',
    fontWeight: '500',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'middle': {
    alignItems: 'center',
  },
  'middle-dot': {
    marginVertical: scaleSize(17),
    width: scaleSize(12),
    height: scaleSize(12),
    borderColor: '#1F3070',
    borderRadius: scaleSize(6),
    borderWidth: scaleSize(3),
  },
  'middle-line': {
    flex: 1,
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#CBCBCB',
  },
  'right': {
    flex: 1,
    marginLeft: scaleSize(24),
    paddingRight: scaleSize(32),
    paddingBottom: scaleSize(30),
  },
  'right-time': {
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(40),
  },
  'right-title': {
    color: '#000000',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  'right-content-measure': {
    position: 'absolute',
    opacity: 0,
    marginTop: scaleSize(8),
    color: '#868686',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'right-content': {
    marginTop: scaleSize(8),
    color: '#868686',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'ellipsis': {
    color: '#1F3070',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },

  'album-view': {
    width: '100%',
    height: '100%',
  },
  'image-list': {
    marginTop: scaleSize(12),
  },
  'image': {
    width: scaleSize(249),
    height: scaleSize(181),
  },
  'image-separator': {
    width: scaleSize(12),
  },
})
