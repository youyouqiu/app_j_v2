import {StyleSheet} from 'react-native';
import {scaleSize} from '@/utils/screenUtil'

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    imgContainer: {
        height: scaleSize(1075),
        width: scaleSize(602),
    },
    pc_carousel: {
        height: scaleSize(1075),
        width: scaleSize(602),
        alignItems: 'center'
    },
    pc_carouselItem: {
        width: scaleSize(602),
        height: scaleSize(1075)
    },
    prevIconLeftWrap: {
        position: 'absolute',
        zIndex: 999,
        left: '2%',
        top: '44%',
        width: scaleSize(40),
        height: scaleSize(40)
    },
    prevIconRightWrap: {
        position: 'absolute',
        zIndex: 999,
        right: '2%',
        top: '44%',
        width: scaleSize(40),
        height: scaleSize(40)
    },
    prevIcon: {
        height: '100%',
        width: '100%'
    },
    carouselControl: {
        alignItems: 'center',
        marginBottom: 20
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,0.15)',
        width: scaleSize(10),
        height: scaleSize(10),
        borderRadius: scaleSize(5),
        margin: 4
    },
    activeDot: {
        backgroundColor: '#fff',
        width: scaleSize(10),
        height: scaleSize(10),
        borderRadius: scaleSize(5),
        margin: 4
    },
    carouselImg: {
        height: '100%',
        width: '100%'
    },
    closeWrapper: {
        alignItems: 'center'
    },
    closeLine: {
        height: scaleSize(40),
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#fff'
    },
    closeIcon: {
        height: scaleSize(80),
        width: scaleSize(80),
        position: 'relative',
        bottom: scaleSize(10)
    }
});

export default styles
