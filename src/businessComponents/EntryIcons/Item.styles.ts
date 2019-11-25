import {StyleSheet} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'

export default StyleSheet.create({
    'wrapper': {
        width: scaleSize(126),
        alignItems: 'center',
    },
    imgWrap: {
        marginBottom: scaleSize(24),
    },
    'img': {
        width: scaleSize(80),
        height: scaleSize(80),

    },
    'text': {
        color: '#000',
        fontSize: scaleSize(24),
        lineHeight: scaleSize(33),
    },
    lock: {
        width: scaleSize(23),
        height: scaleSize(23),
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 0
    }
})
