import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

export const clStyle = StyleSheet.create({
    cusDetail: {
        height: scaleSize(165),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        borderTopColor: '#EAEAEA',
        borderTopWidth: 1,
        backgroundColor: '#FFFFFF',
    },
    leftView: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(32)
    },
    nameView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    nameText: {
        fontSize: scaleSize(32),
        color: '#000000',
        marginLeft: scaleSize(7),
        fontWeight: '500'
    },
    manView: {
        height: scaleSize(45),
        borderRadius: scaleSize(8),
        borderWidth: 1,
        borderColor: '#CBCBCB',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    grade: {
        width: scaleSize(35),
        height: scaleSize(30),
        marginLeft: scaleSize(8)
    },
    phoneView: {
        marginTop: scaleSize(16)
    },
    phone: {
        color: '#868686',
        fontSize: scaleSize(32)
    },
    moreLoading:{
        marginTop: scaleSize(30),
        marginBottom: scaleSize(30)
    },
    more: {
        color: '#868686',
        fontSize: scaleSize(24),
        width: '100%',
        textAlign: 'center',
        marginTop: scaleSize(30),
        marginBottom: scaleSize(30)
    }
});
