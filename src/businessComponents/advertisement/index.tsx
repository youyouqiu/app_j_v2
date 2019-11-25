import React, { FC } from 'react'
import { StyleSheet, Image, View, Text, ImageBackground, ImageSourcePropType, TouchableOpacity } from 'react-native'
import { scaleSize, } from '../../utils/screenUtil'
import Modal from 'react-native-modal'
import { connect, MapStateToProps } from 'react-redux'

interface StateToProps {
    visible?: boolean,
}

interface AdvertisementProps {
    img?: ImageSourcePropType,
    onPress?: () => void
}

const Advertisement: FC<AdvertisementProps & StateToProps> = ({
    visible = false,
    img = {},
    onPress = () => { },
    ...others
}) => {

    const handleSwipeComplete = () => {
        global.store.dispatch({ type: 'config/controlADVisible' })
    }

    return (
        <Modal
            isVisible={visible}
            onSwipeComplete={handleSwipeComplete}
            swipeDirection={'up'}
            style={{ margin: 0 }}
            animationIn={'fadeInDown'}
            animationInTiming={600}
            backdropOpacity={0.85}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            {...others}
        >
            <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.layoutView}>
                <ImageBackground source={img} style={{ height: '100%', width: '100%' }} />
                <TouchableOpacity style={styles.XWrap} onPress={handleSwipeComplete}>
                    <Image source={require('../../images/icons/close2.png')} style={{ height: scaleSize(60), width: scaleSize(60) }} />
                </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.bodyView}>
                <Image source={require('../../images/icons/up3.png')} style={{ height: scaleSize(100), width: scaleSize(100) }} />
                <Text style={{ fontSize: scaleSize(28), color: '#fff', marginTop: scaleSize(33) }}>上划关闭广告</Text>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    layoutView: {
        width: '100%',
        height: '80%',
    },
    bodyView: {
        alignItems: 'center',
        flex: 1,
        paddingTop: scaleSize(40),
    },
    XWrap: {
        position: 'absolute',
        top: scaleSize(80),
        right: scaleSize(30),
        padding: scaleSize(40)
    }
})

const mapStateToProps: MapStateToProps<StateToProps, AdvertisementProps, any> = ({ config }) => {
    return ({
        visible: config.ADVisible,
    })
};

export default connect(mapStateToProps)(Advertisement)