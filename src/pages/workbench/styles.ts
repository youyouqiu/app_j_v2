import { StyleSheet } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

export default StyleSheet.create({
  'header-background': {
    // 布局
    paddingTop: scaleSize(108),
    paddingBottom: scaleSize(40),
    // justifyContent: 'flex-end',
    // 背景
    width: '100%',
    height: scaleSize(365),
    position: 'relative',
  },
  'location-weather': {
    paddingLeft: scaleSize(32),
    paddingRight: scaleSize(32),
    paddingBottom: scaleSize(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'location-weather-text': {
    color: '#66739B',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'location': {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'location-line': {
    width: 1,
    height: scaleSize(40),
    backgroundColor: '#66739B',
    marginLeft: scaleSize(15),
    marginRight: scaleSize(15),
  },
  'weather': {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'weather-img': {
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(16),
  },
  'relocation': {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'relocation-img': {
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(8),
  },
  'header-content-wrap': {
    position: 'absolute',
    top: scaleSize(202),
    left: 0,
    width: '100%',
    paddingLeft: scaleSize(24),
    paddingRight: scaleSize(24),
  },
  'header-content': {
    paddingLeft: scaleSize(35),
    paddingRight: scaleSize(35),
    paddingTop: scaleSize(48),
    paddingBottom: scaleSize(48),
    borderRadius: scaleSize(8),
    width: '100%',
    height: scaleSize(210),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'header-left-line-1': {
    // 布局
    maxWidth: scaleSize(400),
    marginBottom: scaleSize(36),
    // 字体样式
    color: '#000000',
    fontWeight: 'bold',
    fontSize: scaleSize(36),
    lineHeight: scaleSize(50),
  },
  'header-left-line-2': {
    // 布局
    maxWidth: scaleSize(450),
    // 字体
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'header-right': {
    alignItems: 'flex-end',
  },
  'header-right-line-1': {
    marginBottom: scaleSize(25),
    flexDirection: 'row',
    alignItems: 'center',
  },
  'header-right-line-2': {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: scaleSize(36),
    lineHeight: scaleSize(50),
  },
  'header-right-dot': {
    position: 'absolute',
    top: scaleSize(2),
    right: scaleSize(5),
    width: scaleSize(10),
    height: scaleSize(10),
    borderRadius: scaleSize(5),
    backgroundColor: '#FF0000',
  },
  'header-img': {
    // 布局
    marginRight: scaleSize(7),
    // 图片
    width: scaleSize(31),
    height: scaleSize(30),
  },
  'header-right-line-1-text': {
    color: '#000000',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'content': {
    width: '100%',
    height: '100%'
  },
  'backlog': {
    marginTop: scaleSize(24),
  },
  'backlog-title': {
    marginLeft: scaleSize(32),
    marginRight: scaleSize(32),
    marginBottom: scaleSize(20),
  },
  'backlog-title-text-layout': {
    flexDirection: 'row',
  },
  'backlog-title-text': {
    color: '#000',
    fontWeight: 'bold',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(34),
  },
  'backlog-title-line': {
    marginTop: scaleSize(16),
    marginBottom: scaleSize(24),
    width: scaleSize(33),
    height: scaleSize(6),
    borderRadius: scaleSize(3),
    backgroundColor: '#4B6AC5',
  },
  'backlog-list': {
    marginTop: scaleSize(-10),
    marginBottom: scaleSize(-10),
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(20),
  },
  'backlog-content-wrapper': {
    margin: scaleSize(12),
  },
  'backlog-content': {
    height: scaleSize(208),
    borderRadius: scaleSize(8),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'backlog-content-left-img': {
    width: scaleSize(28),
    height: scaleSize(28),
  },
  'backlog-content-left': {
    width: scaleSize(75),
    marginLeft: scaleSize(30),
    marginRight: scaleSize(28),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'backlog-content-left-text': {
    // 布局
    width: '100%',
    marginTop: scaleSize(14),
    // font
    color: '#000',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'backlog-line': {
    width: 1,
    height: scaleSize(95),
    backgroundColor: '#EAEAEA',
  },
  'backlog-content-right': {
    width: scaleSize(346),
    marginLeft: scaleSize(26),
    marginRight: scaleSize(21),
  },
  'backlog-content-right-text': {
    // 布局
    width: '100%',
    // font
    color: '#000',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'remind': {
    color: '#FE5139',
  },
  'blued': {
    color: '#1DA873',
  },
  'backlog-close': {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  'backlog-close-img': {
    marginTop: scaleSize(12),
    marginRight: scaleSize(12),
    width: scaleSize(30),
    height: scaleSize(30),
  },
  'backlog-noData-content': {
    marginLeft: scaleSize(32),
    marginRight: scaleSize(32),
    height: scaleSize(208),
    borderRadius: scaleSize(16),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  'backlog-noData-img': {
    marginLeft: scaleSize(45),
    width: scaleSize(200),
    height: scaleSize(200),
  },
  'backlog-noData-right': {
    marginLeft: scaleSize(56),
    paddingTop: scaleSize(6),
    paddingLeft: scaleSize(48),
    height: scaleSize(111),
    borderLeftWidth: 1,
    borderLeftColor: '#EAEAEA',
  },
  'backlog-noData-text-1': {
    // 布局
    marginBottom: scaleSize(2),
    // 字体
    color: '#000',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  'backlog-noData-text-2': {
    color: '#9B9B9B',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  'headlines': {
    marginTop: scaleSize(24),
    paddingLeft: scaleSize(32),
    paddingRight: scaleSize(32),
    height: scaleSize(114),
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'headlines-img': {
    width: scaleSize(66),
    height: scaleSize(66),
  },
  'headlines-content': {
    height: scaleSize(66),
  },
  'headlines-text-dot': {
    width: scaleSize(6),
    height: scaleSize(6),
    borderRadius: scaleSize(3),
    marginLeft: scaleSize(24),
    marginRight: scaleSize(16),
    backgroundColor: '#000',
  },
  'headlines-text': {
    marginLeft: scaleSize(24),
    color: '#000',
    fontSize: scaleSize(24),
  },
  'entry': {
    paddingTop: scaleSize(36),
    paddingBottom: scaleSize(40),
    marginLeft: scaleSize(24),
    marginRight: scaleSize(24),
  },
  'line': {
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
  'entry-title': {
    // 布局
    marginLeft: scaleSize(8),
    marginBottom: scaleSize(32),
    // 字体
    color: '#000',
    fontWeight: 'bold',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(40),
  },
  'entry-list': {
    marginLeft: scaleSize(22),
    marginRight: scaleSize(21),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
