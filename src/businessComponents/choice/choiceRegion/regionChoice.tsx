/**
 * @author: zxs
 * @date: 2020/5/11
 */
import styles from "../styles";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {IRegionChoicePropsType, IRegionType} from "@/businessComponents/choice/choiceRegion/types";
import request from "@/utils/request";
import {Toast} from "@new-space/teaset";
import {scaleSize} from "@/utils/screenUtil";
import baseStyles from "@/utils/baseStyle";

let defaultSelectArea: IRegionType = {
    city: '',
    cityName: '',
    district: '',
    districtName: '',
    area: [],
    areaName: [],
    regionText: []
};

const checkbox_checked = require('../../../images/icons/checkbox_checked.png');
const checkbox_normal = require('../../../images/icons/checkbox_normal.png');

const RegionChoice = ({
                          global,
                          dispatch,
                          projectLocation,
                          location,
                          regionSelectedValues = {} as IRegionType,
                          showTopCity = true,
                          onChange
                      }: IRegionChoicePropsType) => {

    let areaRef: any = React.createRef();
    let districtRef: any = React.createRef();


    const {buildingCityScreen,} = global;
    const {cityList} = location;
    const cityCode = projectLocation.cityCode || projectLocation.defaultCityCode;
    const cityName = projectLocation.cityName || projectLocation.defaultCityName;

    const [currentSelectArea, setCurrentSelectArea] = useState(() => {
        let state: IRegionType = {
            ...defaultSelectArea,
            city: cityCode,
            cityName: cityName,
            regionText:[cityName]
        };
        if (Object.keys(regionSelectedValues).length > 0) {
            state = regionSelectedValues
        }
        return state
    });

    /**
     * 相当于componentWillReceiveProps,在regionSelectedValues变化时执行，同时初始化时也要执行
     */
    useEffect(() => {
        if (Object.keys(regionSelectedValues).length > 0) {
            setCurrentSelectArea(regionSelectedValues)
        }
    }, [regionSelectedValues]);

    useEffect(() => {
        getBuildingCityScreenByCityCode(cityCode);
    }, [cityCode]);

    useEffect(() => {
        cityList.length === 0 && dispatch({type: 'location/getCityList',})
    }, []);


    const getBuildingCityScreenByCityCode = (_cityCode: any) => {
        dispatch({
            type: 'global/getBuildingCityScreenByCityCode',
            payload: {_public: request.getUrl().public, code: _cityCode}
        })
    };

    const areaOnchange = ({code, name}: { code: string, name: string }, type: string) => {
        const _currentSelectArea: IRegionType = {
            city: '',
            cityName: '',
            district: '',
            districtName: '',
            area: [],
            areaName: [],
            regionText: []
        };
        if (type === 'city') {
            _currentSelectArea.city = code;
            _currentSelectArea.cityName = name;
            _currentSelectArea.regionText = [name];
            getBuildingCityScreenByCityCode(code);
            districtRef.scrollTo({x: 0, y: 0, animated: false});
        } else if (type === 'district') {
            const {city, cityName} = currentSelectArea;
            _currentSelectArea.city = city;
            _currentSelectArea.cityName = cityName;
            _currentSelectArea.district = code;
            _currentSelectArea.districtName = name;
            _currentSelectArea.regionText = code.includes('_0') ? [cityName] : [name];
            getBuildingCityScreenByCityCode(code);
            areaRef.scrollTo({x: 0, y: 0, animated: false});
        } else if (type === 'area') {
            const {city, cityName, district, districtName} = currentSelectArea;
            _currentSelectArea.city = city;
            _currentSelectArea.cityName = cityName;
            _currentSelectArea.district = district;
            _currentSelectArea.districtName = districtName;
            if (currentSelectArea.area.includes(code)) {
                const {area, areaName} = currentSelectArea;
                const idx = area.indexOf(code);
                area.splice(idx, 1);
                areaName.splice(idx, 1);
                _currentSelectArea.area = area;
                _currentSelectArea.areaName = areaName;
                _currentSelectArea.regionText = areaName;
                if (currentSelectArea.area.length === 0){
                    _currentSelectArea.regionText = [districtName];
                }
                setCurrentSelectArea(_currentSelectArea)
            } else if (!code.includes('_0') && currentSelectArea.area.length >= 5) {
                Toast.message('最多可选5个区域');
                return
            } else if (code.includes('_0')) {
                _currentSelectArea.area = [code];
                _currentSelectArea.regionText = [districtName]
            } else {
                const _area = currentSelectArea.area.filter((v) => !v.includes('_0'));
                const _areaName = currentSelectArea.areaName.filter((v: any) => v !== districtName);
                _currentSelectArea.area = [..._area, code];
                _currentSelectArea.areaName = [..._areaName, name];
                _currentSelectArea.regionText = [..._areaName, name]
            }
        }
        setCurrentSelectArea(_currentSelectArea);
        onChange && onChange(_currentSelectArea)
    };

    return (
        <View style={styles.sb_areaWrapper}>
            <View style={styles.sb_scrollViewWrapper}>

                {/*一级*/}
                {showTopCity ? (
                    <ScrollView style={styles.sb_scrollView_left} key={0}
                                nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                        {cityList.map((item: any) => (
                            <TouchableOpacity activeOpacity={0.8}
                                              onPress={() => areaOnchange(item, 'city')}
                                              style={styles.sb_cityLeft}>
                                <Text style={[
                                    styles.sb_cityLeftDivision,
                                    currentSelectArea.city === item.code ? styles.sb_cityLeftDivision_selected : null
                                ]}/>
                                <Text style={[
                                    styles.sb_cityLeftText,
                                    currentSelectArea.city === item.code ? styles.sb_cityLeftText_selected : null
                                ]}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : null}

                {/*二级*/}
                <ScrollView style={styles.sb_scrollView_left} key={1} ref={ref => districtRef = ref}
                            nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    {(buildingCityScreen[currentSelectArea.city] || []).map((item: any) => (
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => areaOnchange(item, 'district')}
                                          style={styles.sb_cityLeft}>
                            <Text style={[
                                styles.sb_cityLeftDivision,
                                currentSelectArea.district === item.code ? styles.sb_cityLeftDivision_selected : null
                            ]}/>
                            <Text style={[
                                styles.sb_cityLeftText,
                                currentSelectArea.district === item.code ? styles.sb_cityLeftText_selected : null
                            ]}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/*三级*/}
                <ScrollView ref={ref => areaRef = ref} style={styles.sb_scrollView_right} key={2}
                            nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    {(buildingCityScreen[currentSelectArea.district] || []).map((item: any) => (
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => areaOnchange(item, 'area')}
                                          style={styles.sb_cityLeft}>
                            <Text style={[
                                styles.sb_cityLeftText,
                                currentSelectArea.district === item.code ? styles.sb_cityLeftText_selected : null
                            ]}>{item.name}</Text>
                            <Image source={currentSelectArea.area.includes(item.code) ? checkbox_checked : checkbox_normal}
                                   style={styles.sb_checkboxIcon}/>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
            <View style={styles.sb_modalFooter}>
                <View style={styles.sb_modalFooterContent}>

                    {currentSelectArea.regionText.length > 0 && (
                        <View style={styles.sb_footerSelectContent}>
                            <View style={{height: scaleSize(40), ...baseStyles.rowCenter}}>
                                <Text style={styles.sb_footerSelectLabel}>已选</Text>
                            </View>
                            {currentSelectArea.regionText.map((item: string, idx: number) => (
                                <View style={styles.sb_footerSelectItem} key={idx}>
                                    <Text style={styles.sb_footerSelectText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
};

const mapStateToProps = (props: any) => {
    const {config, global, user, projectLocation, location} = props;
    return {config, global, user, projectLocation, location}
};

export default connect(mapStateToProps)(RegionChoice)

