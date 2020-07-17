import {StyleSheet, ViewStyle, TextStyle, ImageStyle, Dimensions} from 'react-native'
import {scaleSize} from '@/utils/screenUtil'
import {Theme} from "@new-space/teaset";

const alignWidth = '47%'
const d_width = Dimensions.get('window').width;
export default StyleSheet.create({
  shareReport: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EAEAEA',
    borderWidth: StyleSheet.hairlineWidth,
    height: scaleSize(88),
  },
  shareReportImg: {
    width: scaleSize(40),
    height: scaleSize(40),
    marginLeft: scaleSize(8)
  },
  shareReportText: {
    fontSize: scaleSize(28),
    color: '#000'
  },
  bd_ShopUniqueItem: <ViewStyle>{
    width: alignWidth,
    flexDirection: 'row',
  },
  bd_shopUniqueContent: <ViewStyle>{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: scaleSize(10),
    marginHorizontal: scaleSize(2),
  },
  bd_bd_ShopUniqueItem_flex: <ViewStyle>{
    height: scaleSize(53),
    marginTop: scaleSize(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bd_bd_ShopUniqueItem_flex_right: {
    width: scaleSize(158),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CBCBCB'
  },
  bd_bd_ShopUniqueItem_flex_right_text: <TextStyle>{
    flex: 1,
    textAlign: 'center',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  bd_bd_ShopUniqueItem_flex_left: {
    width: scaleSize(135),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#4B6AC5',
    backgroundColor: '#4B6AC5'
  },
  bd_bd_ShopUniqueItem_flex_left_text: <TextStyle>{
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  bd_wrapper: {
    height: '100%'
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  bd_header: {},
  bd_content: {
    paddingBottom: scaleSize(140)
  },
  bd_seatNumText: {
    color: '#000000',
    fontSize: scaleSize(32),
    fontWeight: '500',
    lineHeight: scaleSize(45)
  },
  bd_seatNum: {
    flex: 1,
  },
  bd_subWrapper: {
    paddingTop: scaleSize(40),
    borderBottomWidth: scaleSize(24),
    borderColor: '#F8F8F8',
    borderStyle: 'solid',
  },
  bd_carouselImage: {
    width: '100%',
    height: 275
  },
  bd_headContainer: {
    marginTop: scaleSize(32),
    marginHorizontal: scaleSize(32),
  },
  // 全局布局
  bd_subContainer: {
    marginTop: scaleSize(40),
    marginBottom: scaleSize(24),
    marginHorizontal: scaleSize(32),
  },
  bd_titleContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sd_hi_labels: {
    flexDirection: 'row',
    paddingVertical: scaleSize(24)
  },
  sd_hi_label_blank: {
    flex: 1
  },
  sd_hi_ranking_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
    borderRadius: scaleSize(2),
    paddingHorizontal: scaleSize(6),
    paddingVertical: scaleSize(4)
  },
  sd_hi_ranking_icon: {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  sd_hi_ranking_text: {
    color: '#1F3070',
    fontSize: scaleSize(24),
    paddingLeft: scaleSize(10),
    paddingRight: scaleSize(20)
  },
  sd_hi_ranking_arrow: {
    width: scaleSize(10),
    height: scaleSize(16)
  },
  bd_title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: scaleSize(40),
    width: '100%'
  },
  bd_verify_content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bd_type: {
    fontSize: scaleSize(22),
    backgroundColor: '#EAEAEA',
    color: '#868686',
    paddingLeft: scaleSize(6),
    paddingRight: scaleSize(6),
    marginRight: scaleSize(8)
  },
  bd_status: {
    fontSize: scaleSize(22),
    backgroundColor: '#E4F1FF',
    color: '#49A1FF',
    paddingLeft: scaleSize(6),
    paddingRight: scaleSize(6)
  },
  bd_priceAndArea: {
    flexDirection: 'row',
    marginTop: scaleSize(32),
  },
  bd_priceText: {
    color: '#FE5139',
    fontSize: scaleSize(34)
  },
  bd_priceItem: {
    flex: 1
  },
  bd_areaText: {
    fontSize: scaleSize(34),
  },
  bd_areaItem: {
    alignItems: 'flex-start',
    paddingLeft: scaleSize(60),
    flex: 1.4
  },
  bd_otherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: scaleSize(124),
    borderColor: '#EAEAEA',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scaleSize(8),
    marginTop: scaleSize(40),
  },
  bd_labelItemType: {
    fontSize: scaleSize(24),
    color: '#CBCBCB',
    paddingTop: scaleSize(6)
  },
  bd_separator: {
    width: 1,
    height: scaleSize(38),
    backgroundColor: '#CBCBCB',
  },
  bd_subHeader: <TextStyle>{
    fontWeight: '500',
    fontSize: scaleSize(32),
    lineHeight: scaleSize(45),
  },
  bd_descItemContent: <ViewStyle>{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: scaleSize(2),
  },
  // bd_descItem: (single: boolean): ViewStyle => ({
  //     width: single ? '100%' : alignWidth,
  //     flexDirection: 'row',
  //     marginTop: scaleSize(24),
  // }),
  bd_descLabel: {
    width: scaleSize(120),
    color: '#868686',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  bd_descValue: {
    flex: 1,
    fontSize: scaleSize(24),
    lineHeight: scaleSize(33),
  },
  bd_introduce: {
    marginTop: scaleSize(24),
    color: '#868686',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(38),
  },
  bd_matchItemContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scaleSize(32),
    paddingBottom: scaleSize(24)
  },
  bd_matchItem: {
    width: '20%',
    marginTop: scaleSize(24),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bd_matchItemImage: {
    width: scaleSize(50),
    height: scaleSize(50),
  },
  bd_matchItemLabel: {
    marginTop: scaleSize(17),
    fontSize: scaleSize(26),
    lineHeight: scaleSize(40),
  },
  bd_footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: scaleSize(140),
    borderTopColor: '#EAEAEA',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingLeft: scaleSize(32),
    paddingRight: scaleSize(32),
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(16),
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bd_animatedHeader: {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: Theme.statusBarHeight + (Theme.navBarContentHeight || 0),
    backgroundColor: '#fff',
    height: scaleSize(96),
  },
  bd_animatedHeaderItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bd_animatedHeaderTextWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleSize(6)
  },
  bd_animatedHeaderText: {
    color: '#868686'
  },
  bd_animatedHeaderLine: {
    width: scaleSize(56),
    height: scaleSize(6),
    backgroundColor: '#1F3070'
  },
  bd_headerIcon: {
    width: scaleSize(64),
    height: scaleSize(64)
  },
  bd_headerAbsolute: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 999,
    height: (Theme.navBarContentHeight || 0) + Theme.statusBarHeight,
  },
  bd_headerAnimated0: {
    paddingRight: scaleSize(30),
    paddingLeft: scaleSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingTop: Theme.statusBarHeight,
  },
  bd_headerAnimated1: {
    position: 'absolute',
    backgroundColor: '#fff',
    paddingRight: scaleSize(30),
    paddingLeft: scaleSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingTop: Theme.statusBarHeight,
  },
  bd_headerIconDivision: {
    flex: 1,
    fontSize: scaleSize(32),
    textAlign: 'center'
  },
  callContainer: <ViewStyle>{
    marginTop: scaleSize(34),
  },
  call: <ViewStyle>{
    borderColor: '#EAEAEA',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: scaleSize(8),
    padding: scaleSize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleSize(10),
  },
  residentUserInfo: <ViewStyle>{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: <ImageStyle>{
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(12),
  },
  callIcon: <ImageStyle>{
    width: scaleSize(30),
    height: scaleSize(30),
    marginRight: scaleSize(8),
  },
  callText: <TextStyle>{
    color: '#4B6AC5',
    fontSize: scaleSize(24),
    lineHeight: scaleSize(32),
  },
  residentUserText: <TextStyle>{
    flex: 1,
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  callBtn: <ViewStyle>{
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(20),
    borderColor: '#4B6AC5',
    borderWidth: scaleSize(2),
    borderRadius: scaleSize(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sd_filedHalf_wrapper: {
    width: '50%',
    flexDirection: 'row',
    paddingBottom: scaleSize(24)
  },
  sd_filedWhole_wrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: scaleSize(24)
  },
  sd_filed_label: {
    color: '#868686',
    fontSize: scaleSize(28),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sd_sd_filed_value: {
    fontSize: scaleSize(28)
  },
  sd_numerical_wrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: scaleSize(24)
  },
  sd_numerical_line: {
    width: scaleSize(2),
    backgroundColor: '#CBCBCB',
    height: scaleSize(75),
    marginRight: scaleSize(20)
  },
  sd_numerical_item: {
    flexDirection: 'column',
    flex: 1,
  },
  sd_numerical_item_right: {
    flex: 0,
    paddingRight: scaleSize(40)
  },
  sd_numerical_right: {
    flexDirection: 'row',
  },
  sd_area_value: {
    fontSize: scaleSize(32),
    fontWeight: '500'
  },
  sd_area_unit: {
    fontSize: scaleSize(28),
    fontWeight: 'normal'
  },
  sd_numerical_label: {
    color: '#868686',
    fontSize: scaleSize(28),
    paddingTop: scaleSize(10)
  },
  sd_price_value: {
    fontSize: scaleSize(32),
    color: '#FE5139',
    fontWeight: '500'
  },
  sd_price_unit: {
    fontSize: scaleSize(28),
    fontWeight: 'normal'
  },
  sd_unitPrice_value: {
    color: '#FE5139',
    fontSize: scaleSize(32),
    fontWeight: '500'
  },
  sd_unitPrice_unit: {
    fontSize: scaleSize(28),
    color: '#000',
    fontWeight: 'normal'
  },
  sd_filed_wrapper: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap'
  },
  sd_active_wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: scaleSize(24)
  },
  sd_commission_label: {
    fontSize: scaleSize(28),
    paddingRight: scaleSize(20),
    color: '#FE5139'
  },
  sd_commission_value: {
    fontSize: scaleSize(28),
    lineHeight: scaleSize(34),
    flex: 1
  },
  sd_headerInfo_wrapper: {
    borderBottomWidth: scaleSize(24),
    borderColor: '#F8F8F8',
    paddingBottom: scaleSize(24)
  },
  sd_pm_wrapper: {
    paddingTop: scaleSize(24),
    borderBottomWidth: scaleSize(24),
    borderColor: '#F8F8F8'
  },
  sd_pm_content: {
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(24)
  },
  sd_pm_more_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: scaleSize(30),
  },
  sd_pm_more_text: {
    fontSize: scaleSize(28),
    color: '#aaa',
  },
  sd_pm_more_img: {
    width: scaleSize(25),
    height: scaleSize(25)
  },
  sd_pm_manager_item: {
    flexDirection: 'row',
    paddingBottom: scaleSize(20),
    alignItems: 'center'
  },
  sd_pm_manager_name_icon: {
    height: scaleSize(80),
    lineHeight: scaleSize(80),
    width: scaleSize(80),
    borderRadius: scaleSize(40),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    marginRight: scaleSize(16),
    fontWeight: '500',
      textAlign: 'center'
  },
  sd_pm_manager_portrait: {
    width: scaleSize(80),
    height: scaleSize(80),
    marginRight: scaleSize(20),
    borderRadius: scaleSize(40)
  },
  sd_pm_manager_info: {
    flexDirection: 'column',
    flex: 1
  },
  sd_pm_manager_name: {
    fontSize: scaleSize(32),
    fontWeight: '500',
    paddingBottom: scaleSize(6)
  },
  sd_pm_manager_tips: {
    fontSize: scaleSize(28),
    color: '#868686'
  },
  sd_pm_manager_num: {
    fontWeight: '500',
    color: '#000'
  },
  sd_pm_call_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleSize(8),
    paddingVertical: scaleSize(8),
    borderWidth: scaleSize(4),
    borderColor: '#1F3070',
    borderRadius: scaleSize(8)
  },
  sd_pm_call_btn_icon: {
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(10)
  },
  sd_pm_call_btn_text: {
    color: '#1F3070',
    fontSize: scaleSize(28)
  },
  sd_rr_tab_view_wrapper: {
    paddingVertical: scaleSize(24)
  },
  sd_rr_reportRule_wrapper: {
    paddingHorizontal: scaleSize(32)
  },
  sd_rr_reportRule: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
  },
  sd_rr_reportRule_item: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    minHeight: scaleSize(72)
  },
  sd_rr_reportRule_label_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(210),
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    paddingVertical: scaleSize(10)
  },
  sd_rr_reportRule_value_wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    paddingHorizontal: scaleSize(20),
    paddingVertical: scaleSize(10)
  },
  sd_rr_reportRule_label: {
    fontSize: scaleSize(24),
    color: '#868686',
  },
  sd_rr_reportRule_value: {
    fontSize: scaleSize(24),
    color: '#000000',
  },
  sd_rr_wrapper: {
    paddingTop: scaleSize(24),
    borderBottomWidth: scaleSize(24),
    borderColor: '#F8F8F8'
  },
  sd_rr_tab_wrapper: {
    marginTop: scaleSize(32),
    // height: scaleSize(500)
    // paddingHorizontal: scaleSize(32)
  },
  sd_rr_tab_scroll_tab: {
    height: scaleSize(65),
  },
  sd_rr_tab_scroll_tab_line: {
    // paddingTop: scaleSize(10),
    width: scaleSize(50),
    height: scaleSize(3),
    backgroundColor: '#1F3070'
  },
  sd_rr_text_wrapper: {
    paddingHorizontal: scaleSize(32)
  },
  sd_loanIcon_wrapper: {
    borderBottomWidth: scaleSize(24),
    borderColor: '#F8F8F8'
  },
  sd_loanIcon: {
    width: d_width,
    height: d_width * 240 / 1074
  },
  sd_gi_wrapper: {
    paddingTop: scaleSize(40),
    borderBottomWidth: scaleSize(24),
    borderColor: '#F8F8F8'
  },
  sd_gi_content: {
    paddingHorizontal: scaleSize(32)
  },
  sd_gi_tabBar: {
    width: scaleSize(320),
  },
  sd_gi_tabBarUnderlineStyle: {
    backgroundColor: 'red',
    height: scaleSize(4)
  },
  sd_gi_tab_style: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  sd_gi_baseInfo_wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sd_headerBar_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleSize(32),
    paddingBottom: scaleSize(24),
    backgroundColor: 'rgba(255,255,255,0)',
    paddingTop: Theme.statusBarHeight,
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 1
  },
  sd_headerBar_center: {
    flex: 1
  },
  sd_headerBar_icon: {
    width: scaleSize(64),
    height: scaleSize(64)
  },
  sd_share_wrapper: {
    position: 'absolute',
    top: '50%',
    zIndex: 1
  },
  sd_share_btn: {
    width: scaleSize(264),
    height: scaleSize(109),
  },
  sd_share_btn_bg: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  sd_share_icon: {
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(5),
    marginBottom: scaleSize(8)
  },
  sd_share_text: {
    color: '#fff',
    fontSize: scaleSize(32),
    marginBottom: scaleSize(8)
  },
  sd_sp_wrapper: {
    paddingVertical: scaleSize(16),
    borderBottomWidth: scaleSize(24),
    borderColor: '#F8F8F8',
    borderStyle: 'solid',
  },
  sd_sp_content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: scaleSize(32),
    flexWrap: 'wrap'
  },
  sd_sp_item: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    paddingVertical: scaleSize(16)
  },
  sd_sp_item_icon: {
    width: scaleSize(64),
    height: scaleSize(64)
  },
  sd_sp_item_name: {
    fontSize: scaleSize(28),
    color: '#000000'
  },
  sd_sp_item_value: {
    fontSize: scaleSize(24),
    color: '#868686'
  },
  'managerType': {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: scaleSize(24),
    marginBottom: scaleSize(24),
  },
  'managerTypeText': {
    fontSize: scaleSize(24),
    color: '#868686'
  },
  sd_bp_wrapper: {
    paddingVertical: scaleSize(20),
    borderBottomWidth: scaleSize(24),
    borderColor: '#F8F8F8'
  },
  sd_bp_content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(20)
  },
  sd_bp_building_img: {
    width: scaleSize(240),
    height: scaleSize(184)
  },
  sd_bp_building_info: {
    flex: 1,
    paddingLeft: scaleSize(24)
  },
  sd_bp_building_name_content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(18)
  },
  sd_bp_building_name: {
    flex: 1,
    fontSize: scaleSize(32),
    fontWeight: 'bold',
    paddingRight: scaleSize(10)
  },
  sd_bp_building_price_content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(10)
  },
  sd_bp_building_price: {
    color: '#FE5139',
    fontSize: scaleSize(30)
  },
  sd_bp_building_rest: {
    color: '#868686',
    fontSize: scaleSize(24)
  },
  sd_bp_building_location: {
    color: '#868686',
    fontSize: scaleSize(24),
    paddingBottom: scaleSize(10)
  },
  sd_bp_building_labels: {
    flexDirection: 'row',
    paddingBottom: scaleSize(10)
  },
  sd_bp_building_discount_content: {
    flexDirection: 'row'
  },
  sd_bp_building_discount: {
    display: 'flex',
    backgroundColor: '#FFE8E4',
    color: '#FE5139',
    fontSize: scaleSize(22),
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(6)
  },
  gslp: {
    width: scaleSize(50),
    height: scaleSize(50)
  },
  gslpBtn: {
    paddingHorizontal: scaleSize(24),
    marginRight: scaleSize(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  gslpText: {
    fontSize: scaleSize(22),
    marginTop: scaleSize(7)
  }
})
