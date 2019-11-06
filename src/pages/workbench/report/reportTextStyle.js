import {StyleSheet} from 'react-native';

// 工具
import {scaleSize} from '../../../utils/screenUtil';

export const STYLE = StyleSheet.create({
    inputWarp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleSize(32),
    },
    textWarp: {
        width: scaleSize(70),
        height: scaleSize(70),
        borderColor: 'rgba(203,203,203,1)',
        borderWidth: scaleSize(2),
        backgroundColor: 'rgba(255,255,255,1)',
        textAlign: 'center',
        lineHeight: scaleSize(70),
    },
    inputYesBorder: {
        borderColor: 'rgba(31,48,112,1)',
    },
    inputNoBorder: {
        borderColor: 'rgba(203,203,203,1)',
    },
})
