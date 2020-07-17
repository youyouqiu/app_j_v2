import {StyleSheet} from 'react-native'
import Theme from "@new-space/teaset/themes/Theme";
import {scaleSize} from '../../utils/screenUtil'

const u = global.unitPixel;

export const IndexStyle = StyleSheet.create({
    container: {
        height: scaleSize(90),
        width: scaleSize(640),
        display: 'flex',
        flexDirection: 'row',
        borderRadius: scaleSize(54),
        alignItems: 'center',
        paddingLeft: scaleSize(45),
        backgroundColor: '#fff',
        borderColor: '#dfdfdf',
        borderWidth: 1,
    },
    placeholder: {
        color: '#92979e',
        marginLeft: 5
    },
    searchPanelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 4.5 * u,
        width: '100%',
    },
    searchPanelTitle: {
        paddingTop: scaleSize(27),
        paddingBottom: scaleSize(27),
        paddingLeft: scaleSize(24),
        backgroundColor: 'rgba(251,251,251,1)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#dfdfdf',
        borderBottomColor: '#dfdfdf',
    },
    searchPanelContent: {
        paddingTop: scaleSize(24),
        paddingRight: scaleSize(24),
        paddingBottom: scaleSize(24),
        paddingLeft: scaleSize(24),
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    searchPanelContentTag: {
        marginBottom: 8,
        marginRight: 8,
        backgroundColor: '#dfdfdf'
    },
    searchPanelFooter: {
        position: 'absolute',
        bottom: 12,
        // height: 3.5 * u,
        width: '100%',
    },
    ywySearchConditionBar: {
        backgroundColor: '#fff',
        // borderBottomColor: 'rgb(220,220,220)'
    },
    searchContent: {
        position: 'absolute',
        top: 3.0 * u,
        bottom: 0,
        width: '100%',
    },
    searchContentZindex: {
        zIndex: 10,
    },
    ywyBannel: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        height: 242,
        position: 'relative',
        // borderWidth:1,
    },
    logoBar: {
        position: 'absolute',
        zIndex: 10,
        top: -25,
        width: '100%'
    },
    navBarLogoYwy: {
        width: 6 * u,
        height: 1.5 * u,
    },
    ywyCarousel: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        overflow: 'hidden',
        fontSize: 1 * u
    },

    carouselItem: {
        marginRight: 1 * u,
        marginTop: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    recommend: {
        width: 'auto',
        paddingBottom: scaleSize(32)
    },
    recommendTitle: {
        fontSize: 16,
        color: '#333',
        margin: 5
    },
    recommendContent: {
        // marginTop: .8 * u,
        display: 'flex',
        flexDirection: 'row',
        marginRight: 5,
        paddingLeft: scaleSize(24),
        paddingRight: scaleSize(24),
        // paddingTop: scaleSize(32),
        // paddingBottom: scaleSize(32)
    },
    recommendContentItem: {
        marginRight: 10
    },
    recommendContentImg: {
        width: scaleSize(280),
        height: scaleSize(210)
    },
    recommendContentImgName: {
        color: '#1e2227',
        fontSize: 14,
        paddingTop: scaleSize(16),
    },
    dqtj: {
        // marginLeft: scaleSize(24),
        // marginRight: scaleSize(24),
        paddingTop: scaleSize(24),
        paddingBottom: scaleSize(24),
        borderTopWidth: 1,
        borderTopColor: 'rgba(223,223,223,1)'
    },
    ywySection: {
        backgroundColor: '#F2F2F2',
        paddingTop: scaleSize(34),
        paddingBottom: scaleSize(34),
        paddingRight: scaleSize(24),
        paddingLeft: scaleSize(24),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    change: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    /*
     * src/ywy/pages/index.js的styles
     */

    // 铺侦探经纪人文本+搜索img的topbar
    searchBarView: {
        width: scaleSize(602),
        height: scaleSize(64),
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        paddingLeft: scaleSize(50)
    },
    // 搜索img
    searchImg: {
        width: scaleSize(36),
        height: scaleSize(36)
    },
    searchInput: {
        height: scaleSize(34)
    },
    // 顶部轮播图
    topBannerImg: {
        width: scaleSize(750),
        height: scaleSize(512)
    },
    // 报备、客户、通讯录、佣金
    toolsIconView: {
        paddingTop: scaleSize(24),
        paddingBottom: scaleSize(18)
    },
    // tools图标尺寸
    toolsIconSize: {
        width: scaleSize(100),
        height: scaleSize(100)
    },
    // 房源信息View
    houseListView: {
        paddingLeft: scaleSize(40)
    },
    // 房源信息文本
    houseListTest: {
        fontSize: scaleSize(36),
        color: '#393E48',
        paddingTop: scaleSize(56)
    },
    // 空房源View
    noHouseView: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    // 空房源提示图
    noHouseImg: {
        width: scaleSize(397),
        height: scaleSize(397)
    },
    // 空房源提示文本
    noHouseText: {
        color: '#92979e',
        paddingTop: scaleSize(57)
    },
    header_wrapper: {
        width: '100%',
        height: scaleSize(105) + Theme.statusBarHeight,
        position: 'absolute',
        paddingTop: Theme.statusBarHeight,
        zIndex: 999
    },
    header_container_op: {
        position: 'absolute',
        height: scaleSize(105) + Theme.statusBarHeight,
        width: '100%',
        backgroundColor: '#fff',
        opacity: 0,
        zIndex: 9,
        top: -16
    },
    header_container_opacity: {
        position: 'absolute',
        zIndex: 0,
        paddingTop: Theme.statusBarHeight,
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    header_container: {
        height: '100%',
        flex: 1,
        zIndex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: scaleSize(24),
        paddingLeft: scaleSize(24),
        paddingBottom: scaleSize(10),
        paddingTop: Theme.statusBarHeight,
        borderBottomWidth:StyleSheet.hairlineWidth
    },
    header_container_show: {
        backgroundColor: '#fff',
        borderBottomColor: '#EAEAEA',
    },
    header_container_hide: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderBottomColor:'rgba(0,0,0,0)'
    },
    header_content: {
        zIndex: 10,
        backgroundColor: '#fff',
        height: scaleSize(72),
        flex: 1,
        borderRadius: scaleSize(8),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#CBCBCB'
    },
    header_left: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleSize(159),
        height: '100%'
    },
    header_center: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: scaleSize(108), // UI未居中
        alignItems: 'center',
        flex: 1
    },
    header_location_icon: {
        height: scaleSize(30),
        width: scaleSize(30),
        marginLeft: scaleSize(10)
    },
    header_location_text: {
        fontSize: scaleSize(25),
        paddingLeft: scaleSize(10)
    },
    header_division: {
        width: scaleSize(2),
        height: scaleSize(30),
        backgroundColor: '#CBCBCB',
        marginLeft: scaleSize(15)
    },
    header_search_icon: {
        height: scaleSize(30),
        width: scaleSize(30),
    },
    header_scan_icon: {
        height: scaleSize(45),
        width: scaleSize(45),
        marginLeft: scaleSize(20)
    },
    header_search_text: {
        fontSize: scaleSize(28),
        fontWeight: '400',
        paddingLeft: scaleSize(30),
        color: '#b6b6b6'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    topWrap: {
        paddingBottom: scaleSize(40),
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(34),
        paddingTop: scaleSize(23),
        height: scaleSize(512)
    },
    khgl: {
        width: scaleSize(319),
        height: scaleSize(226),
        borderRadius: scaleSize(8),
        backgroundColor: '#38C2C7',
        paddingTop: scaleSize(23),
        paddingLeft: scaleSize(17),
        paddingRight: scaleSize(22)
    },
    syBigText: {
        color: '#fff',
        fontSize: scaleSize(28)
    },
    topIcon: {
        width: scaleSize(110),
        height: scaleSize(90),
        marginRight: scaleSize(20),
        marginBottom: scaleSize(-10)
    },
    topRight: {
        width: scaleSize(341),
        height: scaleSize(101),
        paddingLeft: scaleSize(30),
        alignItems: 'center',
        borderRadius: scaleSize(8)
    },
    bbgl: {
        marginBottom: scaleSize(24),
        backgroundColor: '#FDA20C',
    },
    qygl: {
        backgroundColor: '#4480F7',
    },
    topLittleIcon: {
        width: scaleSize(60),
        height: scaleSize(60),
        marginRight: scaleSize(16)
    },
    syLittleText: {
        color: '#4D4D4D',
        fontSize: scaleSize(28)
    },
    topLine: {
        width: scaleSize(2),
        height: scaleSize(84),
        marginRight: scaleSize(39),
        backgroundColor: '#EAEAEA'
    },
    topBorder: {
        borderColor: '#EAEAEA',
        borderBottomWidth: 1,
    },
    topSmall: {
        marginTop: scaleSize(34),
        marginBottom: scaleSize(25),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
    }
});
