import {Platform, StyleSheet} from "react-native";
import {deviceWidth, scaleSize} from "@/utils/screenUtil";
import {Theme} from '@new-space/teaset'

const styles = StyleSheet.create({
    sb_wrapper: {
        height: '100%',
        position: 'relative'
    },
    sb_headerWrapper: {
        paddingTop: Theme.statusBarHeight,
        height: (Theme.navBarContentHeight || 0) + Theme.statusBarHeight,
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32),
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        top: 0,
        zIndex: 1,
        backgroundColor: '#fff'
    },
    sb_headerImageWrap: {
        width: scaleSize(46),
        height: scaleSize(46),
    },
    sb_headerImage: {
        width: scaleSize(46),
        height: scaleSize(46),
    },
    sb_headerTitle: {
        fontSize: scaleSize(32),
        flex: 1,
        textAlign: 'center',
        color: '#000'
    },
    sb_scrollView: {
        flex: 1,
        paddingBottom: scaleSize(32),
        position: 'relative'
    },
    sb_scrollViewContent: {
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        flexDirection: 'column',
        zIndex: 1,
        ...Platform.select({
            ios: {
                paddingBottom: Theme.isIPhoneX ? scaleSize(52) : scaleSize(32)
            },
            android: {
                paddingBottom: scaleSize(32)
            }
        })
    },
    sb_budget: {
        width: '100%',
    },
    sb_bannerImage: {
        width: deviceWidth,
        height: deviceWidth * 416 / 750
    },
    sb_areaArrow: {
        width: scaleSize(16),
        height: scaleSize(16),
        position: 'absolute',
        right: 20,
    },
    budget: {
        fontSize: scaleSize(32),
        paddingTop: scaleSize(24),
        paddingBottom: scaleSize(24)
    },
    sb_multiSlider_text: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sb_multiSlider_value: {
        fontSize: scaleSize(24),
        color: '#868686'
    },
    budgetText: {
        color: '#4B6AC5'
    },
    sb_customMarker_left: {
        paddingRight: scaleSize(10),
        // backgroundColor:'#ffa7ae'
    },
    sb_customMarker_right: {
        paddingLeft: scaleSize(10),
        // backgroundColor:'#a3f5ff'
    },
    sb_multiSlider_wrap: {
        marginHorizontal: scaleSize(32)
    },
    sb_customMarker: {
        width: scaleSize(50),
        height: scaleSize(50),
    },
    sb_contentItem: {
        paddingTop: scaleSize(32),
    },
    sb_subTitle: {
        fontSize: scaleSize(32),
        fontWeight: 'bold',
    },
    sb_searchBtn: {
        width: '100%',
        height: scaleSize(108),
        backgroundColor: '#1F3070',
        borderRadius: scaleSize(8),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaleSize(20)
    },
    sb_searchBtnText: {
        color: '#fff',
        fontSize: scaleSize(32)
    },
    sb_choice_area_wrapper: {
        paddingTop: scaleSize(40)
    },
    sb_location: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F8F8F8',
        height: scaleSize(74),
        borderRadius: scaleSize(4),
        position: 'relative'
    },
    sb_itemContainer: {
        paddingTop: scaleSize(40)
    },
    sb_areaContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    sb_areaLabel_selected: {
        backgroundColor: '#FFFFFF',
        borderColor: '#000',
    },
    sb_areaText_selected: {
        color: '#000000',
    },
    sb_areaLabelBase: {
        borderWidth: scaleSize(2),
        minWidth: scaleSize(130),
        flex: 1,
        paddingRight: scaleSize(8),
        paddingLeft: scaleSize(8),
        marginBottom: scaleSize(24),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleSize(72),
        borderRadius: scaleSize(4),
        backgroundColor: '#F8F8F8',
        borderColor: '#F8F8F8',
    },
    sb_areaTextBase: {
        color: '#868686',
        fontSize: scaleSize(26)
    },
    sb_locationIcon: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginLeft: scaleSize(14),
        marginRight: scaleSize(14)
    },
    sb_locationLabel: {
        fontSize: scaleSize(26),
        color: '#868686',
        width: '100%'
    },
});

export default styles
