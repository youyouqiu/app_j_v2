import {Dimensions, Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";

const d_width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  m_scrollView_wrapper: {
    height: '100%',
  },
  m_wrapper: {
    flex: 1,
  },
  m_search_content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F3070',
    paddingHorizontal: scaleSize(28),
    paddingTop: Theme.statusBarHeight + scaleSize(24),
    paddingBottom: scaleSize(24)
  },
  m_location_content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scaleSize(20)
  },
  m_location_icon: {
    width: scaleSize(36),
    height: scaleSize(36),
    marginRight: scaleSize(14)
  },
  m_location_text: {
    fontSize: scaleSize(32),
    color: '#fff',
    fontWeight: 'bold'
  },
  m_search_container: {
    flex: 1,
    borderRadius: scaleSize(35),
    height: scaleSize(70),
    backgroundColor: '#fff',
    paddingHorizontal: scaleSize(30),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  m_search_icon: {
    width: scaleSize(36),
    height: scaleSize(36),
    marginRight: scaleSize(28)
  },
  m_search_text: {
    color: '#CBCBCB',
    fontSize: scaleSize(28)
  },
  m_label_wrapper: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleSize(32),
    paddingBottom: scaleSize(40),
    paddingTop: scaleSize(40),
  },
  m_label_item_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  m_label_item: {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:scaleSize(10)
  },
  m_title: {
    textAlign: 'center',
    color: '#000',
    fontSize: scaleSize(28),
    marginTop: scaleSize(15),
    width:'100%'
  },
  m_label_icon: {
    width: scaleSize(88),
    height: scaleSize(88),
  },
  m_label_left: {
    flexDirection: 'column',
  },
  m_label: {
    ...Platform.select({
      ios: {
        fontSize: scaleSize(28),
      },
      android: {
        fontSize: scaleSize(24),
      }
    }),
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    flex: 1
  },
  m_label_tips: {
    ...Platform.select({
      ios: {
        fontSize: scaleSize(22),
      },
      android: {
        fontSize: scaleSize(18),
      }
    }),
    width: '100%',
    textAlign: 'center',
    flex: 1,
    color: '#868686'
  },
  m_ad_carousel: {
    width: '100%',
    height: (d_width - scaleSize(64)) * 255 / 1029
  },
  m_ad_wrapper: {
    paddingHorizontal: scaleSize(32),
    paddingBottom: scaleSize(40),
  },
  m_ad_skeleton:{
    width: '100%',
    height: (d_width - scaleSize(64)) * 255 / 1029,
    backgroundColor:'#EAEAEA'
  },
  m_carouselControl_dot: {
    width: scaleSize(8),
    height: scaleSize(6),
    backgroundColor: '#fff',
    marginHorizontal: scaleSize(6)
  },
  m_carouselControl_activeDot: {
    width: scaleSize(20),
    height: scaleSize(6),
    marginHorizontal: scaleSize(6),
    backgroundColor: '#1F3070'
  },
  m_ad_icon: {
    width: '100%',
    height: (d_width - scaleSize(64)) * 255 / 1029,
    borderRadius: scaleSize(4)
  },
  m_subWrapper: {
    width: '100%',
    paddingBottom: scaleSize(30)
  },
  m_content: {
    paddingHorizontal: scaleSize(32),
    marginTop: scaleSize(24),
    paddingTop: scaleSize(24),
    paddingBottom: scaleSize(16)
  },
  m_container: {
    paddingHorizontal: scaleSize(24),
    backgroundColor: 'rgba(255,255,255,0)',
    zIndex: 2
  },
  m_lg_content: {
    height: scaleSize(120),
    position: 'absolute',
    top: 0,
    left: scaleSize(32),
    right: scaleSize(32),
    zIndex: 1,
    borderRadius: scaleSize(8)
  },
  m_reco_buildingInfo_content: {
    flexDirection: 'row'
  },
  m_reco_buildingInfo: {
    flex: 1,
    paddingRight: scaleSize(50)
  },
  m_reco_building_name: {
    fontSize: scaleSize(32),
    fontWeight: 'bold'
  },
  m_reco_building_labels: {
    flexDirection: 'row',
    paddingTop: scaleSize(13),
    paddingBottom: scaleSize(24),
    flexWrap: 'nowrap'
  },
  m_reco_building_projectType: {
    width: scaleSize(76),
    height: scaleSize(33),
    marginRight: scaleSize(8),
  },
  m_reco_building_sellState: {
    backgroundColor: '#F4F5F9',
    height: scaleSize(32),
    lineHeight: scaleSize(32),
    color: '#1F3070',
    fontSize: scaleSize(22),
    marginRight: scaleSize(8),
    paddingHorizontal: scaleSize(8),
    borderRadius: scaleSize(2),
  },
  m_reco_building_treeCategory: {
    backgroundColor: '#CDD8FF',
    color: '#1F3070',
    height: scaleSize(32),
    lineHeight: scaleSize(32),
    fontSize: scaleSize(22),
    marginRight: scaleSize(8),
    paddingHorizontal: scaleSize(8),
    borderRadius: scaleSize(2),
  },
  m_reco_reason: {
    color: '#919191',
    fontSize: scaleSize(25),
    lineHeight: scaleSize(34)
  },
  m_reco_reason_tips: {
    color: '#000'
  },
  m_reco_building_img: {
    width: scaleSize(320),
    height: scaleSize(225),
    borderRadius: scaleSize(8)
  },
  m_reco_building_icon: {
    width: scaleSize(80),
    height: scaleSize(38),
    position: 'absolute',
    zIndex: 1,
    top:scaleSize(16),
    left:scaleSize(-6)
  },
  m_reco_building_img_wrapper: {},
  m_reco_buildIcon_wrapper: {
    position: 'absolute',
    zIndex: 1,
    top: scaleSize(10),
    left: scaleSize(-14),
  },
  m_reco_buildIcon: {
    width: scaleSize(82),
    height: scaleSize(42),
  },
  m_reco_buildIcon_text: {
    fontSize: scaleSize(18),
    color: '#fff',
    position: 'absolute',
    top: scaleSize(6),
    left: scaleSize(10),
    zIndex: 1
  },
  m_reco_buildingList: {
    flexDirection: 'row',
    paddingTop: scaleSize(20)
  },
  m_reco_date_wrapper: {
    flexDirection: 'row',
    backgroundColor: '#F4F5F9',
    padding: scaleSize(8),
    marginRight: scaleSize(40),
    borderRadius: scaleSize(4)
  },
  m_reco_date: {
    fontSize: scaleSize(45),
    color: '#1F3070'
  },
  m_reco_month_wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: scaleSize(6)
  },
  m_reco_month: {
    fontSize: scaleSize(16),
    color: '#1F3070',
    paddingTop: scaleSize(4)
  },
  m_reco_week: {
    fontSize: scaleSize(16),
    color: '#868686',
    paddingBottom: scaleSize(4)
  },
  m_reco_buildingList_icons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  m_reco_buildingList_icon_wrap: {
    paddingHorizontal: scaleSize(10)
  },
  m_reco_buildingList_icon: {
    width: scaleSize(76),
    height: scaleSize(60),
    borderWidth: scaleSize(4),
    borderColor: '#fff',
    borderRadius: scaleSize(4),
  },
  m_reco_buildingList_icon_s: {
    borderColor: '#1F3070',
  },
  m_subHeader_content: {
    paddingHorizontal: scaleSize(32),
    height: scaleSize(60),
    flexDirection: 'row',
    alignItems: 'center'
  },
  m_subHeader_content_left: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleSize(60),
    flex: 1
  },
  m_subHeader_left: {
    width: scaleSize(6),
    height: scaleSize(32),
    borderRadius: scaleSize(1),
    marginRight: scaleSize(10),
    backgroundColor: '#1F3070'
  },
  m_subHeader_text: {
    fontSize: scaleSize(32),
    fontWeight: 'bold'
  },
  m_dynamic_page_wrapper: {
    // paddingBottom: scaleSize(40),
  },
  m_dynamic_wrapper: {
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(24),
    paddingBottom: scaleSize(10)
  },
  m_dynamic_right_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  },
  m_dynamic_right_icon: {
    width: scaleSize(30),
    height: scaleSize(30),
  },
  m_dynamic_right_text: {
    color: '#868686',
    fontSize: scaleSize(26)
  },
  m_dynamic_content: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: scaleSize(226),
    borderRadius: scaleSize(8),
    paddingHorizontal: scaleSize(37),
    paddingTop: scaleSize(14)
  },
  m_dynamic_top: {
    flexDirection: 'row',
    flex: 1
  },
  m_dynamic_tips: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  m_dynamic_text1: {
    fontSize: scaleSize(40),
    color: '#000000',
    paddingBottom: scaleSize(14)
  },
  m_dynamic_text2: {
    fontSize: scaleSize(24),
    color: '#000000'
  },
  m_dynamicIcon: {
    width: scaleSize(132),
    height: scaleSize(132)
  },
  m_dynamic_line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CBCBCB'
  },
  m_dynamic_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleSize(20),
  },
  m_dynamic_btn_text: {
    fontSize: scaleSize(32),
    color: '#1F3070',
    fontWeight: 'bold'
  },
  m_carousel: {
    height: scaleSize(226)
  },
  m_carousel_item: {
    flexDirection: 'row',
    paddingVertical: scaleSize(24),
    paddingHorizontal: scaleSize(14),
    backgroundColor: '#fff',
    height: scaleSize(226),
    borderRadius: scaleSize(8)
  },
  m_carousel_img: {
    height: scaleSize(178),
    width: scaleSize(252),
    marginRight: scaleSize(20),
    borderRadius: scaleSize(8)
  },
  m_carousel_right: {
    flexDirection: 'column',
    flex: 1
  },
  m_carousel_title: {
    color: '#000000',
    fontSize: scaleSize(32),
    fontWeight: 'bold',
    paddingBottom: scaleSize(10)
  },
  m_carousel_desc: {
    fontSize: scaleSize(26),
    color: '#868686',
    flex: 1,
    lineHeight: scaleSize(37),
  },
  m_carousel_footer: {
    flexDirection: 'row'
  },
  m_carousel_footer_left: {
    flex: 1,
    flexDirection: 'row'
  },
  m_carousel_footer_label: {
    backgroundColor: '#F4F5F9',
    color: '#1F3070',
    fontSize: scaleSize(22),
    paddingHorizontal: scaleSize(6),
    paddingVertical: scaleSize(4)
  },
  m_carousel_time: {
    fontSize: scaleSize(24),
    color: '#868686'
  },
  m_carousel_control: {
    position: 'absolute',
    top: scaleSize(40),
    height: scaleSize(226),
  },
  m_carousel_dot: {
    width: scaleSize(12),
    height: scaleSize(12),
    borderRadius: scaleSize(6),
    backgroundColor: '#E3E3E3',
    marginHorizontal: scaleSize(4)
  },
  m_carousel_activeDot: {
    width: scaleSize(12),
    height: scaleSize(12),
    borderRadius: scaleSize(6),
    backgroundColor: '#1F3070',
    marginHorizontal: scaleSize(4)
  },
  m_feature_wrapper: {
    flexDirection: 'row',
    paddingHorizontal: scaleSize(32),
    paddingVertical: scaleSize(30)
  },
  m_feature_left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  m_feature_left_icon: {
    width: scaleSize(40),
    height: scaleSize(40),
    marginRight: scaleSize(8)
  },
  m_feature_right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  m_feature_right_icon: {
    width: scaleSize(25),
    height: scaleSize(25),
    marginBottom: scaleSize(2)
  },
  m_feature_left_title: {
    fontSize: scaleSize(33),
    color: '#925500',
    fontWeight: 'bold',
    marginRight: scaleSize(6)
  },
  m_feature_left_desc: {
    fontSize: scaleSize(24),
    color: '#925500',
  },
  m_feature_right_more: {
    fontSize: scaleSize(24),
    color: '#925500',
  },
  feature_wrapper: {
    marginTop: scaleSize(40),
  },
  m_fs_lg_content: {
    height: scaleSize(300),
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 1,
    borderRadius: scaleSize(8)
  },
  m_feature_scrollView: {
    backgroundColor: 'rgba(255,255,255,0)',
    width: '100%',
    zIndex: 2,
  },
  m_shop_scroll_view_wrapper: {
    width: '100%',
    flexDirection: 'row'
  },
  m_shop_scroll_view: {
    paddingLeft: scaleSize(32),
    flex: 1
  },
  m_shop_scroll_view_empty: {
    width: scaleSize(32),
  },
  m_shop_wrapper: {
    flexDirection: 'column',
    width: scaleSize(310),
    height: scaleSize(240),
    marginHorizontal: scaleSize(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    borderRadius: scaleSize(8)
  },
  m_shop_img: {
    width: scaleSize(310),
    height: scaleSize(147),
    borderTopRightRadius: scaleSize(8),
    borderTopLeftRadius: scaleSize(8),
  },
  m_shop_info: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: scaleSize(6),
    paddingBottom: scaleSize(6)
  },
  m_shop_name_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  m_shop_name: {
    fontSize: scaleSize(28),
    fontWeight: 'bold',
    flex: 1,
    paddingRight: scaleSize(20)
  },
  m_shop_sale_status: {
    color: '#1F3070',
    borderRadius: scaleSize(2),
    backgroundColor: '#F4F5F9',
    paddingHorizontal: scaleSize(6),
    paddingVertical: scaleSize(4),
    fontSize: scaleSize(22)
  },
  m_building_name_wrapper: {
    flexDirection: 'row',
  },
  m_building_name: {
    flex: 1,
    fontSize: scaleSize(24),
    color: '#868686',
    paddingRight: scaleSize(20)
  },
  m_building_sale_price: {
    fontSize: scaleSize(26),
    color: '#FE5139'
  },
  m_quotation_wrapper: {
    paddingTop: scaleSize(20)
  },
  m_quotation_container: {
    paddingHorizontal: scaleSize(32),
    paddingTop: scaleSize(24)
  },
  m_quotation_content: {
    flexDirection: 'row',
    backgroundColor: '#F4F5F9',
    paddingHorizontal: scaleSize(24),
    paddingVertical: scaleSize(22),
    height: scaleSize(140)
  },
  m_quotation_left: {
    flexDirection: 'column',
    paddingRight: scaleSize(30),
    justifyContent: 'space-between',
    flex: 1,
  },
  m_quotation_date: {
    fontSize: scaleSize(24)
  },
  m_quotation_location: {
    fontSize: scaleSize(36),
    fontWeight: 'bold'
  },
  m_quotation_desc: {
    fontSize: scaleSize(24),
    color: '#868686',
  },
  m_quotation_right: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  m_quotation_price_content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  m_quotation_price_icon: {
    width: scaleSize(24),
    height: scaleSize(24),
    borderRadius: scaleSize(12),
    borderWidth: scaleSize(6),
    borderColor: '#fff',
    backgroundColor: '#4B6AC5'
  },
  m_quotation_label: {
    fontSize: scaleSize(28),
    paddingLeft: scaleSize(20),
    width: scaleSize(170),
  },
  m_quotation_price_value: {
    fontSize: scaleSize(26),
    color: '#868686'
  },
  m_quotation_price_value_text: {
    fontSize: scaleSize(32),
    fontWeight: 'bold',
    color: '#000'
  },
  m_quotation_rate_content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  m_quotation_rate_icon: {
    width: scaleSize(24),
    height: scaleSize(24),
    borderRadius: scaleSize(12),
    borderWidth: scaleSize(6),
    borderColor: '#fff',
    backgroundColor: '#3AD047'
  },
  m_quotation_rate_value_img: {
    width: scaleSize(30),
    height: scaleSize(30)
  },
  m_quotation_rate_value: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  m_quotation_rate_value_text_content: {
    fontSize: scaleSize(26),
    color: '#868686'
  },
  m_quotation_rate_value_text: {
    fontSize: scaleSize(32),
    fontWeight: 'bold',
    color: '#000'
  },
  m_buildingLike_wrapper: {
    paddingTop: scaleSize(32)
  },
  m_buildingLike_flatList_wrapper: {
    paddingHorizontal: scaleSize(23),
    paddingTop: scaleSize(20)
  },
  m_buildingLike_item: {
    flexDirection: 'column',
    paddingBottom: scaleSize(32)
  },
  m_buildingLike_building_img: {
    width: '100%',
    height: (d_width - scaleSize(64)) * 144 / 343,
    borderRadius: scaleSize(8)
  },
  m_buildingLike_base_info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(14),
    width: '100%'
  },
  m_buildingLike_buildingName_wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scaleSize(40),
  },
  m_buildingLike_buildingName: {
    fontSize: scaleSize(32),
    fontWeight: 'bold',
  },
  m_buildingLike_discountIcon: {
    width: scaleSize(30),
    height: scaleSize(30)
  },
  m_buildingLike_price: {
    textAlign: 'right',
    fontSize: scaleSize(32),
    color: '#FE5139',
  },
  m_buildingLike_labels: {
    flexDirection: 'row',
    marginBottom: scaleSize(12)
  },
  m_buildingLike_labels_content: {
    flexDirection: 'row',
    flex: 1,
  },
  m_buildingLike_location: {
    textAlign: 'right',
    color: '#868686',
    backgroundColor: '#fff',
    paddingLeft: scaleSize(6)
  }
});

export default styles
