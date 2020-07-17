import React, {FC, useEffect, useState} from 'react'
import {View, Modal, Image, ImageSourcePropType, TouchableOpacity, Text, StyleSheet} from 'react-native'
import styles from './styles'
import {connect, MapStateToProps} from 'react-redux'
import {scaleSize} from '@/utils/screenUtil'
import {Carousel} from '@new-space/teaset';
import BuryingPoint, {BehaviorLog} from "@/utils/BuryPoint";
import {IAdvertisementDetailType} from "@/pages/main/types/mainTypes";
import {CONSTANT} from "@/constants";

interface StateToProps {
    visible: boolean,
}

interface AdvertisementProps {
    imgSource?: ImageSourcePropType,
    fullScreenList?: Array<any>,
    onPress?: (a: any) => void,
    opacity?: number,
    fullScreenListRandom: number,
    advertisementDetail: (params: IAdvertisementDetailType, source: number, target?: string) => void
}

const carouselProps = {
    carousel: false,
    startIndex: 0,
    cycle: false,
    style: styles.pc_carousel
};

let carouselRef: any = React.createRef();

const Advertisement: FC<AdvertisementProps & StateToProps> = ({
                                                                  onPress = (item: any) => null,
                                                                  fullScreenList = [],
                                                                  advertisementDetail,
                                                                  fullScreenListRandom
                                                              }) => {

    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setVisible(true);
    }, [fullScreenListRandom]);

    const onChange = (index: number) => {
        setActiveIndex(index);
    };

    const gotoPage = (i: number) => {
        carouselRef && carouselRef.scrollToPage(activeIndex + i, true)
    };

    const handleClose = () => {
        setVisible(false);
        const params: BehaviorLog = {
            page: '开屏广告',
            target: '关闭',
            action: 'click',
            action_param: {
                id: fullScreenList[activeIndex].id,
                adName: fullScreenList[activeIndex].adName
            }
        };
        BuryingPoint.add(params);
    };

    const _advertisementDetail = (data: IAdvertisementDetailType) => {
        handleClose();
        advertisementDetail && advertisementDetail(data, CONSTANT.SOURCE.FULL_SCREEN, '开屏广告');
    };

    return (
        <Modal visible={visible} transparent={true} animationType='fade'>
            <View style={styles.backdrop}>

                {activeIndex === 0 ? null : (
                    <TouchableOpacity onPress={() => gotoPage(-1)} style={styles.prevIconLeftWrap}>
                        <Image style={styles.prevIcon} source={require('../../images/icons/prev_white.png')}/>
                    </TouchableOpacity>
                )}

                {activeIndex == fullScreenList.length - 1 ? null : (
                    <TouchableOpacity onPress={() => gotoPage(1)} style={styles.prevIconRightWrap}>
                        <Image style={styles.prevIcon} source={require('../../images/icons/next_white.png')}/>
                    </TouchableOpacity>
                )}

                <Carousel ref={(element: any) => carouselRef = element} {...carouselProps} onChange={onChange}>
                    {fullScreenList.map((v, idx) => (
                        <TouchableOpacity key={idx} onPress={() => _advertisementDetail(v)} activeOpacity={1} style={styles.imgContainer}>
                            <Image source={{uri:v.cover}} style={styles.carouselImg}/>
                        </TouchableOpacity>
                    ))}
                </Carousel>

                <View style={styles.closeWrapper}>
                    <View style={styles.closeLine}/>
                    <TouchableOpacity onPress={handleClose} activeOpacity={0.9}>
                        <Image source={require('../../images/icons/close2.png')} style={styles.closeIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const mapStateToProps: MapStateToProps<StateToProps, AdvertisementProps, any> = ({config}) => {
    return ({
        visible: config.ADVisible,
    })
};

export default connect(mapStateToProps)(Advertisement)
