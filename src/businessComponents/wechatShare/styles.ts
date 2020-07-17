import { StyleSheet, ViewStyle } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'

const rowCenter : ViewStyle = { flexDirection: 'row', alignItems: 'center' }
const columnCenter : ViewStyle = { flexDirection: 'column', alignItems: 'center' }

const styles = StyleSheet.create({
    layout: {
        ...rowCenter,
        justifyContent: 'space-between',
    },
    avator: {
        width: scaleSize(50),
        height: scaleSize(50),
        borderRadius: scaleSize(25),
        borderStyle: 'solid',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#FFFFFF'
    },
    textOnAvatorRight: {
        fontSize: scaleSize(27),
        fontWeight: '400',
        lineHeight: scaleSize(38)
    }
})

export default styles
export { rowCenter, columnCenter }
