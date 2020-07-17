import {Image, Text, View} from "react-native";
import styles from "@/pages/workbench/searchBuilding/searchBuilding/styles";
import React, {useState} from "react";
// @ts-ignore
import MultiSlider from "@ptomasroos/react-native-multi-slider";

/**
 * @author: zxs
 * @date: 2020/5/8
 */
interface PriceSliderPropsType {
    onValuesChange?: (params: { minUnitPrice: number, maxUnitPrice: number }) => void
}

export const minUnitPriceConstant = 0;
export const maxUnitPriceConstant = 5;

const defaultState = {
    sliderLength: 0,
    minUnitPriceConstant: minUnitPriceConstant,
    maxUnitPriceConstant: maxUnitPriceConstant,
    minUnitPrice: 0,
    maxUnitPrice: 200,
    priceLabel: ''
};

const PriceSlider = ({onValuesChange}: PriceSliderPropsType) => {

    const [state, setState] = useState(()=>({
        ...defaultState,
        priceLabel:`${defaultState.minUnitPrice}-${defaultState.maxUnitPrice}万`
    }));

    const budgetOnLayout = (event: any) => {
        setState({...state, sliderLength: event.nativeEvent.layout.width})
    };

    const _onValuesChange = (e: Array<number>) => {
        const minUnitPrice = parseFloat((e[0] / 10 * state.maxUnitPriceConstant * 100).toFixed(0));
        const maxUnitPrice = parseFloat((e[1] / 10 * state.maxUnitPriceConstant * 100).toFixed(0));
        let priceLabel = minUnitPrice + '-' + maxUnitPrice + '万';
        let _minUnitPrice = minUnitPrice;
        let _maxUnitPrice = maxUnitPrice;
        if (e[1] === maxUnitPriceConstant * 2) {
            _minUnitPrice = maxUnitPriceConstant;
            _maxUnitPrice = 99999;
            priceLabel = '大于500万'
        }
        onValuesChange && onValuesChange({minUnitPrice: _minUnitPrice, maxUnitPrice: _maxUnitPrice});
        setState({...state, priceLabel, minUnitPrice, maxUnitPrice,});
    };

    return (

        <View style={styles.sb_budget}>
            <Text style={styles.budget}>您的预算:
                <Text style={styles.budgetText}> {state.priceLabel}</Text>
            </Text>
            <View style={styles.sb_multiSlider_wrap} onLayout={budgetOnLayout}>
                <MultiSlider
                    selectedStyle={{backgroundColor: '#4B6AC5'}}
                    unselectedStyle={{backgroundColor: '#EAEAEA'}}
                    values={[state.minUnitPrice * 2 / 100, state.maxUnitPrice * 2 / 100]}
                    onValuesChange={_onValuesChange}
                    step={0.01}
                    isMarkersSeparated={true}
                    customMarkerLeft={() => (
                        <View style={styles.sb_customMarker_left}>
                            <Image style={styles.sb_customMarker} source={require('../../../../images/icons/sliderBtn.png')}/>
                        </View>
                    )}
                    customMarkerRight={() => (
                        <View style={styles.sb_customMarker_right}>
                            <Image style={styles.sb_customMarker} source={require('../../../../images/icons/sliderBtn.png')}/>
                        </View>
                    )}
                    markerOffsetY={4}
                    sliderLength={state.sliderLength}
                    containerStyle={{height: 50}}
                    markerStyle={{height: 12, width: 12}}
                    trackStyle={{borderRadius: 5, height: 10}}
                    markerContainerStyle={{height: 50}}/>
            </View>
            <View style={styles.sb_multiSlider_text}>
                <Text style={styles.sb_multiSlider_value}>0</Text>
                <Text style={styles.sb_multiSlider_value}>500万</Text>
            </View>
        </View>
    )
};

export default PriceSlider
