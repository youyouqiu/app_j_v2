import React, { FC } from 'react'
import { View, Modal, Image, ImageSourcePropType, TouchableOpacity, Text, StyleSheet } from 'react-native'
import styles from './index.style'
import { connect, MapStateToProps } from 'react-redux'
import { scaleSize } from '@/utils/screenUtil'


// interface StateToProps {
//     visible: boolean,
// }
// interface AdvertisementProps {
//     img?: ImageSourcePropType,
//     onPress?: () => void,
//     opacity?: number
// }

// const Advertisement: FC<AdvertisementProps & StateToProps> = ({
//     opacity = .85,
//     img = {},
//     onPress = () => { },
//     visible = false
// }) => {
//     const handleClose = () => {
//         global.store.dispatch({ type: 'config/controlADVisible' })
//     }

//     return <Modal visible={visible} transparent={true} animationType='none'>
//         <View style={[styles.backdrop, { backgroundColor: `rgba(0,0,0,${opacity})` }]} >
//             {/* img */}
//             <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.imgContainer}>
//                 <Image source={img} style={{ height: '100%', width: '100%' }} />
//             </TouchableOpacity>
//             {/* close */}
//             <View style={{ alignItems: 'center' }}>
//                 {/* line */}
//                 <View style={{ height: scaleSize(40), width: StyleSheet.hairlineWidth, backgroundColor: '#fff' }} ></View>
//                 {/* icon */}
//                 <TouchableOpacity onPress={handleClose}>
//                     <Image source={require('../../images/icons/close2.png')} style={{ height: scaleSize(80), width: scaleSize(80), position: 'relative', bottom: scaleSize(10) }} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     </Modal >
// }

// const mapStateToProps: MapStateToProps<StateToProps, AdvertisementProps, any> = ({ config }) => {
//     return ({
//         visible: config.ADVisible,
//     })
// };

// export default connect(mapStateToProps)(Advertisement)


interface StateToProps {
    visible: boolean,
}
interface AdvertisementProps {
    img?: ImageSourcePropType,
    onPress?: () => void,
    opacity?: number
}

class Advertisement extends React.Component {

    handleClose = () => {
        global.store.dispatch({ type: 'config/controlADVisible' })
    }

    render() {
        const { visible = false, opacity = .85, onPress = () => { }, img = {} } = this.props
        return (
            <Modal visible={visible} transparent={true} animationType='none'>
                <View style={[styles.backdrop, { backgroundColor: `rgba(0,0,0,${opacity})` }]} >
                    {/* img */}
                    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.imgContainer}>
                        <Image source={img} style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                    {/* close */}
                    <View style={{ alignItems: 'center' }}>
                        {/* line */}
                        <View style={{ height: scaleSize(40), width: StyleSheet.hairlineWidth, backgroundColor: '#fff' }} ></View>
                        {/* icon */}
                        <TouchableOpacity onPress={this.handleClose}>
                            <Image source={require('../../images/icons/close2.png')} style={{ height: scaleSize(80), width: scaleSize(80), position: 'relative', bottom: scaleSize(10) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        )
    }
}

const mapStateToProps: MapStateToProps<StateToProps, AdvertisementProps, any> = ({ config }) => {
    return ({
        visible: config.ADVisible,
    })
};

export default connect(mapStateToProps)(Advertisement)
