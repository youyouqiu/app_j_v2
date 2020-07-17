/**
 * Created by Kary on 2019/12/06 15:37.
 */

import {StyleSheet} from 'react-native'
import {scaleSize} from "../../../../../utils/screenUtil";

export default StyleSheet.create({
    flex_1: {
        flex: 1
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    alignCenter: {
        alignItems: 'center'
    },
    justifyBetween: {
        justifyContent: 'space-between'
    },
    position_relative: {
        position: 'relative',
        zIndex: 8000
    },
    inputCont: {
        position: 'relative',
        height: scaleSize(64),
        overflow: 'visible'
    },
    inputView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: scaleSize(12),
        paddingHorizontal: scaleSize(24),
        height: scaleSize(64)
    },
    inputView_text: {
        color: '#CBCBCB',
        fontSize: scaleSize(28)
    },
    inputView_img: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    textAreaView: {
        // height: scaleSize(253),
        backgroundColor: '#fff',
        paddingHorizontal: scaleSize(12),
        paddingVertical: scaleSize(24)
    },
    textAreaView_textArea: {
        width: '100%',
        height: scaleSize(200)
    },
    textAreaView_tools: {
       height: scaleSize(55),
       justifyContent: 'flex-end',
       flexDirection: 'row',
       alignItems: 'center',
       marginTop: scaleSize(15)
    },
    textAreaView_tools_nums: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginRight: 'auto'
    },
    textAreaView_tools_clear: {
        color: '#868686',
        fontSize: scaleSize(28)
    },
    textAreaView_tools_btn: {
        width: scaleSize(152),
        height: scaleSize(52),
        backgroundColor: '#1F3070',
        // borderWidth: 1,
        // borderColor: '#1F3070',
        borderRadius: scaleSize(26),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: scaleSize(24),
    },
    textAreaView_tools_btn_text: {
        // color: '#1F3070',
        color: '#fff',
        fontSize: scaleSize(28),
    },
    tipsView: {
        position: 'absolute',
        left: scaleSize(40),
        zIndex: 8000
    },
    tipsView_btn: {
        paddingHorizontal: scaleSize(5),
        height: scaleSize(50),
        backgroundColor: '#25A6FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scaleSize(3),
    },
    tipsView_btn_arrow: {
        position: 'absolute',
        width: scaleSize(40),
        height: scaleSize(40),
        top: scaleSize(-40),
        left: scaleSize(30)
    },
    tipsView_text: {
        color: '#FFFFFF',
        fontSize: scaleSize(24)
    },
    tipsView_btn_arrow_em: {
        borderWidth: scaleSize(20),
        position: 'absolute',
        fontSize: 0,
        lineHeight: 0,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: '#25A6FF',
    },
    tipsView_btn_arrow_span: {
        borderWidth: scaleSize(20),
        position: 'absolute',
        fontSize: 0,
        lineHeight: 0,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: '#25A6FF',
        top: scaleSize(3)
    },
    resView: {
        color: '#A58245',
        fontSize: scaleSize(24),
        backgroundColor: '#FBE8C7',
        height: scaleSize(58),
        lineHeight: scaleSize(58),
        textAlign: 'center'
    }
})