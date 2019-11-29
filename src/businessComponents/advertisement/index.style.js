import { StyleSheet } from 'react-native';
import { scaleSize } from '@/utils/screenUtil'

export default StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgContainer: {
        height: scaleSize(1075),
        width: scaleSize(602),
    }
});
