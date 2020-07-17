import {scaleSize} from "@/utils/screenUtil";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: '#ffffff',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        paddingBottom: scaleSize(32)
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleBox: {
        height: scaleSize(88),
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        justifyContent: 'center'
    },
    title: {
        color: '#000000',
        fontSize: scaleSize(28),
        fontWeight: 'bold'
    },
    title_reportTime: {
        fontSize: scaleSize(28),
        color: '#868686'
    },
    contentBox: {
        paddingTop: scaleSize(20)
    },
    label: {
        marginRight: scaleSize(16),
        color: '#868686',
        fontSize: scaleSize(28),
        lineHeight:scaleSize(40)
    },
    normalText: {
        color: '#000000',
        fontSize: scaleSize(28),
        lineHeight:scaleSize(40)
    },
    arrow: {
        width: scaleSize(16),
        height: scaleSize(30),
        marginLeft: scaleSize(8)
    },
    titlePre: {
        width: scaleSize(6),
        height: scaleSize(26),
        backgroundColor: '#49A1FF',
        marginRight: scaleSize(21)
    },
    timeIcon: {
        width: scaleSize(26),
        height: scaleSize(26),
        marginRight: scaleSize(8)
    }
});

export default styles
