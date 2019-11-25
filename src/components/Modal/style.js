import {scaleSize} from '../../utils/screenUtil'
import {StyleSheet} from 'react-native'

export const modalStyles = {
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    titleBox:{
        justifyContent:'center',
        paddingBottom:scaleSize(32),
    },
    bottomLine: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#868686'
    },
    title:{
        color:'#4D4D4D',
        fontSize:scaleSize(30),
        fontWeight:'bold',
        justifyContent:'center',
        minWidth:scaleSize(420),
        maxWidth: '95%',
        textAlign:'center'
    },
    close:{
        width:scaleSize(40),
        height:scaleSize(40)
    },
    modalBg:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:'#000000AA'
    },
    modalContent:{
        backgroundColor:'#fff',
        borderRadius:scaleSize(24),
        paddingTop:scaleSize(40)
    },
    footerWrap:{
        height: scaleSize(140),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerOne:{
        width:scaleSize(270),
        height:scaleSize(74),
        backgroundColor:'#1F3070',
        borderRadius:scaleSize(44),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:'0px 6px 10px 0px rgba(31,48,112,0.45)'
    },
    closeText:{
        color:'#FFFFFF',
        fontSize:scaleSize(28)
    },
    footerCancel:{
        width:scaleSize(244),
        height:scaleSize(72),
        borderRadius:scaleSize(44),
        borderColor:'#CBCBCB',
        borderWidth:scaleSize(1),
        backgroundColor:'#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:'0px 6px 10px 0px rgba(31,48,112,0.24)'
    },
    confirmBtn:{
        backgroundColor:'#1F3070',
        boxShadow:'0px 6px 10px 0px rgba(31,48,112,0.45)',
        marginLeft:scaleSize(20)
    },
    cancelText:{
        color:'#000000',
        fontSize:scaleSize(28)
    },
    confirmFooter:{
        height:scaleSize(90),
        boxShadow:'0px -1px 0px 0px rgba(203,203,203,1)',
        borderColor:'#CBCBCB',
        borderTopWidth:scaleSize(1)
    },
    confirmCancel:{
        width:'45%',
        height:scaleSize(88),
        borderColor:'#EAEAEA',
        backgroundColor:'#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:'0px 6px 10px 0px rgba(31,48,112,0.24)'
    },
    selectWrap:{
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: scaleSize(8)
    },
    selectOne:{
        width:'100%',
        height:scaleSize(109),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectFooter:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:scaleSize(100)
    },
    selectOneText:{
        color:'#868686',
        fontSize:scaleSize(28)
    },
    selectedOne:{
        backgroundColor:'#F5F8FF',
        borderColor:'#C7D5FF',
        borderTopWidth:scaleSize(1),
        borderBottomWidth:scaleSize(1)
    },
    selectedOneText:{
        color:'#000000',
        fontSize:scaleSize(32),
        fontWeight:'bold'
    },
    multiBox:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:scaleSize(146),
        height:scaleSize(51),
        backgroundColor:'#F8F8F8',
        borderRadius:scaleSize(2),
        marginTop:scaleSize(32),
        marginLeft:scaleSize(32),
        position:'relative'

    },
    multiSelected:{
        borderColor:'#1F3070',
        borderWidth:scaleSize(1),
        backgroundColor:'#fff'
    },
    multiIconBox:{
        position:'absolute',
        bottom:0,
        right:0
    },
    multiIcon:{
        width:scaleSize(21),
        height:scaleSize(23),
    },
    closeImage: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    closable: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 9,
        padding: scaleSize(25)
    }
}