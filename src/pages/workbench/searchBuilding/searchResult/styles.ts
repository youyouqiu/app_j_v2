import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import baseStyles from "@/utils/baseStyle";

const styles = StyleSheet.create({
    sr_screen_wrapper: {
        flexDirection: 'row',
        paddingVertical:scaleSize(10)
    },
    sr_screen_content: {
        flexDirection: 'row'
    },
    sr_screen_item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: scaleSize(10),
        paddingBottom: scaleSize(20)
    },
    sr_screen_text: {
        fontSize: scaleSize(28),
        color: '#868686'
    },
    sr_screen_icon: {
        width: scaleSize(20),
        height: scaleSize(20)
    },
    sr_label_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scaleSize(32),
        paddingVertical: scaleSize(20),
        zIndex: 1
    },
    sr_label_text: {
        color: '#535353',
        textAlign: 'center',
        width: scaleSize(130),
        height: scaleSize(54),
        lineHeight: scaleSize(54),
        backgroundColor: '#F2F2F2',
        borderRadius: scaleSize(4),
    },
    sr_item_wrapper: {
        flexDirection: 'row',
        paddingHorizontal: scaleSize(32),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
        paddingBottom: scaleSize(24),
        paddingTop: scaleSize(32)
    },
    sr_shop_img: {
        width: scaleSize(240),
        height: scaleSize(186),
        marginRight:scaleSize(24)
    },
    sr_shop_discount_icon:{
        width: scaleSize(80),
        height: scaleSize(38),
        position: 'absolute',
        zIndex: 1,
        top:scaleSize(16),
        left:scaleSize(-6)
    },
    sr_shop_info: {
        flex: 1,
        flexDirection: 'column',
    },
    sr_shop_name_content: {
        flexDirection: 'row',
        paddingBottom: scaleSize(18)
    },
    sr_shop_name: {
        flex: 1,
        paddingRight: scaleSize(10)
    },
    sr_shop_sale_status: {
        backgroundColor: '#F4F5F9',
        paddingHorizontal: scaleSize(8),
        paddingVertical: scaleSize(4),
        color: '#1F3070',
        fontSize: scaleSize(22)
    },
    sr_shop_price_content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: scaleSize(10)
    },
    sr_shop_price: {
        fontSize: scaleSize(28),
        color: '#FE5139',
    },
    sr_shop_price_value: {
        fontSize: scaleSize(32),
        color: '#FE5139',
        fontWeight: 'bold',
        paddingTop: scaleSize(4)
    },
    sr_shop_price_line: {
        width: scaleSize(2),
        backgroundColor: '#868686',
        marginHorizontal: scaleSize(10),
        height: scaleSize(20)
    },
    sr_shop_area: {
        fontSize: scaleSize(20)
    },
    sr_shop_location: {
        color: '#868686',
        fontSize: scaleSize(24),
        paddingBottom: scaleSize(16)
    },
    sr_shop_labels: {
        flexDirection: 'row',
        paddingBottom: scaleSize(16)
    },
    sr_shop_commission: {
        flexDirection: 'row',
        paddingBottom: scaleSize(16)
    },
    sr_building_info: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sr_building_point: {
        width: scaleSize(10),
        height: scaleSize(10),
        backgroundColor: '#4B6AC5',
        borderRadius: scaleSize(5)
    },
    sr_building_name: {
        fontSize: scaleSize(24),
        color: '#868686',
        flex: 1,
        paddingLeft: scaleSize(10),
        paddingRight: scaleSize(10)
    },
    sr_building_detail: {
        fontSize: scaleSize(24),
        color: '#1F3070'
    },
    sr_building_icon: {
        width: scaleSize(28),
        height: scaleSize(28)
    },
    sr_screen_modal: {
        position: 'absolute',
        width: '100%',
        top: scaleSize(70),
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.3)',
        bottom: -700
    },
    sr_screen_modal_container: {
        backgroundColor: '#86c1ff'
    },
    sr_listFooter_loading: {
        ...baseStyles.rowCenter,
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(20)
    },
    cl_choice_labels_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scaleSize(32),
        paddingVertical: scaleSize(20),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA'
    }
});
export default styles;
