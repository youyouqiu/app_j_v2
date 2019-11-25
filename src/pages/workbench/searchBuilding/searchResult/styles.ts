import {StyleSheet} from "react-native";
import {scaleSize} from "../../../../utils/screenUtil";

const styles = StyleSheet.create({
    sr_navBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EAEAEA'
    },
    sr_itemContent: {
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32),
        paddingTop: scaleSize(30),
    },
    sr_buildingInfo: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
        borderRadius: scaleSize(4),
        paddingLeft: scaleSize(24),
        paddingRight: scaleSize(24),
        paddingTop: scaleSize(30),
        paddingBottom: scaleSize(18),
    },
    sr_buildingTitleWrap: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: scaleSize(24)
    },
    sr_buildingTitleContainer: {
        flexDirection: 'row',
        flex: 1
    },
    sr_buildingTitle: {
        fontSize: scaleSize(32),
        paddingRight: scaleSize(20),
        fontWeight: 'bold',
    },
    sr_rightIconWrap: {
        minWidth: scaleSize(150),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sr_rightIcon: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    sr_saleShops: {
        fontSize: scaleSize(24),
        color: '#CBCBCB'
    },
    sr_saleShopsNum: {
        color: '#000',
        fontSize: scaleSize(22)
    },
    sr_shopsContent: {},
    sr_shopsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
        padding: scaleSize(24),
    },
    sr_shopsLeft: {
        flexDirection: 'column',
        flex: 1
    },
    sr_shopTitle: {
        fontSize: scaleSize(28)
    },
    sr_shopLabelGroup: {
        flexDirection: 'row',
        paddingTop: scaleSize(16)
    },
    sr_shopsRightItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    sr_shopsRightItem_label: {
        fontSize: scaleSize(24),
        color: '#CBCBCB'
    },
    sr_shopsRightItem_area: {
        fontSize: scaleSize(28),
        flex: 1
    },
    sr_shopsRightItem_price: {
        color: '#FE5139',
        flex: 1
    },
    sr_shopsRight: {
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(350)
    },
    sr_shopsRightDivision: {
        height: scaleSize(32),
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#EAEAEA',
        marginLeft: scaleSize(30),
        marginRight: scaleSize(30)
    },
    sr_headerComponent: {
        paddingTop: scaleSize(16),
        paddingBottom: scaleSize(16),
        flexDirection: 'column',
    },
    sr_demandWrap: {
        flexDirection: 'column',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32)
    },
    sr_demandLabel: {
        fontSize: scaleSize(24),
        color: '#868686',
        paddingTop: scaleSize(32),
        paddingBottom: scaleSize(28)
    },
    sr_demandContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    sr_resultText: {
        width: '100%',
        backgroundColor: '#F8F8F8',
        paddingTop: scaleSize(24),
        paddingBottom: scaleSize(24),
        fontSize: scaleSize(24),
        color: '#868686',
        paddingLeft: scaleSize(40)
    },
    sr_resultNum: {
        color: '#000'
    },
    sr_footerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(100),
    },
});
export default styles;
