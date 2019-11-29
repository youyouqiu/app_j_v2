import {scaleSize} from '../../../utils/screenUtil'

export const styles = {
    singListWrap:{
        width:scaleSize(686),
        height:scaleSize(282),
        borderColor:'#CBCBCB',
        borderWidth:1,
        borderRadius:scaleSize(8),
        paddingLeft:scaleSize(24),
        paddingRight:scaleSize(24),
        // marginTop:scaleSize(32),
        marginLeft:scaleSize(32),
        backgroundColor:'#ffffff'
    },
    listTop:{
        width:scaleSize(638),
        height:scaleSize(81),
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:'#EAEAEA',
    },
    codeText:{
        color:'#868686',
        fontSize:scaleSize(24)
    },
    timeIcon:{
        width:scaleSize(26),
        height:scaleSize(26),
        marginRight:scaleSize(8)
    },
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
    listBottom:{
        width:scaleSize(638),
        height:scaleSize(200),
        flex:1,
        justifyContent:'space-between'
    },
    buildIcon:{
        width:scaleSize(30),
        height:scaleSize(30),
        marginRight:scaleSize(8)
    },
    buildName:{
        width:scaleSize(473),
        color:'#000000',
        fontSize:scaleSize(30),
        fontWeight:'bold'
    },
    buildCode:{
        width:scaleSize(460),
        color:'#868686',
        fontSize:scaleSize(28),
        paddingLeft:scaleSize(3)
    },
    buildType:{
        backgroundColor:'#F4F5F9',
        borderRadius:scaleSize(2),
        paddingLeft:scaleSize(8),
        paddingRight:scaleSize(8),
        paddingTop:scaleSize(4),
        paddingBottom:scaleSize(4)
    },
    typeText:{
        color:'#66739B',
        fontSize:scaleSize(22)
    },
    sexBox:{
        width:scaleSize(30),
        height:scaleSize(30),
        marginRight:scaleSize(9),
        justifyContent:'center',
        borderRadius:scaleSize(4),
        lineHeight:scaleSize(30)
    },
    sexText:{
        color:'#ffffff',
        fontSize:scaleSize(22)
    },
    name:{
        color:'#000000',
        fontSize:scaleSize(26),
        marginRight:scaleSize(8),
    },
    level:{
        color:'#000000',
        fontSize:scaleSize(24),
        marginRight:scaleSize(19),
        fontWeight:'bold'
    },
    resultIcon:{
        width:scaleSize(130),
        height:scaleSize(130),
    },
    subscriptTime:{
        color:'#868686',
        fontSize:scaleSize(20),
        marginRight:scaleSize(9),
    }
}


