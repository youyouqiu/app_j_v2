import {scaleSize} from "@/utils/screenUtil";
import {StyleSheet} from "react-native";

 const styles = StyleSheet.create({
    duiIcon: {
        width: scaleSize(31),
        height: scaleSize(31),
        marginRight: scaleSize(16)
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    topBox: {
        height: scaleSize(88),
        backgroundColor: '#3AD047',
        justifyContent: 'center'
    },
    topText: {
        color: '#ffffff',
        fontSize: scaleSize(24)
    },
    label: {
        color: '#868686',
        fontSize: scaleSize(28)
    },
    normalText: {
        color: '#000000',
        fontSize: scaleSize(28)
    },
    padding: {
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(32),
        backgroundColor: '#ffffff'
    },
    buildImg: {
        width: scaleSize(240),
        height: scaleSize(186),
        marginRight: scaleSize(39),
        borderRadius: scaleSize(8)
    },
    stateText: {
        fontSize: scaleSize(22),
        color: '#3AD047',
    },
    buildName: {
        width: scaleSize(406),
        color: '#000000',
        fontSize: scaleSize(32),
        fontWeight: 'bold',
    },
    buildCode: {
        width: scaleSize(487),
        color: '#868686',
        fontSize: scaleSize(24),
        paddingBottom: scaleSize(16),
        paddingTop: scaleSize(8)
    },
    baseInfo: {
        // height:scaleSize(272),
        alignItems: 'flex-start',
        paddingTop: scaleSize(24),
        paddingBottom: scaleSize(24)
    },
    statusBox: {
        width: scaleSize(64),
        height: scaleSize(33),
        borderRadius: scaleSize(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleSize(3)
    },
    buildType: {
        backgroundColor: '#F4F5F9',
        borderRadius: scaleSize(2),
        paddingLeft: scaleSize(8),
        paddingRight: scaleSize(8),
        paddingTop: scaleSize(4),
        paddingBottom: scaleSize(4)
    },
    typeText: {
        color: '#66739B',
        fontSize: scaleSize(22)
    },
});

 export default styles
