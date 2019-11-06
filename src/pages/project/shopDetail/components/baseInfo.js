import React, {useEffect, useState} from "react";
import {Image, Modal, Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles";
import {Carousel} from "teaset";
import {checkBlank} from "../../buildingDetail/components/baseInfo";
import {shopSaleStatusObj, shopStatusObj} from "../../../../utils/utils";
import projectService from "../../../../services/projectService";
import ImageViewer from "react-native-image-zoom-viewer";

const defaultSource = require('../../../../images/pictures/building_def.png');
export default ({baseInfo = {}, shop_category_obj, shopId = '', requestUrl = {}}) => {
    const [carousel, setCarousel] = useState([]);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [imageViewerIdx, setImageViewerIdx] = useState(0);
    useEffect(() => {
        (async () => {
            const response = await projectService.queryFilesReq(requestUrl.api, shopId);
            setCarousel(response.extension)
        })();
    }, [shopId]);

    const imageViewerToggle = (idx) => {
       if(Platform.OS === 'android'){
           if (!imageViewerVisible) {
               StatusBar.setBarStyle('light-content', true);
               StatusBar.setBackgroundColor('#000', true);
           } else {
               StatusBar.setBarStyle('dark-content', true);
               StatusBar.setBackgroundColor('rgba(255,255,255,0)', true);
           }
       }
        setImageViewerVisible(!imageViewerVisible);
        setImageViewerIdx(typeof idx === "number" ? idx : 0);
    };

    let images = [];
    let renderCarousel = <Image source={defaultSource} style={styles.bd_carouselImage}/>;
    if (carousel.length > 0) {
        renderCarousel = (
            <Carousel style={{height: 238}}>
                {carousel.map((item, idx) => {
                    images.push({url: item.small});
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => imageViewerToggle(idx)} key={idx}>
                            <Image defaultSource={defaultSource} style={styles.bd_carouselImage} source={{uri: item.small}}/>
                        </TouchableOpacity>

                    )
                })}
            </Carousel>
        );
    }

    const area = baseInfo.houseArea + '㎡/' + baseInfo.buildingArea + '㎡';
    const shopStatus = (baseInfo.status && shopStatusObj[baseInfo.status]) || {};
    const shopSaleStatus = (baseInfo.saleStatus && shopSaleStatusObj[baseInfo.saleStatus]) || {};

    return (
        <View style={styles.bd_subWrapper}>
            {renderCarousel}
            <View style={styles.bd_subContainer}>
                <View style={styles.bd_titleContent}>
                    <Text style={styles.bd_title} numberOfLines={1}>{baseInfo.name}</Text>
                    <Text style={styles.bd_type}>{shopStatus.text}</Text>
                    <Text style={[styles.bd_status, shopSaleStatus.style]}>{shopSaleStatus.text}</Text>
                </View>
                <View style={styles.bd_priceAndArea}>
                    <LabelItem text={baseInfo.totalPrice + '万'} label='参考总价' textStyle={styles.bd_priceText} style={styles.bd_priceItem}/>
                    <Separator/>
                    <LabelItem text={area} label='套内/建面' textStyle={styles.bd_areaText} style={styles.bd_areaItem}/>
                </View>
                <View style={styles.bd_otherInfo}>
                    <LabelItem text={checkBlank(shop_category_obj[baseInfo.shopCategory])} label='类型'/>
                    <Separator/>
                    <LabelItem text={checkBlank(baseInfo.height, 'm')} label='层高'/>
                    <Separator/>
                    <LabelItem text={checkBlank(baseInfo.width, 'm')} label='面宽'/>
                    <Separator/>
                    <LabelItem text={checkBlank(baseInfo.depth, 'm')} label='进深'/>
                    <Separator/>
                    <LabelItem text={checkBlank(baseInfo.toward)} label='朝向'/>
                </View>
            </View>
            <Modal visible={imageViewerVisible} transparent={true} onRequestClose={imageViewerToggle} animationType='fade'>
                <ImageViewer imageUrls={images} index={imageViewerIdx} saveToLocalByLongPress={false} onClick={imageViewerToggle}/>
            </Modal>
        </View>
    )
}

const LabelItem = ({text, label, style, textStyle, labelStyle}) => {
    return (
        <View style={[styles.bd_labelItem, style]}>
            <Text style={[styles.bd_labelItemText, textStyle]} numberOfLines={1}>{text}</Text>
            <Text style={[styles.bd_labelItemType, labelStyle]} numberOfLines={1}>{label}</Text>
        </View>
    )
};

const Separator = () => {
    return <Text style={styles.bd_separator}/>
};
