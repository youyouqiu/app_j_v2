/**
 * 房源列表单条-业务组件（房源列表）
 * created by join_lu 2019-08-28
 *  */
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {scaleSize} from '../../utils/screenUtil'
import {buildingSaleStatusObj} from "../../utils/utils";

const styles = {
    item: {
        padding: scaleSize(32),
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: scaleSize(1),
        backgroundColor:'#fff'
    },
    projectView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    buildingImg: {
        width: scaleSize(240),
        height: scaleSize(186)
    },
    buildingContent: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: scaleSize(32)
    },
    buildingName: {
        display: 'flex',
        width: scaleSize(414)
    },
    buildingText: {
        fontSize: scaleSize(32),
        fontWeight: 'bold',
        color: '#000000'
    },
    statusView: {
        width: scaleSize(64),
        height: scaleSize(33),
        marginRight: scaleSize(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE1DC'
    },
    statusText: {
        fontSize: scaleSize(22),
    },
    buildingType: {
        backgroundColor: "#F4F5F9",
        color: '#66739B',
        fontSize: scaleSize(22),
        marginLeft: scaleSize(6)
    },
    address: {
        fontSize: scaleSize(24),
        color: '#000000',
        marginTop: scaleSize(16)
    },
    status: {
        marginTop: scaleSize(16),
        flexDirection: 'row',
        alignItems: 'center'
    },
    houseImg: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    areaText: {
        fontSize: scaleSize(24),
        marginLeft: scaleSize(12)
    },
    priceView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: scaleSize(5)
    },
    priceText: {
        flex:1,
        color: '#FE5139',
        fontSize: scaleSize(36),
    },
    shopNum: {
        color: '#000000',
        fontSize: scaleSize(24),
    },
    shu: {
        color: '#EAEAEA',
        marginLeft: scaleSize(100),
        alignItems: 'center'
    }
};

const BuildingItem = (props) => {
    let {name, saleStatus, areaFullName, minPrice, maxPrice, shopsStock, writeShopsNumber, gotoProjectDetail} = props;
    let {maxArea, minArea, buildingType, buildingId, buildingTreeId} = props;
    let areaText = minArea + '㎡ - ' + maxArea + '㎡';
    let priceText = minPrice + ' - ' + maxPrice + '万';
    let shopNum = shopsStock + '/' + writeShopsNumber + '房源';
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.item} onPress={() => gotoProjectDetail(buildingId, buildingTreeId)}>
            <View style={styles.projectView}>
                <Image defaultSource={require('../../images/defaultImage/default_2.png')} source={{uri:props.icon}} style={styles.buildingImg}/>
                <View style={styles.buildingContent}>
                    <View style={styles.buildingName}>
                        <Text numberOfLines={1} style={[styles.buildingText]}>{name}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.address}>
                        <Text>{areaFullName}</Text>
                        <Text style={styles.shu}>&nbsp;|&nbsp;</Text>
                        <Text style={styles.areaText}>{areaText}</Text>
                    </Text>
                    <View style={styles.status}>
                        <Text style={[styles.statusText, buildingSaleStatusObj[saleStatus].style]}>
                            &nbsp;{buildingSaleStatusObj[saleStatus].text || ''}&nbsp;
                        </Text>
                        <Text style={styles.buildingType}>&nbsp;{buildingType}&nbsp;</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.priceText} numberOfLines={1}>{priceText}</Text>
                        <Text style={styles.shopNum}>{shopNum}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default BuildingItem
