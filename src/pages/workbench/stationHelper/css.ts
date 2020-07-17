/**
 * Created by Kary on 2019/09/06 15:07.
 */
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { scaleSize } from "../../../utils/screenUtil";
import baseStyles from "@/utils/baseStyle";
export default StyleSheet.create({
    flex: {
        display: 'flex'
    },
    bold: {
        fontWeight: '500'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    alignCenter: {
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    center: {
        alignItems: 'center',
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
        borderBottomWidth: 1,
        borderTopWidth: 1,
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
        flexWrap: 'nowrap',
        flexDirection: 'row',
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20),
        marginTop: scaleSize(50),
        marginBottom: scaleSize(40)
    },
    dataViewItem: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        paddingLeft: scaleSize(30),
        flex: 1
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
        width: 1,
        height: scaleSize(33),
        backgroundColor: '#EAEAEA',
        // marginRight: scaleSize(34),
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
        borderWidth: 1,
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
        fontWeight: '500'
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
        height: scaleSize(80),
        backgroundColor: '#3AD047',
        borderRadius: scaleSize(8),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingRight:scaleSize(12),
        paddingLeft:scaleSize(12)
    },
    btnStatistics: {
        backgroundColor: '#4B6AC5',
    },
    btnCopyReportWrapper:{
      flex:1,
      ...baseStyles.rowCenter
    },
    btnCopyReport:{
        // flex:1,
        backgroundColor:'#64B7FE'
    },
    btnShare:{
    },
    weiXin: {
        width: scaleSize(40),
        height: scaleSize(40),
        marginRight: scaleSize(5)
    },
    btn_text: {
        fontSize: scaleSize(26),
        color: '#fff'
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectMain: {
        padding: scaleSize(32),
        width: 'auto',
        backgroundColor: '#fff'
    },
    projectMainImage: {
        width: scaleSize(240),
        height: scaleSize(186)
    },
    stationPage: {
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    projectRight: {
        marginLeft: scaleSize(24),
        justifyContent: 'space-between'
    },
    projectAddress: {
        fontSize: scaleSize(24),
        color: '#CBCBCB'
    },
    projectFooter: {
        flex: 1,
        marginTop: scaleSize(50),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    projectFooterItem: {
        justifyContent: 'space-between',
        height: scaleSize(108),
        alignItems: 'center',
        // backgroundColor: 'red',
        flex: 1,
        width: '33%'
    },
    projectLabel: {
        fontSize: scaleSize(24),
        color: '#CBCBCB'
    },
    stationContent: {
        padding: scaleSize(32)
    },
    block: {
        marginTop: scaleSize(24)
    },
    'container': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#4c4c4c',
    },
    'background': {
        width: scaleSize(750),
        height: scaleSize(1623),
        backgroundColor: '#fff',
    },
    'button-view': {
        position: 'absolute',
        // bottom: scaleSize(120),
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    'button': {
        width: '100%',
        height: '100%',
        /*backgroundColor: 'rgba(255, 255, 255, 0.07)',
        paddingTop: scaleSize(26),
        paddingBottom: scaleSize(26),
        paddingLeft: scaleSize(112),
        paddingRight: scaleSize(112),
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: scaleSize(8),*/
    },
    'text': {
        color: '#FFF',
        fontSize: scaleSize(32),
        lineHeight: scaleSize(45),
    },
});
