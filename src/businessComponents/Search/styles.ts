import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default StyleSheet.create({
  'topBar': {
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#EAEAEA',
  },
  'topBar-left': {
    width: scaleSize(602),
    height: scaleSize(64),
    marginLeft: scaleSize(32),
    borderRadius: scaleSize(32),
    backgroundColor: '#EFEFEF',
  },
  'topBar-right': {
    paddingLeft: scaleSize(32),
    paddingRight: scaleSize(32),
  },
  'topBar-right-text': {
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'search-input': {
    // 文本样式
    color: '#000',
    // 布局样式
    width: scaleSize(473),
    height: '100%',
    fontSize: scaleSize(26),
    paddingBottom: scaleSize(10),
    paddingTop: scaleSize(10),
    marginLeft: scaleSize(62),
    marginRight: scaleSize(67),
  },
  'image-search': {
    position: 'absolute',
    top: scaleSize(17),
    left: scaleSize(24),
    width: scaleSize(30),
    height: scaleSize(30),
  },
  'input-clean': {
    position: 'absolute',
    top: scaleSize(8),
    right: scaleSize(11),
    padding: scaleSize(10),
  },
  'image-input-clean': {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  'history-layout': {
    flex: 1,
    backgroundColor: '#FFF',
  },
  'history-header': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: scaleSize(86),
    backgroundColor: '#F8F8F8',
  },
  'history-text': {
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    marginLeft: scaleSize(32),
  },
  'history-clean': {
    padding: scaleSize(10),
    marginRight: scaleSize(22),
  },
  'image-history-clean': {
    width: scaleSize(32),
    height: scaleSize(32),
  },
  'history-content': {
    width: '100%',
  },
  'history-item': {
    width: '100%',
    height: scaleSize(93),
    paddingLeft: scaleSize(32),
    paddingVertical: scaleSize(24),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: '#EAEAEA',
  },
  'history-item-text': {
    color: '#000',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(45),
  },
  'result-layout': {
    flex: 1,
    width: '100%',
  },
  'footer': {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
