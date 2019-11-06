import styles from '../styles';
import {Image, Modal, Platform, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {connect} from 'react-redux';
import projectService from '../../../../services/projectService';
import {Carousel} from 'teaset';
import {buildingSaleStatusObj} from '../../../../utils/utils';
import {deviceWidth} from '../../../../utils/screenUtil';
import ImageViewer from "react-native-image-zoom-viewer";

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

    componentDidMount() {
        this.getFiles();
    }

    getFiles = async () => {
        const {requestUrl, buildingTreeId, getFiles} = this.props;
        const response = await projectService.filesReq(requestUrl.api, buildingTreeId);
        this.setState({files: response.extension});
        getFiles && getFiles(response.extension || [])
    };

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

    render() {
        const {onLayout, detailInfo} = this.props;
        const {files, imageViewerVisible, imageViewerIdx} = this.state;
        const {saleStatus} = detailInfo;
        let images = [];
        let renderCarousel = <Image style={styles.headerImage} source={defaultSource}/>;
        if (files.length > 0) {
            renderCarousel = (
                <Carousel style={{height: 550 * deviceWidth / 750}}>
                    {files.map((item, idx) => {
                        images.push({url: item.small});
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => this.imageViewerToggle(idx)} key={idx}>
                                <Image style={styles.headerImage} defaultSource={defaultSource} resizeMode='cover' source={{uri: item.small}}/>
                            </TouchableOpacity>
                        )
                    })}
                </Carousel>
            )
        }

        let renderStatus = null;
        if (saleStatus) {
            renderStatus =
                <Text style={[styles.addressLabel, buildingSaleStatusObj[saleStatus].style]}>
                    &nbsp;{buildingSaleStatusObj[saleStatus].text}&nbsp;
                </Text>;
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
                                {renderStatus}
                                <Text style={styles.headerAddress}>&nbsp;{detailInfo.areaFullName}</Text>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={gotoMap} style={styles.headerMapWrap}>
                            <Image style={styles.headerMap} source={require('../../../../images/icons/map.png')}/>
                            <Text style={styles.headerMapLabel}>地图</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerBottom}>
                        <View style={styles.headerBottomItem}>
                            <Text style={styles.bottomItemPrice}>
                                {detailInfo.minPrice}
                                <Text style={styles.bottomItemPriceUnit}>～</Text>
                                {detailInfo.maxPrice}
                                <Text style={styles.bottomItemPriceUnit}>万</Text>
                            </Text>
                            <Text style={styles.bottomItemLabel}>参考价格</Text>
                        </View>
                        <Text style={styles.headerBottomItemDivision}/>
                        <View style={styles.headerBottomItem}>
                            <Text style={styles.bottomItemValue}>{detailInfo.shops}</Text>
                            <Text style={styles.bottomItemLabel}>总套数</Text>
                        </View>
                        <Text style={styles.headerBottomItemDivision}/>
                        <View style={styles.headerBottomItem}>
                            <Text style={styles.bottomItemValue}>{detailInfo.buildingType}</Text>
                            <Text style={styles.bottomItemLabel}>类型</Text>
                        </View>
                    </View>
                </View>
                <Modal visible={imageViewerVisible} transparent={true} onRequestClose={this.imageViewerToggle} animationType='fade'>
                    <ImageViewer imageUrls={images} index={imageViewerIdx} saveToLocalByLongPress={false} onClick={this.imageViewerToggle}/>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = ({config, point}) => {
    return {
        requestUrl: config.requestUrl,
        sendPoint: point.buryingPoint
    }
};
export default connect(mapStateToProps)(DetailInfo)
