import styles from "@/businessComponents/choice/styles";
import {findNodeHandle, Image, Modal, Platform, Text, TouchableOpacity, UIManager, View} from "react-native";
import ChoiceFooter from "@/businessComponents/choice/components/choiceFooter";
import React, {useMemo, useState, useEffect} from "react";
import {IRegionChoiceModalStateType, IRegionType} from "@/businessComponents/choice/choiceRegion/types";
import {connect} from "react-redux";
import {scaleSize} from "@/utils/screenUtil";
import {Theme} from "@new-space/teaset";

/**
 * @author: zxs
 * @date: 2020/5/11
 */
const more_close = require('../../../images/icons/more_close.png');
const more_open = require('../../../images/icons/more_open.png');

const defaultState = {
  visible: false,
  label: '',
  regionSelectedValues: {},
} as IRegionChoiceModalStateType;
let layoutY = 0;
const RegionChoiceModal = ({
                             label,
                             content,
                             regionSelectedValues,
                             projectLocation,
                             onConfirm,
                             onReset
                           }: any) => {

  let viewRef: any = useMemo(() => React.createRef(), []);

  const [state, setState] = useState(() => ({
    ...defaultState,
    regionSelectedValues,
    label,
  }));

  const screenModalToggle = () => {
    const node = findNodeHandle(viewRef);
    UIManager.measure(node!, (x, y, width, height, pageX, pageY) => {
      layoutY = height + pageY;
      if (Platform.OS === 'android') {
        layoutY = layoutY - Theme.statusBarHeight
      }
      setState({
        ...state,
        regionSelectedValues,
        visible: !state.visible
      })
    });
  };

  const _onConfirm = () => {
    onConfirm && onConfirm(state.regionSelectedValues);
    let _label = state.regionSelectedValues?.regionText?.join(',') || label;
    setState(prevState => ({
      ...prevState,
      visible: false,
      label: _label
    }))
  };

  const _onReset = () => {
    const regionSelectedValues: IRegionType = {
      area: [],
      areaName: [],
      city: projectLocation.cityCode || projectLocation.defaultCityCode,
      cityName: projectLocation.cityName || projectLocation.defaultCityName,
      district: "",
      districtName: "",
      regionText: [projectLocation.cityName || projectLocation.defaultCityName]
    };
    setState(prevState => ({
      ...prevState,
      regionSelectedValues,
    }));
    onReset && onReset()
  };

  const _onChange = (params: IRegionType) => {
    setState(prevState => ({
      ...prevState,
      regionSelectedValues: params
    }))
  };

  const newContent = (
    React.cloneElement(content, {
      onConfirm: _onConfirm,
      onChange: _onChange,
      showTopCity: false,
      visible: state.visible,
      regionSelectedValues: state.regionSelectedValues
    })
  );

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      label: regionSelectedValues?.regionText?.join(',') || label
    }))
  }, [regionSelectedValues]);

  return (
    <TouchableOpacity activeOpacity={1} style={styles.sr_screen_wrapper} ref={(ref: any) => viewRef = ref}>
      <TouchableOpacity style={styles.sr_screen_item} onPress={screenModalToggle}>
        <Text style={[styles.sr_screen_text, state.visible ? styles.sr_screen_text_active : null]} numberOfLines={1}>{state.label}</Text>
        <Image style={styles.sr_screen_icon} source={state.visible ? more_open : more_close}/>
      </TouchableOpacity>

      <Modal visible={state.visible} transparent={true}>

        {/**全透明遮罩层*/}
        <TouchableOpacity activeOpacity={1} onPress={screenModalToggle} style={[styles.sr_modal_transparent, {height: layoutY}]}/>

        <View style={[styles.sr_modal_content]}>{newContent}</View>

        <ChoiceFooter onConfirm={_onConfirm} onReset={_onReset}/>

        {/**半透明遮罩层*/}
        <TouchableOpacity activeOpacity={1} onPress={screenModalToggle} style={styles.sr_modal_mask}/>

      </Modal>
    </TouchableOpacity>
  )
};

const mapStateToProps = ({projectLocation}: any) => {
  return {projectLocation}
};
export default connect(mapStateToProps)(RegionChoiceModal)

