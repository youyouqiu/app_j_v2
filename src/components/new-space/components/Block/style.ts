import {StyleSheet} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'

export default StyleSheet.create({
    content: {
        width: '100%',
        padding: scaleSize(24),
        backgroundColor: '#fff',
        borderRadius: scaleSize(8)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleSize(32)
    },
    title: {
        marginLeft: scaleSize(12),
        fontSize: scaleSize(24),
        color: '#000000',
        lineHeight: scaleSize(33),
        fontWeight: '500'
    }
})