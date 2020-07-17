import { StyleSheet } from 'react-native'
import { Theme } from '@new-space/teaset'
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
  // page
  'page-container': {
    flex: 1,
  },
  allData: {
    width: '100%',
    marginTop: scaleSize(20),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  allDataText: {
    color: '#999'
  },
  // page top
  'top': {
    marginTop: Theme.isIPhoneX ? 0 : Theme.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleSize(15),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EAEAEA',
  },
  'back': {
    paddingHorizontal: scaleSize(32),
  },
  'back-icon': {
    width: scaleSize(45),
    height: scaleSize(45),
  },
  'search': {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleSize(17),
    paddingHorizontal: scaleSize(23),
    marginRight: scaleSize(32),
    borderRadius: scaleSize(32),
    backgroundColor: '#EFEFEF',
  },
  'search-icon': {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  'search-text': {
    color: '#CBCBCB',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(32),
    marginLeft: scaleSize(8),
  },

  // page content
  'page-content': {
    flex: 1,
  },

  // banner
  'banner': {
    height: scaleSize(170),
    marginTop: scaleSize(32),
    marginHorizontal: scaleSize(32),
    borderRadius: scaleSize(8),
    overflow: 'hidden',
  },
  'banner-touch': {
    height: '100%',
    width: '100%',
  },
  'banner-img': {
    width: '100%',
    height: '100%',
  },
  'banner-dot': {
    marginHorizontal: scaleSize(6),
    width: scaleSize(12),
    height: scaleSize(12),
    borderRadius: scaleSize(6),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  'banner-dot-active': {
    marginHorizontal: scaleSize(6),
    width: scaleSize(12),
    height: scaleSize(12),
    borderRadius: scaleSize(6),
    backgroundColor: '#4B6AC5',
    overflow: 'hidden',
  },

  // building filter
  'filters': {
    backgroundColor: '#FFFFFF',
  },
  'filters-rank': {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(20),
  },
  'filters-rank-text': {
    color: '#868686',
    fontSize: scaleSize(28),
    maxWidth: scaleSize(120),
  },
  'filters-rank-img': {
    width: scaleSize(20),
    height: scaleSize(20),
  },
  'filters-row1': {
    flexDirection: 'row',
    marginVertical: scaleSize(10),
  },
  'filters-row2': {
    flexDirection: 'row',
    marginVertical: scaleSize(15),
  },
  'filters-row2-scroll': {
    paddingHorizontal: scaleSize(32),
  },
})
