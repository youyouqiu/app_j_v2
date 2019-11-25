import styles from '../styles';
import {Image, Modal, Platform, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {connect} from 'react-redux';
import {Carousel} from 'teaset';
import {deviceWidth} from '../../../../utils/screenUtil';
import ImageViewer from "react-native-image-zoom-viewer";
import buildJson from '../buildJson'
import {Label} from '../../../../components/new-space'

const SaleStatus = Label.SaleStatus
const defaultSource = require('../../../../images/pictures/building_def.png');

class DetailInfo extends React.Component {

    constructor(props) {
        super();
        this.state = {
            files: [],
            detailInfo: props.detailInfo,
            imageViewerVisible: false,
            imageViewerIdx: 0
        }
    }

    imageViewerToggle = (idx) => {
        if (Platform.OS === 'android') {
            if (!this.state.imageViewerVisible) {
                StatusBar.setBarStyle('light-content', true);
                StatusBar.setBackgroundColor('#000', true);
            } else {
                StatusBar.setBarStyle('dark-content', true);
                StatusBar.setBackgroundColor('rgba(255,255,255,0)', true);
            }
        }
        this.setState(prevState => ({
            imageViewerVisible: !prevState.imageViewerVisible,
            imageViewerIdx: typeof idx === "number" ? idx : 0
        }))
    };

    gotoPhotos = () => {
        const {navigation, buildingTreeId, detailInfo} = this.props
        navigation.navigate('buildingDetailPhotos', {
            buildingId: buildingTreeId,
            buildingName: detailInfo.fullName,
        })
    }

    render() {
        const {onLayout, detailInfo, buildingDetail = {}} = this.props;
        console.log('detailInfo',detailInfo);
        let {treeCategory, treeProjectSpecial, basicInfo, imageCount, images: files = []} = buildingDetail
        let buildJsonInfo = buildJson[treeCategory] || {}
        const {imageViewerVisible, imageViewerIdx} = this.state;
        const {saleStatus} = detailInfo;
        let images = [];
        let renderCarousel = <Image style={styles.headerImage} source={defaultSource}/>;
        if (files.length > 0) {
            renderCarousel = (
                <View>
                    <Carousel control style={{height: 550 * deviceWidth / 750}}>
                        {files.map((item, idx) => {
                            images.push({url: item.images.ORIGINAL});
                            return (
                                <TouchableOpacity activeOpacity={1} onPress={() => this.imageViewerToggle(idx)} key={idx}>
                                    <Image style={styles.headerImage} defaultSource={defaultSource} resizeMode='cover' source={{uri: item.images.MEDIUM}}/>
                                </TouchableOpacity>
                            )
                        })}
                    </Carousel>
                    {imageCount > files.length && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles['more-photos']}
                            onPress={this.gotoPhotos}
                        >
                            <Text style={styles['more-photos-text']}>{`+${imageCount}`}</Text>
                            <Text style={styles['more-photos-text']}>更多相册</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )
        }
        const gotoMap = () => {
            this.props.navigation.navigate('baiduMap', {name: detailInfo.fullName, address: detailInfo.areaFullName, ...detailInfo.coordinate})
            this.props.sendPoint.add({target: '地图_button', page: '房源-房源详情'})
        };
        return (
            <View style={styles.header} onLayout={onLayout}>
                {renderCarousel}
                <View style={styles.headerContent}>
                    <View style={styles.headerContentTop}>
                        <View style={styles.headerTitleWrap}>
                            <Text style={styles.headerTitle}>{detailInfo.fullName}</Text>
                            <View style={styles.addressWrap}>
                                <SaleStatus _key={saleStatus}/>
                                <Label _key={buildJsonInfo.buildCategoryType}/>
                                {/* <Text style={styles.headerAddress}>&nbsp;{detailInfo.areaFullName}</Text> */}
                                {treeProjectSpecial.map(item => {
                                    return <Label style={{marginBottom: 3}} _key={item}/>
                                })}
                            </View>
                        </View>
                    </View>
                    <View style={styles.headerBottom}>
                        <View style={styles.headerBottomItem}>
                            <Text
                                style={styles.bottomItemValue}>{buildingDetail.writeShopsNumber ? `${buildingDetail.shopsStock || 0}/${buildingDetail.writeShopsNumber || 0}套` : '暂无数据'}</Text>
                            <Text style={styles.bottomItemLabel}>在售/总套数</Text>
                        </View>
                        <Text style={styles.headerBottomItemDivision}/>
                        <View style={styles.headerBottomItem}>
                            <Text style={styles.bottomItemPrice}>
                                {detailInfo.maxPrice ? `${detailInfo.minPrice || 0} ~ ${detailInfo.maxPrice || 0}` : '暂无数据'}
                                {detailInfo.maxPrice ? <Text style={styles.bottomItemPriceUnit}>万</Text> : ''}
                            </Text>
                            <Text style={styles.bottomItemLabel}>参考价格</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={gotoMap} style={[styles.flexRow, styles.address]}>
                        <View style={styles.flexRow}>
                            <Image style={styles.addressImg} source={require('../../../../images/icons/map.png')}/>
                            <Text numberOfLines={1}
                                  style={styles.addressText}>{` ${(basicInfo.areaFullName || '').replace(/-/g, '')}-${basicInfo.address || ''}`}</Text>
                        </View>
                        <Image style={styles.addressChoose} source={require('../../../../images/icons/chose.png')}/>
                    </TouchableOpacity>

                </View>
                <Modal visible={imageViewerVisible} transparent={true} onRequestClose={this.imageViewerToggle} animationType='fade'>
                    <ImageViewer imageUrls={images} index={imageViewerIdx} saveToLocalByLongPress={false} onClick={this.imageViewerToggle}/>
                </Modal>
            </View>
        )
    }
}

export const ProjectBlockItem = (props) => {
    if (props.type === 'space-between') {
        return <TouchableOpacity activeOpacity={0.9} onPress={props.onPress} style={[styles.project_block_item, {justifyContent: 'space-between'}]}>
            <View style={styles.project_block_item_left}>
                {
                    props.icon
                        ?
                        <Image style={styles.project_block_item_icon} source={props.icon}/>
                        :
                        null
                }
                <Text style={styles.project_block_item_text}>{props.text || ''}</Text>
            </View>

            {
                typeof (props.right) === 'function'
                    ?
                    props.right()
                    :
                    <Image style={styles.project_block_item_rightIcon} source={props.rightIcon || require('../../../../images/icons/chose.png')}/>
            }
        </TouchableOpacity>
    }
    return <TouchableOpacity activeOpacity={0.9} onPress={props.onPress} style={styles.project_block_item}>
        {
            props.icon
                ?
                <Image style={styles.project_block_item_icon} source={props.icon}/>
                :
                null
        }
        <Text style={styles.project_block_item_text}>{props.text || ''}</Text>
        {
            props.right
                ?
                props.right
                :
                <Image style={styles.project_block_item_rightIcon} source={props.rightIcon || require('../../../../images/icons/chose.png')}/>
        }
    </TouchableOpacity>
}

const mapStateToProps = ({config, point}) => {
    return {
        requestUrl: config.requestUrl,
        sendPoint: point.buryingPoint
    }
};
export default connect(mapStateToProps)(DetailInfo)
