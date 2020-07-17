import { StyleSheet } from 'react-native';
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
    backdrop: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    layout: {
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: scaleSize(8)
    },
    titleWrap: {
        width: '100%',
        paddingHorizontal: scaleSize(42),
        paddingVertical: scaleSize(24),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: scaleSize(32),
        fontWeight: '600',
        color: '#4D4D4D',
        textAlign: 'center'
    },
    footerWrap: {
        flexDirection: 'row',
        width: '100%',
        height: scaleSize(87),
        borderTopWidth: scaleSize(2),
        borderColor: '#EAEAEA'
    },
    footerItem: {
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTextBase: {
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
        color: '#4D4D4D'
    },
    toastView: {
        borderRadius: scaleSize(8),
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: scaleSize(15)
    }
});
