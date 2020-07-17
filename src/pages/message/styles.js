import {scaleSize} from '../../utils/screenUtil'
import { StyleSheet } from 'react-native'

export const newsStyles = {
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    column:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
    noticeView: {
        height: scaleSize(90),
        paddingHorizontal: scaleSize(32),
        alignItems: 'center',
        backgroundColor: '#F4F5F9'
        // backgroundColor: 'red'
    },
    noticeViewBtn: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(8)
    },
    noticeViewBtnImg: {
        width: '100%',
        height: '100%'
    },
    noticeViewText: {
        color: '#1F3070',
        fontSize: scaleSize(24)
    },
    openNoticeBtn: {
        width: scaleSize(150),
        height: scaleSize(60),
        backgroundColor: '#fff',
        borderRadius: scaleSize(4),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#1F3070',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    openNoticeBtnText: {
        color: '#1F3070',
        fontSize: scaleSize(26)
    },
    newsBox:{
        width:'100%',
        height:scaleSize(167),
        borderColor:'#EAEAEA',
        borderBottomWidth:1,
        paddingLeft:scaleSize(32),
        paddingRight:scaleSize(32)
    },
    listIcon:{
        width:scaleSize(100),
        height:scaleSize(100),
        marginRight:scaleSize(32),
        position:'relative'
    },
    cleanUp: {
        marginLeft: scaleSize(10),
        paddingBottom: scaleSize(5)
    },
    cleanUpImage: {
        width:scaleSize(40),
        height:scaleSize(40),
    },
    marker:{
        justifyContent:'center',
        width:scaleSize(40),
        height:scaleSize(40),
        borderRadius:scaleSize(20),
        backgroundColor: '#FE5139',
        borderColor:'#fff',
        borderWidth:scaleSize(3),
        marginLeft: scaleSize(10)
    },
    markerText:{
        color:'#fff',
        fontSize:scaleSize(16)
    },
    markerImage: {
        width: '100%',
        height: '100%'
    },
    text:{
        color:'#000000',
        fontSize:scaleSize(32),
        fontWeight:'bold'
    },
    timeText:{
        color:'#CBCBCB',
        fontSize:scaleSize(24)
    },
    contentText:{
        color:'#868686',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        fontSize:scaleSize(28)
    },
    flagBox:{
        justifyContent:'center',

        paddingLeft:scaleSize(8),
        paddingRight:scaleSize(8),
        paddingTop:scaleSize(4),
        paddingBottom:scaleSize(4),
        marginRight:scaleSize(8),
        backgroundColor:'#FFE1DC',
        borderRadius:scaleSize(4)
    },
    flagText:{
        color:'#FE5139',
        fontSize:scaleSize(24)
    },
    wranWrap:{
        paddingLeft:scaleSize(32),
        paddingRight:scaleSize(32),
        paddingTop:scaleSize(32),
        paddingBottom:scaleSize(32),
        marginBottom:scaleSize(24),
        backgroundColor:'#fff',
    },
    warnIcon:{
        width:scaleSize(40),
        height:scaleSize(40),
        marginRight:scaleSize(11),
    },
    titleWrap:{
        backgroundColor:'#F7F7F7',
        height:scaleSize(84),
        justifyContent:'center'
    },
    titleText:{
        color:'#868686',
        fontSize:scaleSize(24)
    },
    rightTime:{
        color:'#CBCBCB',
        fontSize:scaleSize(24)
    },
    numText:{
        color:'#4B6AC5',
        fontSize:scaleSize(28)
    },
    nameText:{
        color:'#FE5139',
        fontSize:scaleSize(28)
    },
    litlePre:{
        width:scaleSize(64),
        height:scaleSize(40),
        borderRadius:scaleSize(4),
        justifyContent:'center',
        marginRight:scaleSize(16)
    },
    userIcon:{
        width:scaleSize(100),
        height:scaleSize(100),
        borderRadius: scaleSize(50),
        marginRight:scaleSize(20)
    },
    unRead:{
        width:scaleSize(14),
        height:scaleSize(14),
        backgroundColor:'#FE5139',
        borderRadius:scaleSize(7),
        marginLeft:scaleSize(5),
        marginBottom:scaleSize(25)
    },
    numberView: {
        justifyContent:'center',
        position: 'absolute',
        zIndex: 9,
        minWidth: scaleSize(40),
        minHeight: scaleSize(40),
        backgroundColor: '#FB5742',
        paddingLeft: 2,
        paddingRight: 2,
        borderRadius: scaleSize(40),
        right:-10,
        top:-10,
    }
}

