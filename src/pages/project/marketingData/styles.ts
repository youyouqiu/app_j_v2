import {StyleSheet} from "react-native";
import {scaleSize} from "../../../utils/screenUtil";

export default StyleSheet.create({
    md_wrapper: {
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32)
    },
    md_header: {
        fontSize: scaleSize(26),
        color: '#000',
        backgroundColor: '#eee',
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(20)
    },
    md_listItem: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        paddingBottom: scaleSize(24),
        paddingTop: scaleSize(24),
        height: scaleSize(132)
    },
    md_icon: {
        width: scaleSize(70),
        height: scaleSize(70)
    },
    md_right: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: scaleSize(26)
    },
    md_dataLeft: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    md_name: {
        fontSize: scaleSize(28),
        paddingRight:scaleSize(20),
        flex: 1
    },
    md_time: {
        fontSize: scaleSize(24),
        color: '#868686'
    },
    md_size: {
        fontSize: scaleSize(24),
        color: '#868686'
    },
    md_rightIcon: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    md_loadingWrap: {
        height: scaleSize(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    md_loadingText:{
        color:'#b2b2b2'
    }
});

