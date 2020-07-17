import styles from "../styles";
import {findNodeHandle, Image, LayoutChangeEvent, Modal, Platform, Text, TouchableOpacity, UIManager, View} from "react-native";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {IModalAreaChoicePropsType, IModalAreaChoiceStateType} from "@/businessComponents/choice/areaChoice/types";
import {IChoiceLabelDataPropsType} from "@/businessComponents/LabelGroup/types";
import {Theme} from "@new-space/teaset";
import ChoiceFooter from "@/businessComponents/choice/components/choiceFooter";
import {scaleSize} from "@/utils/screenUtil";

/**
 * @author: zhl
 * @date: 2020/6/19
 */

const more_close = require('../../../images/icons/more_close.png');
const more_open = require('../../../images/icons/more_open.png');


const defaultState: IModalAreaChoiceStateType = {
  visible: false,
  label: '',
  type: '',
  totalPriceSelectValues: [],
  unitPriceSelectValues: []
};

let layoutY = 0;

const AreaChoiceModal = ({
    label,
    content,
    onchange,
    onConfirm,
    onReset,
    areaSelectValues = []
  }: IModalAreaChoicePropsType) => {

  let viewRef: any = useMemo(() => React.createRef(), []);

  const [state, setState] = useState(() => {

    return {
      ...defaultState,
      areaSelectValues,
      label: areaSelectValues.length > 0 ? areaSelectValues.map((v) => v.label).join(',') : label
    }
  });

  const _onchange = (params: Array<IChoiceLabelDataPropsType>) => {
    onchange && onchange(params);
    setState({
      ...state,
      areaSelectValues: params
    })
  };

  const _onReset = () => {
    setState({
      ...state,
      areaSelectValues: [],
    });
    onReset && onReset()
  };

  const _onConfirm = () => {
    const _label = state.areaSelectValues.map((v) => v.label).join(',') || label;
    setState({
      ...state,
      label: _label,
      visible: false
    });
    onConfirm && onConfirm(state.areaSelectValues);
  };

  const newContent = (
    React.cloneElement(content, {
      onchange: _onchange,
      areaSelectValues: state.areaSelectValues,
    })
  );


  const screenModalToggle = () => {
    const node = findNodeHandle(viewRef);
    UIManager.measure(node!, (x, y, width, height, pageX, pageY) => {
      layoutY = height + pageY;
      if (Platform.OS === 'android') {
        layoutY = layoutY - Theme.statusBarHeight
      }
      setState(prevState => ({
        ...prevState,
        areaSelectValues,
        visible: !state.visible
      }))
    });
  };

  return (
    <TouchableOpacity style={styles.sr_screen_wrapper} ref={(ref: any) => viewRef = ref} activeOpacity={1}>
      <TouchableOpacity style={styles.sr_screen_item} onPress={screenModalToggle}>
        <Text style={[styles.sr_screen_text, state.visible ? styles.sr_screen_text_active : null]} numberOfLines={1}>{state.label}</Text>
        <Image style={styles.sr_screen_icon} source={state.visible ? more_open : more_close}/>
      </TouchableOpacity>

      <Modal visible={state.visible} transparent={true}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={screenModalToggle}
          style={[styles.sr_modal_transparent, {height: layoutY}]}/>

        <View style={styles.sr_modal_content}>{newContent}</View>

        <ChoiceFooter onConfirm={_onConfirm} onReset={_onReset}/>

        <TouchableOpacity
          activeOpacity={1}
          onPress={screenModalToggle}
          style={styles.sr_modal_mask}/>
      </Modal>
    </TouchableOpacity>
  )
};

export default AreaChoiceModal
