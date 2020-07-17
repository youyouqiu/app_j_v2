import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";
import baseStyles from "@/utils/baseStyle";

const styles = StyleSheet.create({
    line: {
        width: '100%',
        height: scaleSize(24),
        backgroundColor: 'rgba(248,248,248,1)',
    },
    visitOk: {
        height: scaleSize(90),
        width: scaleSize(750),
        backgroundColor: '#3AD047',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textOk: {
        color: '#FFFFFF',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(15),
    },
    okImg: {
        height: scaleSize(28),
        width: scaleSize(28),
    },
    contentView: {
        width: scaleSize(750),
        display: 'flex',
        flexDirection: 'row',
        padding: scaleSize(32),
    },
    buildingImg: {
        width: scaleSize(240),
        height: scaleSize(186),
        borderRadius: scaleSize(8),
    },
    rightContent: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(39),
    },
    treeName: {
        color: '#000000',
        fontSize: scaleSize(32),
        width: scaleSize(420),
    },
    adressName: {
        color: '#868686',
        fontSize: scaleSize(24),
        marginTop: scaleSize(8),
    },
    statusView: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: scaleSize(20),
    },
    statusImg: {
        height: scaleSize(30),
        width: scaleSize(30),
    },
    statusText: {
        width: scaleSize(64),
        height: scaleSize(33),
        backgroundColor: 'rgba(255,221,216,1)',
        fontSize: scaleSize(22),
        color: 'rgba(254,81,57,1)',
        lineHeight: scaleSize(33),
        borderRadius: scaleSize(2),
        textAlign: 'center',
        marginRight: scaleSize(11),
    },
    zcView: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: scaleSize(32),
        marginRight: scaleSize(32),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: scaleSize(32),
        paddingBottom: scaleSize(29)
    },
    zcName: {
        color: '#000000',
        fontSize: scaleSize(28),
    },
    callView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleSize(175),
        height: scaleSize(55),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(75,106,197,1)',
        borderRadius: scaleSize(8),
    },
    phoneImg: {
        height: scaleSize(30),
        width: scaleSize(30),
    },
    phoneText: {
        color: '#4B6AC5',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(8),
    },
    visitInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(32),
        marginRight: scaleSize(32),
    },
    titleView: {
        borderBottomColor: '#EAEAEA',
        height: scaleSize(88),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        borderBottomWidth: 1,
    },
    titleText: {
        color: '#000000',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
        // flex:1
    },
    timeView: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    firstView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#868686',
        fontSize: scaleSize(28),
        minWidth: scaleSize(127)
    },
    anotherText: {
        color: '#000000',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(16),
    },
    sexImg: {
        height: scaleSize(30),
        width: scaleSize(30),
    },
    picView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: scaleSize(24),
    },
    insteadPic: {
        height: scaleSize(218),
        width: scaleSize(218),
        borderWidth: scaleSize(2),
        borderColor: 'rgba(234,234,234,1)',
        borderRadius: scaleSize(8),
        marginTop: scaleSize(19),
        marginRight: scaleSize(16),
    },
    reportInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: scaleSize(20),
    },
    phones: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: scaleSize(16),
    },
    verticalLine: {
        height: scaleSize(26),
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#979797',
        marginHorizontal: scaleSize(12)
    },
    titleTime: {
        color: '#868686',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
        backgroundColor: '#fff',
        flex: 1
    },
    titleDayWrapper: {
        display: 'flex',
        ...baseStyles.rowCenter
    },
    titleDayLabel: {
        color: '#868686',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(33),
    },
    titleDay: {
        color: '#FE5139',
    },
    itemContainer: {
        width: '100%',
        paddingHorizontal: scaleSize(32),
        backgroundColor: '#fff'
    },
    itemTitleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scaleSize(88),
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    vd_phone_content:{
        width:'100%'
    }
});

export default styles
