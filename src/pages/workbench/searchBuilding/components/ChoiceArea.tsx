import styles from "../searchBuilding/styles";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {scaleSize} from "@/utils/screenUtil";
import baseStyles from "../../../../utils/baseStyle";
import {Toast} from 'teaset'

let defaultSelectArea: any = {
    city: '',
    cityName: '',
    district: '',
    districtName: '',
    area: [],
    showText: []
};

const checkbox_checked = require('../../../../images/icons/checkbox_checked.png');
const checkbox_normal = require('../../../../images/icons/checkbox_normal.png');
const area_open = require('../../../../images/icons/arrowOpen.png');
const area_close = require('../../../../images/icons/arrowClosed.png');
let _temporaryArea: any = {};


const ChoiceArea = (props: any) => {

    const {global, dispatch, config, areaSubmit, user, location} = props;

    let areaRef: any = React.createRef();
    let districtRef: any = React.createRef();

    const {buildingCityScreen,} = global;
    const {cityList} = location;
    const _public = config.requestUrl.public;
    const cityCode = location.locationCityCode || (user.userInfo || {}).city || location.conversionCode;
    const cityName = location.locationCityName || (user.userInfo || {}).cityName || location.conversionName;
    defaultSelectArea.city = cityCode;
    defaultSelectArea.cityName = cityName;
    defaultSelectArea.showText = [cityName];

    const [areaVisible, setAreaVisible] = useState(false);
    const [selectArea, setSelectArea] = useState({...defaultSelectArea});
    const [temporaryArea, setTemporaryArea] = useState({...defaultSelectArea});

    useEffect(() => {
        getBuildingCityScreenByCityCode(cityCode);
    }, [cityCode]);

    const getBuildingCityScreenByCityCode = (_cityCode: any) => {
        dispatch({
            type: 'global/getBuildingCityScreenByCityCode',
            payload: {_public, code: _cityCode}
        })
    };

    const getCityList = () => {
        dispatch({
            type: 'location/getCityList',
        })
    };

    cityList.length === 0 && getCityList();


    const areaVisibleToggle = (type?: string) => {
        if (type === 'open') {
            setAreaVisible(!areaVisible);
            setTemporaryArea(selectArea);
            return
        } else if (type === 'submit') {
            setSelectArea({...temporaryArea});
            const {city, district, area, showText} = temporaryArea;
            const _district = district.includes('_0') ? '' : district;
            const _area = area.filter((item: any) => {
                return !item.includes('_0');
            });
            areaSubmit && areaSubmit({city, _district, _area, showText});
        } else if (type === 'cancel') {
            setSelectArea(defaultSelectArea);
            setTemporaryArea(defaultSelectArea)
        } else {
            setTemporaryArea(selectArea)
        }
        setAreaVisible(!areaVisible);
    };

    const areaOnchange = ({code, name}: any, type: string) => {
        _temporaryArea = temporaryArea;
        const {city, cityName, district, districtName, area, showText} = temporaryArea;
        if (type === 'city') {
            _temporaryArea = {
                ..._temporaryArea,
                city: code,
                cityName: name,
                district: '',
                districtName: '',
                area: [],
                showText: [name]
            };
            getBuildingCityScreenByCityCode(code);
            districtRef.scrollTo({x: 0, y: 0, animated: false});
        } else if (type === 'district') {
            if (code.includes('_0')) {
                _temporaryArea = {
                    city: city,
                    cityName: cityName,
                    district: code,
                    districtName: name,
                    area: [],
                    showText: [cityName]
                };
            } else {
                _temporaryArea = {
                    city: city,
                    cityName: cityName,
                    district: code,
                    districtName: name,
                    area: [],
                    showText: [name]
                };
            }
            getBuildingCityScreenByCityCode(code);
            areaRef.scrollTo({x: 0, y: 0, animated: false});
        } else if (type === 'area') {
            if (area.includes(code)) {
                const idx = area.indexOf(code);
                area.splice(idx, 1);
                showText.splice(idx, 1);
                _temporaryArea = {
                    city,
                    cityName,
                    district,
                    districtName: districtName,
                    area,
                    showText
                }
            } else {
                if (!code.includes('_0') && area.length >= 5) {
                    Toast.message('最多可选5个区域');
                    return
                }
                let _area: any = [];
                let _showText: any = [];
                if (code.includes('_0')) {
                    _area = [code];
                    _showText = [districtName];
                } else {
                    _area = [...area, code].filter((item: any) => {
                        if (!item.includes('_0')) return true
                    });
                    _showText = [...showText, name].filter((item: any) => {
                        if (item !== districtName) return true
                    });
                }
                _temporaryArea = {
                    ..._temporaryArea,
                    city, district,
                    area: _area,
                    showText: _showText
                }
            }
        }
        setTemporaryArea(_temporaryArea);
    };
    return (
        <View style={styles.sb_areaWrapper}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => areaVisibleToggle('open')} style={styles.sb_location}>
                <Image style={styles.sb_locationIcon} source={require('../../../../images/icons/map.png')}/>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <Text numberOfLines={1} style={styles.sb_locationLabel}>
                        {selectArea.showText.length > 0 ? (
                            selectArea.showText.map((item: any, idx: any) => (
                                <Text style={{flex: 1}}>{item}{idx < selectArea.showText.length - 1 ? '，' : ''}</Text>
                            ))
                        ) : '不限'}
                    </Text>
                </View>
                <Image source={areaVisible ? area_open : area_close} style={styles.sb_areaArrow}/>
            </TouchableOpacity>
            {areaVisible ? (
                <TouchableOpacity style={[styles.sb_modalContainer]} onPress={() => areaVisibleToggle()} activeOpacity={1}>
                    <View style={styles.sb_scrollViewWrapper}>

                        {/*一级*/}
                        <ScrollView style={styles.sb_scrollView_left} key={0}
                                    nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {cityList.map((item: any) => (
                                <TouchableOpacity activeOpacity={0.8}
                                                  onPress={() => areaOnchange(item, 'city')}
                                                  style={styles.sb_cityLeft}>
                                    <Text style={[
                                        styles.sb_cityLeftDivision,
                                        temporaryArea.city === item.code ? styles.sb_cityLeftDivision_selected : null
                                    ]}/>
                                    <Text style={[
                                        styles.sb_cityLeftText,
                                        temporaryArea.city === item.code ? styles.sb_cityLeftText_selected : null
                                    ]}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/*二级*/}
                        <ScrollView style={styles.sb_scrollView_left} key={1} ref={ref => districtRef = ref}
                                    nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {(buildingCityScreen[temporaryArea.city] || []).map((item: any) => (
                                <TouchableOpacity activeOpacity={0.8}
                                                  onPress={() => areaOnchange(item, 'district')}
                                                  style={styles.sb_cityLeft}>
                                    <Text style={[
                                        styles.sb_cityLeftDivision,
                                        temporaryArea.district === item.code ? styles.sb_cityLeftDivision_selected : null
                                    ]}/>
                                    <Text style={[
                                        styles.sb_cityLeftText,
                                        temporaryArea.district === item.code ? styles.sb_cityLeftText_selected : null
                                    ]}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/*三级*/}
                        <ScrollView ref={ref => areaRef = ref} style={styles.sb_scrollView_right} key={2}
                                    nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            {(buildingCityScreen[temporaryArea.district] || []).map((item: any) => (
                                <TouchableOpacity activeOpacity={0.8}
                                                  onPress={() => areaOnchange(item, 'area')}
                                                  style={styles.sb_cityLeft}>
                                    <Text style={[
                                        styles.sb_cityLeftText,
                                        temporaryArea.district === item.code ? styles.sb_cityLeftText_selected : null
                                    ]}>{item.name}</Text>
                                    <Image source={temporaryArea.area.includes(item.code) ? checkbox_checked : checkbox_normal}
                                           style={styles.sb_checkboxIcon}/>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                    </View>
                    <View style={styles.sb_modalFooter}>
                        <View style={styles.sb_modalFooterContent}>

                            {temporaryArea.showText.length > 0 ? (
                                <View style={styles.sb_footerSelectContent}>
                                    <View style={{height: scaleSize(40), ...baseStyles.rowCenter}}>
                                        <Text style={styles.sb_footerSelectLabel}>已选</Text>
                                    </View>
                                    {temporaryArea.showText.map((item: string, idx: number) => (
                                        <View style={styles.sb_footerSelectItem} key={idx}>
                                            <Text style={styles.sb_footerSelectText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            ) : null}

                            <View style={styles.sb_footerBtnGroup}>
                                <TouchableOpacity style={[styles.sb_cancelBtn, styles.sb_btnBase]} onPress={() => areaVisibleToggle('cancel')}>
                                    <Text style={styles.sb_cancelBtnText}>清 空</Text>
                                </TouchableOpacity>
                                <View style={styles.sb_footerDivision}/>
                                <TouchableOpacity style={[styles.sb_configBtn, styles.sb_btnBase]} onPress={() => areaVisibleToggle('submit')}>
                                    <Text style={styles.sb_configBtnText}>确 定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </TouchableOpacity>
            ) : null}
        </View>
    )
};

const mapStateToProps = (props: any) => {
    const {config, global, user, location} = props;
    return {config, global, user, location}
};

export default connect(mapStateToProps)(ChoiceArea)
