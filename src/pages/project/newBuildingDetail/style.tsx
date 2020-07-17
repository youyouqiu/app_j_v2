import {Dimensions, StyleSheet} from 'react-native'
import {Theme} from '@new-space/teaset'
import {scaleSize} from '@/utils/screenUtil'

const d_width = Dimensions.get('window').width;
export default StyleSheet.create({
  'fyxkIcon': {
    width: scaleSize(70),
    height: scaleSize(70),
    marginBottom: scaleSize(20)
  },
  'fyxkTwo': {
    backgroundColor: '#F4F5F9',
    borderRadius: scaleSize(10),
  },
  'tzxkText': {
    fontSize: scaleSize(30),
    color: '#fff',
    fontWeight: '600',
    lineHeight: scaleSize(40)
  },
  'fyxkText': {
    fontSize: scaleSize(30),
    color: '#000',
    fontWeight: '600',
    lineHeight: scaleSize(40)
  },
  'font-22': {
    fontSize: scaleSize(22)
  },
  'noDataContent': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: scaleSize(20),
    paddingTop: scaleSize(102)
  },
  'yellowText': {
    fontSize: scaleSize(28),
    color: '#FFD400',
    fontWeight: '600',
  },
  'bdtBgItem': {
    paddingBottom: scaleSize(26),
    paddingLeft: scaleSize(45),
    paddingRight: scaleSize(30),
  },
  'lookRent': {
    width: scaleSize(202),
    height: scaleSize(62),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#FFD400',
    borderRadius: scaleSize(12)
  },
  'lookRentText': {
    color: '#715E00',
    fontSize: scaleSize(21),
    lineHeight: scaleSize(29),
    fontWeight: '500'
  },
  'bdtEvaluationItem': {
    width: scaleSize(353),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleSize(10)
  },
  'other': {
    color: '#FFD400',
    fontSize: scaleSize(26)
  },
  'bdtEvaluationLabel': {
    fontSize: scaleSize(25),
    lineHeight: scaleSize(36),
    color: '#ACC1FF',
    fontWeight: '400'
  },
  'bdtEvaluationValue': {
    fontSize: scaleSize(26),
    lineHeight: scaleSize(36),
    color: '#fff',
    fontWeight: '600'
  },
  'bdtEvaluation': {
    display: 'flex',
    flexDirection: 'column',
  },
  'bdtHand': {
    width: scaleSize(37),
    height: scaleSize(37)
  },
  'bdtEvaluationIcon': {
    width: scaleSize(35),
    height: scaleSize(35),
    marginRight: scaleSize(4)
  },
  'bdtBg': {
    width: '100%',
    height: scaleSize(254),
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  'flexCloum': {
    display: 'flex',
    flexDirection: 'column',
  },
  'flexRow': {
    display: 'flex',
    flexDirection: 'row',
  },
  'alignCenter': {
    alignItems: 'center',
  },
  'wrap': {
    flexWrap: 'wrap'
  },
  'justifyCenter': {
    justifyContent: 'center'
  },
  'justifyBetween': {
    justifyContent: 'space-between'
  },
  'lineStyle': {
    width: scaleSize(32),
    height: scaleSize(5),
    backgroundColor: '#1F3070'
  },
  'lineStyleRules': {
    width: scaleSize(73),
    height: scaleSize(5),
    backgroundColor: '#1F3070'
  },
  'justifyAround': {
    justifyContent: 'space-around'
  },
  projectManagerWrapper: {
    paddingHorizontal: scaleSize(32)
  },
  'main': {
    height: '100%',
    flex: 1,
  },
  'headerAbsolute': {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 999,
    height: (Theme.navBarContentHeight || 0) + Theme.statusBarHeight,
  },
  'headerContainer': {
    paddingHorizontal: scaleSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    paddingTop: Theme.statusBarHeight,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  'headerAnimated': {
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: -1,
    paddingHorizontal: scaleSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    paddingTop: Theme.statusBarHeight,
  },
  'headerIcon': {
    width: scaleSize(64),
    height: scaleSize(64),
  },
  'headerInfo': {},
  'whiteText': {
    color: '#fff',
  },
  'headerInfoImage': {
    width: '100%',
    height: scaleSize(470)
  },
  headerInfoWrapper: {
    paddingHorizontal: scaleSize(32)
  },
  projectInfoHeader: {
    paddingHorizontal: scaleSize(32)
  },
  'itemContent': {
    paddingVertical: scaleSize(24)
  },
  featuredListWrapper: {
    paddingHorizontal: scaleSize(32)
  },
  projectFacilityWrapper: {
    paddingHorizontal: scaleSize(32)
  },
  projectNewsWrapper: {
    paddingHorizontal: scaleSize(32)
  },
  projectDescWrapper: {
    paddingHorizontal: scaleSize(32)
  },
  projectLookListWrapper: {
    paddingHorizontal: scaleSize(32)
  },
  projectBdt: {
    paddingHorizontal: scaleSize(32)
  },
  'buildName': {
    fontSize: scaleSize(40),
    fontWeight: '500',
    lineHeight: scaleSize(56)
  },
  'brageList': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaleSize(24),
  },
  'exclusive': {
    width: scaleSize(76),
    height: scaleSize(33)
  },
  'labelItem': {
    marginRight: scaleSize(14)
  },
  'content': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  'contentRight': {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  'textCenter': {
    textAlign: 'center'
  },
  'contentLeft': {
    minWidth: '33%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: scaleSize(96),
    justifyContent: 'space-between',
    paddingLeft: scaleSize(20)
  },
  'contentItem': {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: scaleSize(96),
    justifyContent: 'space-between',
    paddingLeft: scaleSize(20)
  },
  'contentItemText': {
    fontSize: scaleSize(40),
    fontWeight: '600',
    lineHeight: scaleSize(56)
  },
  'redText': {
    fontWeight: '500',
    color: '#FE5139'
  },
  'pinkText': {
    fontWeight: '500',
    color: '#FF5374'
  },
  'blackText': {
    fontWeight: '500',
    color: '#000'
  },
  'grayText': {
    color: '#868686'
  },
  'unitText': {
    fontSize: scaleSize(24)
  },
  'contentItemLabel': {
    fontSize: scaleSize(24),
    color: '#868686'
  },
  'discount': {
    marginTop: scaleSize(24),
  },
  'discountItem': {
    marginBottom: scaleSize(24)
  },
  'discountItemText': {
    marginRight: scaleSize(24),
  },
  'discountItemValue': {
    flex: 1,
    alignSelf: 'flex-start'
  },
  'font-28': {
    fontSize: scaleSize(28)
  },
  'font-24': {
    fontSize: scaleSize(24)
  },
  'font-32': {
    fontSize: scaleSize(32),
    fontWeight: '500',
    lineHeight: scaleSize(45)
  },
  'headerBtnItem': {
    width: scaleSize(320),
    height: scaleSize(100)
  },
  'headerBtnItemImg': {
    width: scaleSize(70),
    height: scaleSize(70)
  },
  'headerNoBtnImg': {
    marginBottom: scaleSize(24)
  },
  'fyxk': {
    backgroundColor: '#EEF2FF',
    width: (d_width - scaleSize(96)) * 0.55,
    height: scaleSize(224),
    borderRadius: scaleSize(10),
    marginRight: scaleSize(32)
  },
  'fyxkBack': {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'xjzl': {
    backgroundColor: '#F4F5F9',
    width: (d_width - scaleSize(96)) * 0.45,
    height: scaleSize(225),
    borderRadius: scaleSize(10),
    marginRight: scaleSize(24)
  },
  'hasxjzl': {
    backgroundColor: '#F4F5F9',
    width: (d_width - scaleSize(96)) * 0.45,
    height: scaleSize(225),
    borderRadius: scaleSize(10),
    paddingHorizontal: scaleSize(16),
    marginRight: scaleSize(32),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  'blueText': {
    color: '#1F3070',
    fontWeight: '500',
  },
  'greenText': {
    color: '#008C0C',
    fontWeight: '500',
  },
  'headerLeftLine': {
    backgroundColor: '#1F3070',
    width: scaleSize(8),
    height: scaleSize(30),
    borderRadius: scaleSize(6),
    marginRight: scaleSize(9)
  },
  'userIcon': {
    width: scaleSize(80),
    height: scaleSize(80),
    borderRadius: scaleSize(40),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    marginRight: scaleSize(16),
  },
  'userIconView': {
    width: scaleSize(80),
    height: scaleSize(80),
    borderRadius: scaleSize(40),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    marginRight: scaleSize(16),
    alignItems: 'center',
    justifyContent: 'center'
  },
  'userIconText': {
    fontWeight: '500'
  },
  'callPhone': {
    width: scaleSize(40),
    height: scaleSize(40),
  },
  'callXmjl': {
    width: scaleSize(170),
    height: scaleSize(58),
    borderWidth: scaleSize(2),
    borderColor: '#1F3070',
    borderRadius: scaleSize(8),
  },
  'xmjlItem': {
    marginTop: scaleSize(30),
  },
  'tabItemImg': {
    width: scaleSize(50),
    height: scaleSize(50),
    marginBottom: scaleSize(6),
  },
  'itemTitle': {
    marginBottom: scaleSize(24),
  },
  'projectInfoItemText': {
    fontWeight: '400',
    lineHeight: scaleSize(40),
  },
  'address_icon': {
    width: scaleSize(56),
    height: scaleSize(56),
    marginRight: scaleSize(8),
  },
  'address_right': {
    width: scaleSize(30),
    height: scaleSize(30),
    marginLeft: scaleSize(4),
  },
  'address': {
    marginTop: scaleSize(24)
  },
  'txImage': {
    fontWeight: 'bold',
    marginLeft: scaleSize(4)
  },
  'activeBtn': {
    width: '100%',
    height: scaleSize(100),
    backgroundColor: '#EEF2FF',
    marginTop: scaleSize(24),
    borderRadius: scaleSize(9)
  },
  'unActiveBtn': {
    width: '100%',
    height: scaleSize(100),
    backgroundColor: '#F8F8F8',
    marginTop: scaleSize(24),
    borderRadius: scaleSize(9)
  },
  'xsgzTab': {
    marginBottom: scaleSize(30),
    height: scaleSize(65)
  },
  'ztShopItemImg': {
    width: scaleSize(472),
    height: scaleSize(330)
  },
  'ztShopItemNameRow': {
    marginTop: scaleSize(16),
    marginBottom: scaleSize(8)
  },
  'ztShopItemName': {
    marginRight: scaleSize(8)
  },
  'ztShopItem': {
    marginRight: scaleSize(32)
  },
  'newsRight': {
    marginLeft: scaleSize(8),
    width: scaleSize(30),
    height: scaleSize(30)
  },
  'circleBlue': {
    width: scaleSize(14),
    height: scaleSize(14),
    borderRadius: scaleSize(7),
    backgroundColor: '#1F3070'
  },
  'projectLine': {
    width: StyleSheet.hairlineWidth,
    height: '100%',
    flex: 1,
    backgroundColor: '#CBCBCB'
  },
  'projectLine2': {
    width: StyleSheet.hairlineWidth,
    height: scaleSize(80),
    // flex: 1,
    backgroundColor: '#CBCBCB'
  },
  'projectNewItem': {
    marginLeft: scaleSize(24),
    paddingBottom: scaleSize(40)
  },
  'projectNewContent': {
    marginTop: scaleSize(24)
  },
  'lineHeight50': {
    lineHeight: scaleSize(50)
  },
  'projectNewContentTitle': {
    lineHeight: scaleSize(45),
    marginBottom: scaleSize(8)
  },
  'dyProjectIcon': {
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(8)
  },
  'dyBtn': {
    height: scaleSize(100),
    width: '100%',
    backgroundColor: '#F8F8F8'
  },
  'zybgProjectIcon': {
    marginLeft: scaleSize(10),
    width: scaleSize(30),
    height: scaleSize(30)
  },
  'detailFooter': {
    height: Theme.isIPhoneX ? scaleSize(160) : scaleSize(140),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: scaleSize(32),
    paddingRight: scaleSize(32),
    paddingTop: scaleSize(16),
    paddingBottom: Theme.isIPhoneX ? scaleSize(36) : scaleSize(16),
    borderTopColor: '#EAEAEA',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  'detailFooterIcon': {
    width: scaleSize(50),
    height: scaleSize(50),
  },
  'detailFooterLabel': {
    fontSize: scaleSize(22),
    color: '#000',
  },
  'detailFooterBtn1': {
    backgroundColor: '#06B515',
    height: scaleSize(90),
    width: '50%',
    borderTopLeftRadius: scaleSize(54),
    borderBottomLeftRadius: scaleSize(54),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'textInButton': {
    fontSize: scaleSize(22),
    fontWeight: '400',
    color: '#000',
  },
  'detailFooterBtn2': {
    backgroundColor: '#1F3070',
    height: scaleSize(90),
    width: '50%',
    borderTopRightRadius: scaleSize(54),
    borderBottomRightRadius: scaleSize(54),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'detailFooterLeft': {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  'detailFooterBtn': {
    // marginLeft: scaleSize(22)
  },
  'BIDescContent': {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: scaleSize(10),
    paddingBottom: scaleSize(12),
    paddingTop: scaleSize(12),
  },
  'BIDescLabel': {
    fontSize: scaleSize(24),
    color: '#868686',
    minWidth: scaleSize(130),
    lineHeight: scaleSize(33),
  },
  'BIDescText': {
    fontSize: scaleSize(24),
    color: '#000000',
    flex: 1,
    lineHeight: scaleSize(33),
  },
  'kpIcon': {
    width: scaleSize(30),
    height: scaleSize(30)
  },
  'RRTableRow': {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    minHeight: scaleSize(72)
  },
  'RRTableLabelWrap': {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(210),
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
  },
  'RRTableLabel': {
    fontSize: scaleSize(24),
    color: '#868686',
  },
  'RRTableValue': {
    fontSize: scaleSize(24),
    color: '#000000',
  },
  'RRTableValueWrap': {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(20)
  },
  'RRTable': {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    marginBottom: scaleSize(24),
  },
  'bd_matchItem': {
    width: '20%',
    paddingBottom: scaleSize(24),
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'bd_matchItemImage': {
    width: scaleSize(50),
    height: scaleSize(50),
    marginBottom: scaleSize(18)
  },
  'bd_matchItemLabel': {
    fontSize: scaleSize(26),
  },
  'bd_matchItemContent': {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: scaleSize(-8)
  },
  'bdtImage': {
    width: scaleSize(684),
    height: scaleSize(214)
  },
  'bdtContent': {
    width: '100%',
    height: scaleSize(262)
  },
  'selectModal': {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%'
  },
  'selectModalContent': {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 9,
    bottom: 0,
    width: '100%',
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(54),
    paddingBottom: scaleSize(16)
    // height: scaleSize(562)
  },
  'font-40': {
    fontSize: scaleSize(40),
    fontWeight: '400',
    lineHeight: scaleSize(56)
  },
  'font-26': {
    fontSize: scaleSize(26),
    lineHeight: scaleSize(37),
  },
  'selectModalContentRow2': {
    marginTop: scaleSize(16),
    marginBottom: scaleSize(38)
  },
  'selectIcon': {
    width: scaleSize(50),
    height: scaleSize(50)
  },
  'selectModalContentItem': {
    width: '100%',
    height: scaleSize(100),
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  'sureBtn': {
    backgroundColor: '#1F3070',
    height: scaleSize(108),
    marginTop: scaleSize(36),
    width: '100%'
  },
  'right_close': {
    width: scaleSize(40),
    height: scaleSize(40)
  },
  'padding-left-80': {
    paddingLeft: scaleSize(80)
  },
  'padding-left-30': {
    paddingLeft: scaleSize(30)
  },
  'headerIconDivision': {
    flex: 1,
    fontSize: scaleSize(32),
    textAlign: 'center'
  },
  'lineHeight40': {
    lineHeight: scaleSize(40)
  },
  'qxdyBg': {
    width: scaleSize(540),
    height: scaleSize(200),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'dyOverlay': {
    display: 'flex',
    flexDirection: 'column',
    width: scaleSize(540),
    height: scaleSize(500),
    borderRadius: scaleSize(8),
    backgroundColor: '#fff'
  },
  'dyOverlayContent': {
    width: '100%',
    flex: 1,
    paddingVertical: scaleSize(34),
    // height: ''
  },
  'bells': {
    width: scaleSize(181),
    height: scaleSize(64),
    marginBottom: scaleSize(12)
  },
  'dyOverlayContentText': {
    paddingHorizontal: scaleSize(50)
  },
  'dyOverlayBtn': {
    paddingHorizontal: scaleSize(16),
    width: '100%',
  },
  'dyOverlayBtnItem': {
    width: scaleSize(244),
    height: scaleSize(72),
    borderRadius: scaleSize(36),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'dyOverlayBtnItemClose': {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CBCBCB'
  },
  'dyOverlayBtnItemSure': {
    backgroundColor: '#1F3070'
  },
  'share': {
    position: 'absolute',
    top: '60%',
  },
  'shareBtn': {
    width: scaleSize(264),
    height: scaleSize(109),
  },
  'shareBtnBg': {
    width: '100%',
    height: '100%',
    paddingBottom: scaleSize(8)
  },
  'shareImg': {
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(5)
  },
  'pd_subHeader': {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
    top: (Theme.navBarContentHeight || 0) + Theme.statusBarHeight,
    backgroundColor: '#fff',
    height: scaleSize(96),
  },
  'pd_subHeaderTextWrap': {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleSize(6)
  },
  'pd_subHeaderText': {
    color: '#868686'
  },
  'pd_subHeaderLine': {
    width: scaleSize(56),
    height: scaleSize(6),
    backgroundColor: '#1F3070'
  },
  'pd_subHeaderItem': {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scaleSize(9),
    paddingHorizontal: scaleSize(10)
  },
  'more-photos': {
    width: scaleSize(137),
    height: scaleSize(93),
    position: 'absolute',
    right: scaleSize(32),
    bottom: scaleSize(32),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: scaleSize(8),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9
  },
  'more-photos-text': {
    color: '#000000',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'closeImage': {
    width: scaleSize(40),
    height: scaleSize(40),
  },
  'closeTouch': {
    position: 'absolute',
    top: scaleSize(40),
    right: scaleSize(40),
    paddingHorizontal: scaleSize(30),
    paddingTop: scaleSize(50)
  },
  'noData': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'infoNodata': {
    width: scaleSize(686),
    height: scaleSize(268)
  },
  'managerType': {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: scaleSize(24)
  },
  'businessCard_modal_wrapper': {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  businessCard_modal_container: {
    maxWidth: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scaleSize(32),
    backgroundColor: '#fff',
    borderRadius: scaleSize(8),
  },
  'businessCard_modal_content': {
    backgroundColor: '#fff',
    paddingHorizontal: scaleSize(32),
    paddingBottom: scaleSize(32),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    width: '100%',
    flexDirection: 'row'
  },
  businessCard_modal_content_text: {
    fontSize: scaleSize(28),
    flex: 1,
    textAlign: 'center',
    lineHeight: scaleSize(36)
  },
  'businessCard_modal_footer': {
    height: scaleSize(80),
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#CBCBCB',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  'businessCard_modal_footer_btn': {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'businessCard_modal_footer_line': {
    height: '100%',
    backgroundColor: '#EAEAEA',
    width: StyleSheet.hairlineWidth
  },
  'businessCard_modal_footer_btn_text': {
    fontSize: scaleSize(28),
    color: '#4B6AC5'
  }
})
