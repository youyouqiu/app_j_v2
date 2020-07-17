import {scaleSize} from "@/utils/screenUtil";
import {StyleSheet} from "react-native";

const style = StyleSheet.create({
    wrap: {
        backgroundColor: '#ffffff',
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        paddingBottom: scaleSize(32)
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleBox: {
        height: scaleSize(88),
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        alignItems:'center'
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
        lineHeight: scaleSize(40)
    },
    normalText: {
        color: '#000000',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
        flex: 1
    },
    img: {
        width: scaleSize(217),
        height: scaleSize(217),
        marginTop: scaleSize(24),
        borderRadius: scaleSize(8)
    }
});
export default style
