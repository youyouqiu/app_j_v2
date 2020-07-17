import {scaleSize} from '../../../utils/screenUtil'

export const styles = {
    wrap:{
        paddingLeft:scaleSize(32),
        paddingRight:scaleSize(32)
    },
    text:{
        color:'#868686',
        fontSize:scaleSize(24),
        lineHeight:scaleSize(40)
    },
    textBig:{
        color:'#000000',
        fontSize:scaleSize(24),
        fontWeight:'bold'
    },
    space:{
        paddingBottom:scaleSize(20)
    },
    center:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}