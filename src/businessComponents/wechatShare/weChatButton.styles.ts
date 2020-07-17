import {Platform, StyleSheet} from 'react-native'
import { scaleSize } from '../../utils/screenUtil'
import { rowCenter, columnCenter } from './styles'
import {Theme} from "@new-space/teaset";

export default StyleSheet.create({
    Wrap: {
        ...columnCenter,
        justifyContent: 'space-around',
        width: scaleSize(100),
        paddingTop: scaleSize(16),
        paddingBottom: Theme.isIPhoneX ? scaleSize(36) : scaleSize(16),
        height: Theme.isIPhoneX ? scaleSize(160) : scaleSize(140),
        alignItems: 'center'
    },
    icon: {
        height: scaleSize(30),
        width: scaleSize(30)
    },
    text: {
        color: '#fff',
        fontSize: scaleSize(24),
        fontWeight: '400',
        lineHeight: scaleSize(33)
    },
    textContainer:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    modalText:{
        textAlign:'center',
        ...Platform.select({
            ios:{
                fontSize: scaleSize(28),
            },
            android:{
                fontSize: scaleSize(26),
            }
        })
    }
})
