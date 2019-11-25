import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Carousel} from 'teaset';
import React from 'react';
import {deviceWidth, scaleSize} from '../../../utils/screenUtil';
import {CONSTANT} from "../../../constants";
import Theme from "teaset/themes/Theme";


const ProjectCarousel = ({BROKER_HOME_TOP = [], advertisementDetail}) => {
    const defaultSource = require('../../../images/defaultImage/default_3.png');
    let renderCarousel = null;
    if (BROKER_HOME_TOP.length === 0) {
        renderCarousel = <Image style={styles.pc_carouselItem} resizeMode='cover' source={defaultSource}/>;
    } else {
        renderCarousel = (
            <Carousel control={true} style={styles.pc_carousel} control={
                <Carousel.Control
                    style={{alignItems: 'center', marginBottom: 20}}
                    dot={<View style={{backgroundColor: 'rgba(0,0,0,0.15)', width:scaleSize(10),height:scaleSize(10),borderRadius: scaleSize(5), margin: 4}}></View>}
                    activeDot={<View style={{backgroundColor: '#fff', width:scaleSize(10),height:scaleSize(10),borderRadius: scaleSize(5), margin: 4}}></View>}
                />
            }>
                {BROKER_HOME_TOP.map((item, idx) => (
                    <TouchableOpacity key={idx} activeOpacity={1} onPress={() => advertisementDetail ? advertisementDetail(item,CONSTANT.SOURCE.CAROUSEL) : null}>
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
    }
});
