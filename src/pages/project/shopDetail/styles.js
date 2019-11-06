import {StyleSheet} from "react-native";
import {scaleSize} from "../../../utils/screenUtil";
import Theme from "teaset/themes/Theme";

export default StyleSheet.create({
    bd_wrapper: {
        height: '100%'
    },
    bd_header: {},
    bd_content: {
        paddingBottom: scaleSize(140)
    },
    bd_subWrapper: {
        borderBottomWidth: scaleSize(24),
        borderColor: '#F8F8F8',
        borderStyle: 'solid',
    },
    bd_carouselImage: {
        width: '100%',
        height: 238
    },
    bd_subContainer: {
        padding: scaleSize(32),
    },
    bd_titleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: scaleSize(30)
    },
    bd_title: {
        flex: 1,
        fontSize: scaleSize(32),
        color: '#000000'
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
        alignItems: 'center',
        paddingBottom: scaleSize(44)
    },
    bd_priceText: {
        color: '#FE5139',
        fontSize: scaleSize(34)
    },
    bd_priceItem: {
        paddingRight: scaleSize(60),
        flex: 0
    },
    bd_areaText: {
        fontSize: scaleSize(34),
    },
    bd_areaItem: {
        alignItems: 'flex-start',
        paddingLeft: scaleSize(60)
    },
    bd_otherInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bd_labelItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    bd_labelItemText: {
        fontSize: scaleSize(28),
        color: '#000000'
    },
    bd_labelItemType: {
        fontSize: scaleSize(24),
        color: '#CBCBCB',
        paddingTop: scaleSize(6)
    },
    bd_separator: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#CBCBCB',
        height: scaleSize(38)
    },
    bd_subHeader: {
        fontSize: scaleSize(32),
        paddingBottom: scaleSize(24),
        fontWeight:'bold',
        color: '#000000',
    },
    bd_descItemContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    bd_descItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        paddingBottom: scaleSize(26)
    },
    bd_descLabel: {
        color: '#868686',
        fontSize: scaleSize(24),
        width: scaleSize(140)
    },
    bd_descValue: {
        flex: 1,
        color: '#000',
        fontSize: scaleSize(24)
    },
    bd_introduce: {
        fontSize: scaleSize(28),
        color: '#868686',
        lineHeight: scaleSize(40)
    },
    bd_matchItemContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    bd_matchItem: {
        width: '20%',
        paddingBottom: scaleSize(24),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bd_matchItemImage: {
        width: scaleSize(50),
        height: scaleSize(50),
        marginBottom: scaleSize(18)
    },
    bd_matchItemLabel: {
        fontSize: scaleSize(26),
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
        paddingBottom: scaleSize(16)
    },
    bd_footerContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1F3070',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(8)
    },
    bd_footerContentText: {
        fontSize: scaleSize(32),
        color: '#fff'
    },
    bd_animatedHeader: {
        position: 'absolute',
        width: '100%',
        zIndex: 999,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: Theme.navBarContentHeight + Theme.statusBarHeight,
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
        height: Theme.navBarContentHeight + Theme.statusBarHeight,
    },
    bd_headerContainer: {
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
    bd_headerAnimated: {
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: -1,
        paddingRight: scaleSize(30),
        paddingLeft: scaleSize(30),
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop: Theme.statusBarHeight,
    },

});
