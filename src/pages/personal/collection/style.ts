/**
 * Created by Kary on 2020/05/06 14:22.
 */
import {StyleSheet} from 'react-native'
import {scaleSize} from "@/utils/screenUtil";


export default StyleSheet.create({
    'edit-btn': {
        width: scaleSize(130),
        paddingRight: scaleSize(32),
        paddingVertical: scaleSize(20),
        // backgroundColor: '#f3f3f3'
    },
    'edit-btn-text': {
        fontSize: scaleSize(28),
        color: '#000',
        textAlign: 'right',
    },
    'top-bar': {
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
    },
    'footer-text': {
        marginTop: scaleSize(20),
        marginBottom: scaleSize(20),
        fontSize: scaleSize(24),
        color: '#868686',
        textAlign: 'center'
    },
    'footer': {
        width: '100%',
        height: scaleSize(140),
        borderTopColor: '#EAEAEA',
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingVertical: scaleSize(16),
        paddingHorizontal: scaleSize(32),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    'footer-checkbox': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    'footer-checkbox-text': {
        color: '#000',
        fontSize: scaleSize(32),
        marginLeft: scaleSize(24)
    },
    'checked-img': {
        width: scaleSize(30),
        height: scaleSize(30),
    },
    'container':{
        paddingHorizontal: scaleSize(32),
        flex:1
    }
});

