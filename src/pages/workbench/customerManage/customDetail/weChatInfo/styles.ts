import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

export const dl_styles = StyleSheet.create({
    topView: {
        width: '100%',
        height: scaleSize(80),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFF6E7',
        flexDirection: 'row',
    },
    warnImg: {
        marginLeft: scaleSize(23),
        width: scaleSize(32),
        height: scaleSize(32)
    },
    warnText: {
        color: '#868686',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(16)
    },
    middleLine: {
        width: scaleSize(228),
        height: scaleSize(2),
        backgroundColor: '#EAEAEA'
    },
    loggerView: {
        width: '100%',
        height: scaleSize(140),
        display: 'flex',
        flexDirection: 'row',
        marginLeft: scaleSize(32)
    },
    leftView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(111),
        width: scaleSize(10),
        marginTop: scaleSize(20)
    },
    shadow: {
        height: scaleSize(10),
        width: scaleSize(10),
        backgroundColor: '#3AD047',
        borderRadius: scaleSize(50)
    },
    line: {
        width: scaleSize(2),
        height: scaleSize(130),
        backgroundColor: '#EAEAEA'
    },
    rightView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(44),
    },
    timeText: {
        color: '#CBCBCB',
        fontSize: scaleSize(24),
    },
    text: {
        color: '#4B6AC5',
        fontSize: scaleSize(28)
    },
    moren: {
        color: '#868686',
        fontSize: scaleSize(28),
        marginTop: scaleSize(22),
        width: scaleSize(600)
    },
    morenView: {
        display: 'flex',
        flexDirection: 'column'
    },
    middle: {
        height: scaleSize(33),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleSize(700),
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: scaleSize(20),
        marginTop: scaleSize(20),
        marginLeft: scaleSize(32)
    },
    sectionHeader: {
        height: scaleSize(70),
        lineHeight: scaleSize(70),
        fontSize: scaleSize(24),
        paddingLeft: scaleSize(42),
        backgroundColor: '#F8F8F8',
        marginBottom:scaleSize(20)
    }
});
