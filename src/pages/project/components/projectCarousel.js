import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Carousel} from '@new-space/teaset';
import React from 'react';
import {deviceWidth, scaleSize} from '../../../utils/screenUtil';
import {CONSTANT} from "../../../constants";
import Theme from "@new-space/teaset/themes/Theme";

let carouselRef = React.createRef();
const ProjectCarousel = ({BROKER_HOME_TOP = [], advertisementDetail}) => {
    const defaultSource = require('../../../images/defaultImage/default_3.png');
    let renderCarousel;
    if (BROKER_HOME_TOP.length === 0) {
        renderCarousel = <Image style={styles.pc_carouselItem} resizeMode='cover' source={defaultSource}/>;
    } else {
        const dotContent = <View style={styles.pc_carouseDot}/>;
        const activeDotContent = <View style={styles.pc_carouseActiveDot}/>;

        const controlContent = (
            <Carousel.Control
                style={styles.pc_carouseControl}
                dot={dotContent}
                activeDot={activeDotContent}
            />
        );
        renderCarousel = (
            <Carousel ref={ref => carouselRef = ref} style={styles.pc_carousel} control={controlContent}>
                {BROKER_HOME_TOP.map((item, idx) => (
                    <TouchableOpacity key={idx} activeOpacity={1}
                                      onPress={() => advertisementDetail ? advertisementDetail(item, CONSTANT.SOURCE.CAROUSEL) : null}>
                        <Image style={styles.pc_carouselItem} resizeMode='cover' defaultSource={defaultSource} source={{uri: item.cover}}/>
                    </TouchableOpacity>
                ))}
            </Carousel>
        )
    }
    return renderCarousel
};

export default ProjectCarousel


const styles = StyleSheet.create({
    pc_carousel: {
        height: scaleSize(344) + Theme.statusBarHeight,
        width: deviceWidth,
        alignItems: 'center'
    },
    pc_carouselItem: {
        width: deviceWidth,
        height: scaleSize(344) + Theme.statusBarHeight
    },
    pc_carouseDot: {
        backgroundColor: 'rgba(0,0,0,0.15)',
        width: scaleSize(10),
        height: scaleSize(10),
        borderRadius: scaleSize(5),
        margin: 4
    },
    pc_carouseActiveDot: {
        backgroundColor: '#fff',
        width: scaleSize(10),
        height: scaleSize(10),
        borderRadius: scaleSize(5),
        margin: 4
    },
    pc_carouseControl: {
        alignItems: 'center',
        marginBottom: 20
    }
});
