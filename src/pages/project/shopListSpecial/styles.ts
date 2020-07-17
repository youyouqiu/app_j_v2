import { StyleSheet } from 'react-native'
import { Theme } from '@new-space/teaset'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  'page-container': {
    flex: 1,
    backgroundColor: '#F4F5F9',
  },

  'top': {
    position: 'absolute',
    zIndex: 99,
    paddingTop: Theme.statusBarHeight + scaleSize(10),
    paddingBottom: scaleSize(20),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F3070',
  },
  'top-text': {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },

  'back': {
    position: 'absolute',
    zIndex: 999,
    top: Theme.statusBarHeight + scaleSize(10),
    left: scaleSize(32),
  },
  'back-img': {
    width: scaleSize(45),
    height: scaleSize(45),
  },

  'list-content-container': {
    paddingBottom: Theme.isIPhoneX ? 34 : scaleSize(24),
  },
  'header': {
    width: scaleSize(750),
    height: scaleSize(375),
    alignItems: 'center',
    marginBottom: scaleSize(-128),
  },
  'header-title': {
    paddingTop: scaleSize(122),
    paddingBottom: scaleSize(15),
  },
  'header-title-text': {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: scaleSize(51),
    lineHeight: scaleSize(71),
  },
  'header-profile': {
    paddingHorizontal: scaleSize(39),
    borderRadius: scaleSize(24),
    backgroundColor: 'rgba(42,197,56,0.31)',
  },
  'header-profile-text': {
    color: '#FFFFFF',
    fontSize: scaleSize(26),
    lineHeight: scaleSize(37),
  },

  'list-item': {
    marginTop: scaleSize(24),
    paddingHorizontal: scaleSize(32),
  },

  'bwzp': {
    position: 'absolute',
    bottom: scaleSize(126),
    right: scaleSize(35),
  },
  'bwzp-img': {
    width: scaleSize(178),
    height: scaleSize(193),
  }
})
