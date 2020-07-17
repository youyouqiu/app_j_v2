import {StyleSheet} from "react-native";
import {scaleSize} from "../../../utils/screenUtil";

export default StyleSheet.create({
  'row1': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'zs': {
    color: '#49A1FF',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    fontWeight: '400'
  },
  'white': {
    color: '#fff',
    fontSize: scaleSize(32),
    fontWeight: '400',
    // lineHeight:
  },
  'blue': {
    width: scaleSize(20),
    height: scaleSize(20),
    backgroundColor: '#49A1FF',
    borderRadius: scaleSize(10)
  },
  'noShopData': {
    width: '100%',
    height: scaleSize(500),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'floorListLoading': {
    flexDirection: 'column',
    paddingVertical: scaleSize(20),
    alignItems: 'center',
    paddingTop: scaleSize(100)
  },
  'floorListLoadingText': {
    fontSize: scaleSize(28),
    color: '#CBCBCB',
    paddingTop: scaleSize(20)
  },
  'activeBuildingNoText': {
    fontSize: scaleSize(32),
    color: '#fff'
  },
  'noShopDataImg': {
    width: scaleSize(425),
    height: scaleSize(140),
    marginBottom: scaleSize(23)
  },
  'noShopDataText': {
    color: '#000',
    fontSize: scaleSize(28),
    fontWeight: '400',
    lineHeight: scaleSize(40)
  },
  'ys': {
    color: '#FE5139',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
    fontWeight: '400'
  },
  'noxkView': {
    width: '100%',
    height: scaleSize(350),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'noxkText': {
    color: '#868686',
    fontSize: scaleSize(28),
  },
  'noxk': {
    width: '100%',
    height: scaleSize(247)
  },
  'floorPrice': {
    height: scaleSize(95),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: scaleSize(20),
    backgroundColor: '#F4F5F9',
    borderRadius: scaleSize(4),
    flex: 0,
    width: 'auto',
    marginRight: scaleSize(14)
  },
  'floorSaleNum': {
    height: scaleSize(95),
    backgroundColor: '#F4F5F9',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleSize(24),
  },
  'floorSaleNumRow1': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: scaleSize(6)
  },
  'floorSaleNumRow2': {
    width: '100%',
    height: scaleSize(24),
    borderRadius: scaleSize(12),
    backgroundColor: '#49A1FF'
  },
  'ysLine': {
    position: 'absolute',
    right: 0,
    height: scaleSize(24),
    borderTopRightRadius: scaleSize(12),
    borderBottomRightRadius: scaleSize(12),
    backgroundColor: '#FE5139'
  },
  'floorPriceOne': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  'money': {
    width: scaleSize(32),
    height: scaleSize(32),
    marginRight: scaleSize(16),
    lineHeight: scaleSize(40)
  },
  'moneyNumber': {
    fontSize: scaleSize(28),
    color: '#FE5139',
    fontWeight: '600',
  },
  'moneyText': {
    fontSize: scaleSize(24),
    color: '#868686',
  },
  'buildingNoDetail': {
    paddingHorizontal: scaleSize(32),
  },
  floorScrollWrapper: {
    flex: 1,
    flexDirection:'column'
  },
  'floorScroll': {
    width: '100%',
    marginVertical: scaleSize(20),
  },
  'floorText': {
    fontSize: scaleSize(26),
    lineHeight: scaleSize(45),
    fontWeight: '600',
    color: '#000'
  },
  'activeFloorText': {
    color: '#fff'
  },
  'floorListItem': {
    height: scaleSize(60),
    paddingHorizontal: scaleSize(20),
    marginLeft: scaleSize(20),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(8),
    backgroundColor: '#F4F5F9'
  },
  'activeFloorListItem': {
    backgroundColor: '#1F3070'
  },
  'icon': {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  'buildingNoView': {
    paddingHorizontal: scaleSize(35),
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  'buildingItemView': {
    paddingVertical: scaleSize(35),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'buildingNoText': {
    fontSize: scaleSize(32),
    color: '#868686'
  },
  'share': {
    width: scaleSize(64),
    height: scaleSize(64),
    marginTop: scaleSize(22)
  },
  'backTouch': {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 9
  },
  'downView': {
    position: 'absolute',
    zIndex: 9,
    bottom: 30,
    left: scaleSize(326),
    width: scaleSize(1000),
    height: scaleSize(90),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'number': {
    position: 'absolute',
    zIndex: 9,
    bottom: 30,
    left: scaleSize(60),
    width: scaleSize(224),
    height: scaleSize(90),
    borderRadius: scaleSize(40),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  'downViewCon': {
    height: scaleSize(90),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(45),
    paddingHorizontal: scaleSize(35),
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  'downScroll': {
    maxWidth: scaleSize(790),
    height: scaleSize(90),
  },
  'rightView': {
    position: 'absolute',
    zIndex: 9,
    bottom: 0,
    right: scaleSize(70),
    width: scaleSize(90),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'rightViewCon': {
    width: scaleSize(90),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(45),
    paddingHorizontal: scaleSize(35),
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  'rightScroll': {
    maxHeight: scaleSize(356),
    width: scaleSize(90),
  },
  'goBack': {
    width: scaleSize(64),
    height: scaleSize(64),
  },
  'fyxk': {
    width: '100%',
    height: scaleSize(350)
  },
  'fyxkLoading': {
    width: '100%',
    height: scaleSize(350),
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 9
  },
  'filters-rank': {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(20),
  },
  'sr_screen_wrapper': {
    flexDirection: 'row',
    paddingTop: scaleSize(10)
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
  loadingText: {
    width: '100%',
    paddingVertical: scaleSize(16),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  wrapper: {
    backgroundColor: '#fff'
  },
  tipsContent: {
    padding: scaleSize(34),
    flexDirection: 'row',
    alignItems: 'center',
    // borderT
  },
  tipsRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  subscriptionLock: {
    width: scaleSize(26),
    height: scaleSize(26)
  },
  tipsRightText: {
    fontSize: scaleSize(24),
    color: '#000000',
    paddingLeft: scaleSize(6)
  },
  disorderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scaleSize(30)
  },
  tipsCircular: {
    width: scaleSize(12),
    height: scaleSize(12),
    borderRadius: scaleSize(6)
  },
  tipsStatusText: {
    fontSize: scaleSize(24),
    paddingLeft: scaleSize(10),
  },
  navBar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EAEAEA',
  },
  floorItem: {
    flexDirection: 'column',
    marginTop: scaleSize(40),
    paddingLeft: scaleSize(32),
    paddingRight: scaleSize(32),
  },
  floorHeader: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: scaleSize(750 - 64),
    flex: 0,
    paddingBottom: scaleSize(20)
  },
  floorRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  floorNumber: {
    color: '#000',
    fontSize: scaleSize(36)
  },
  floorLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: scaleSize(6)
  },
  floorLabel: {
    backgroundColor: '#4B6AC5',
    fontSize: scaleSize(22),
    height: scaleSize(32),
    width: scaleSize(50),
    textAlign: 'center',
    borderRadius: scaleSize(2),
    color: '#fff'
  },
  floorIcon: {
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(6)
  },
  floorRightText: {
    fontSize: scaleSize(28)
  },
  floorRightIcon: {
    width: scaleSize(30),
    height: scaleSize(30),
    marginLeft: scaleSize(6)
  },
  floorContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: scaleSize(32),
    flex: 1
  },
  roomItemWrap: {
    width: scaleSize(660 / 4),
    padding: scaleSize(3),
    marginRight: scaleSize(3),
    marginBottom: scaleSize(24),
    flex: 0,
    borderRadius: scaleSize(8),
    borderColor: '#EAEAEA',
    borderWidth: StyleSheet.hairlineWidth
  },
  roomNumWrap: {
    borderTopLeftRadius: scaleSize(8),
    borderTopRightRadius: scaleSize(8),
    flexDirection: 'row',
    paddingRight: scaleSize(8),
    paddingLeft: scaleSize(8),
  },
  roomNumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#fff',
    flex: 1,
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6)
  },
  roomNum: {
    flex: 1,
    textAlign: 'center',
    fontSize: scaleSize(24),
    paddingTop: scaleSize(6),
    // paddingBottom: scaleSize(6),
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#ffe22a',
  },
  roomLockWrap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: scaleSize(8),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: scaleSize(0)
  },
  roomLock: {
    width: scaleSize(26),
    height: scaleSize(26),
  },
  roomArea: {
    textAlign: 'center',
    fontSize: scaleSize(24),
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6),
  },
  roomPrise: {
    textAlign: 'center',
    width: '100%',
    fontSize: scaleSize(24),
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    borderBottomLeftRadius: scaleSize(6),
    borderBottomRightRadius: scaleSize(6)
  },
  roomPriseNone: {
    textAlign: 'center',
    width: '100%',
    fontSize: scaleSize(24),
    paddingTop: scaleSize(6),
    paddingBottom: scaleSize(6),
    borderBottomLeftRadius: scaleSize(6),
    borderBottomRightRadius: scaleSize(6)
  },
  jjText: {
    color: '#000'
  },
  priceText: {
    fontSize: scaleSize(26),
    fontWeight: '400',
    lineHeight: scaleSize(37),
    color: '#FE5139'
  }
})
