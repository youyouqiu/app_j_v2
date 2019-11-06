/**
 * Created by Kary on 2019/09/06 15:07.
 */
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import {scaleSize} from "../../../utils/screenUtil";
export default StyleSheet.create({
    flex: {
        display: 'flex'
    },
    flexRow: {
        flexDirection: 'row'
    },
    alignCenter: {
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    color_fff: {
        color: '#fff'
    },
    fontSize_24: {
        fontSize: scaleSize(24)
    },
    fontSize_28: {
        fontSize: scaleSize(28)
    },
    page: {
        backgroundColor: '#F8F8F8',
        position: 'relative'
    },
    topBar: {
        backgroundColor: 'transparent',
    },
    pageTitle: {
        color: '#fff',
        fontSize: scaleSize(32)
    },
    bg: {
        width: '100%',
        height: scaleSize(400),
        position: 'relative',
        justifyContent: 'flex-end'
    },
    back: {
       width: scaleSize(45),
       height: scaleSize(45),
        backgroundColor: 'transparent',
    },
    _project: {
        width: '100%',
        position: 'absolute',
        backgroundColor: '#fff',
        height: scaleSize(227 + 130),
        paddingTop: scaleSize(20),
        top: 0,
        zIndex: 100,
        borderColor: '#EAEAEA',
        borderBottomWidth: scaleSize(1),
        borderTopWidth: scaleSize(1),
        justifyContent: 'flex-end',
        textAlign: 'center',
    },
    _projectNum: {
        marginLeft: scaleSize(59)
    },
    color_000: {
        color: '#000000'
    },
    color_cb: {
        color: '#CBCBCB'
    },
    project: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    project_icon: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(8)
    },
    project_num: {
        marginLeft: scaleSize(8),
        color: '#fff',
        fontSize: scaleSize(28)
    },
    list: {
        width: '100%',
        display: 'flex',
        position: 'relative'
    },
    dataView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: scaleSize(50),
        marginBottom: scaleSize(40)
    },
    dataViewItem: {
        display: 'flex',
        justifyContent: 'center',
        width: scaleSize(130)
    },
    dataViewItem_text: {
        fontSize: scaleSize(32),
        color: '#fff',
        marginBottom: scaleSize(10)
    },
    dataViewItem_label: {
        fontSize: scaleSize(24),
        color: '#fff'
    },
    lineView: {

    },
    line: {
        width: scaleSize(1),
        height: scaleSize(33),
        backgroundColor: '#EAEAEA',
        marginRight: scaleSize(34),
        marginLeft: 'auto',

    },
    itemView: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        borderRadius: scaleSize(8),
        padding: scaleSize(24),
        marginBottom: scaleSize(32),
        // marginTop: scaleSize(-110),
        // top: scaleSize(-110),
        marginRight: scaleSize(32),
        marginLeft: scaleSize(32)
    },
    projectInfo: {
        display: 'flex',
        flexDirection: 'row'
    },
    projectInfoRight: {
        flex: 1,
        height: scaleSize(186),
        justifyContent: 'space-between'
    },
    projectData: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    projectDataItem: {
        minWidth: scaleSize(103),
        maxWidth: scaleSize(139),
        height: scaleSize(93),
        alignItems: 'center',
        borderRadius: scaleSize(8),
        borderColor: '#CBCBCB',
        borderWidth: scaleSize(1),
        justifyContent: 'space-between',
        paddingVertical: scaleSize(10),
        paddingHorizontal: scaleSize(15)
    },
    projectDataItem_text: {
        color: '#868686',
        fontSize: scaleSize(22)
    },
    projectDataItem_val: {
        color: '#000',
        fontSize: scaleSize(22)
    },
    projectImg: {
        width: scaleSize(240),
        height: scaleSize(186),
        borderRadius: scaleSize(8),
        marginRight: scaleSize(46),
        backgroundColor: '#f8f8f8'
    },
    projectImg_icon: {
        width: '100%',
        height: '100%'
    },
    projectName: {
        fontSize: scaleSize(32),
        color: '#000',
        flex: 1
    },
    times: {
        display: 'flex',
        textAlign: 'right',
        color: '#868686',
        fontSize: scaleSize(22),
        marginBottom: scaleSize(47),
        marginTop: scaleSize(50)
    },
    progress: {
        marginTop: scaleSize(50)
    },
    progressItem: {
        width: '100%',
        height: scaleSize(30),
        marginBottom: scaleSize(44),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    progressItemBg: {
        flex: 1,
        height: scaleSize(30),
        backgroundColor: '#F8F8F8',
        marginRight: scaleSize(30),
        position: 'relative'
    },
    progressItemBtn: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 15
    },
    bubble: {
        width: 'auto',
        height: scaleSize(30),
        position: 'absolute',
        zIndex: 100,
        // top: scaleSize(-30),
        backgroundColor: 'red',
        borderRadius: scaleSize(20),
    },
    bubble_after: {
        width: 0,
        height: 0,
        bottom: 0,
        position: 'absolute',
        borderWidth: scaleSize(10),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'pink',
    },
    progressItemInfo: {
        width: scaleSize(160),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    progressItemLG: {
        height: '100%',
        borderTopRightRadius: scaleSize(100),
        borderBottomRightRadius: scaleSize(100),
    },
    progressItemInfo_left: {
        color: '#868686',
        fontSize: scaleSize(24)
    },
    progressItemInfo_right: {
        color: '#000',
        fontSize: scaleSize(24)
    },
    btn: {
        width: scaleSize(354),
        height: scaleSize(80),
        backgroundColor: '#3AD047',
        borderRadius: scaleSize(50),
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    weiXin: {
        width: scaleSize(45),
        height: scaleSize(45),
        marginRight: scaleSize(5)
    },
    btn_text: {
        fontSize: scaleSize(28),
        color: '#fff'
    }
});