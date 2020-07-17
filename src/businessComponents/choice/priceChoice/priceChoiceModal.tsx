import styles from "../styles";
import {findNodeHandle, Image, LayoutChangeEvent, Modal, Platform, Text, TouchableOpacity, UIManager, View} from "react-native";
import React, {useMemo, useState} from "react";
import {IModalPriceChoiceOnConfirmType, IModalPriceChoicePropsType, IModalPriceChoiceStateType, PriceType} from "./types";
import {IChoiceLabelDataPropsType} from "@/businessComponents/LabelGroup/types";
import {Theme} from "@new-space/teaset";
import ChoiceFooter from "@/businessComponents/choice/components/choiceFooter";

/**
 * @author: zxs
 * @date: 2020/5/9
 */

const more_close = require('../../../images/icons/more_close.png');
const more_open = require('../../../images/icons/more_open.png');

const defaultState: IModalPriceChoiceStateType = {
  visible: false,
  label: '',
  type: '',
  totalPriceSelectValues: [],
  unitPriceSelectValues: []
};

let layoutY = 0;

const PriceChoiceModal = ({
                            label,
                            content,
                            onchange,
                            onConfirm,
                            totalPriceSelectValues = [],
                            unitPriceSelectValues = [],
                            onReset
                          }: IModalPriceChoicePropsType) => {

  let viewRef: any = useMemo(() => React.createRef(), []);

  const [state, setState] = useState(() => {
    return {
      ...defaultState,
      totalPriceSelectValues,
      unitPriceSelectValues,
      label: label
    }
  });

  const _onchange = (params: Array<IChoiceLabelDataPropsType>, type?: PriceType) => {
    const onchangeParams: IModalPriceChoiceOnConfirmType = {
      total: [],
      unit: []
    };
    if (type === 'total') {
      onchangeParams.total = params;
      setState({
        ...state,
        totalPriceSelectValues: params,
        unitPriceSelectValues: []
      });
    } else if (type === 'unit') {
      onchangeParams.unit = params;
      setState({
        ...state,
        unitPriceSelectValues: params,
        totalPriceSelectValues: [],
      })
    }

    onchange && onchange(onchangeParams);
  };

  const _onReset = () => {
    setState({
      ...state,
      totalPriceSelectValues: [],
      unitPriceSelectValues: [],
    });
    onReset && onReset()
  };

  const _onConfirm = () => {
    const _label = [...state.totalPriceSelectValues, ...state.unitPriceSelectValues].map((v) => v.label).join(',') || label;
    setState({
      ...state,
      label: _label,
      visible: false
    });
    const onConfirmParams = {
      total: state.totalPriceSelectValues,
      unit: state.unitPriceSelectValues
    };
    onConfirm && onConfirm(onConfirmParams);
  };

  const newContent = (
    React.cloneElement(content, {
      onchange: _onchange,
      totalPriceSelectValues: state.totalPriceSelectValues,
      unitPriceSelectValues: state.unitPriceSelectValues,
    })
  );

  const screenModalToggle = () => {
    const node = findNodeHandle(viewRef);
    UIManager.measure(node!, (x, y, width, height, pageX, pageY) => {
      layoutY = height + pageY;
      if (Platform.OS === 'android') {
        layoutY = layoutY - Theme.statusBarHeight
      }
      setState({
        ...state,
        totalPriceSelectValues,
        unitPriceSelectValues,
        visible: !state.visible
      })
    });
  };

  return (
    <TouchableOpacity style={styles.sr_screen_wrapper} ref={(ref: any) => viewRef = ref} activeOpacity={1}>
      <TouchableOpacity style={styles.sr_screen_item} onPress={screenModalToggle}>
        <Text style={[styles.sr_screen_text, state.visible ? styles.sr_screen_text_active : null]} numberOfLines={1}>{state.label}</Text>
        <Image style={styles.sr_screen_icon} source={state.visible ? more_open : more_close}/>
      </TouchableOpacity>

      <Modal visible={state.visible} transparent={true}>

        {/**全透明遮罩层*/}
        <TouchableOpacity activeOpacity={1} onPress={screenModalToggle} style={[styles.sr_modal_transparent, {height: layoutY}]}/>

        <View style={styles.sr_modal_content}>{newContent}</View>

        <ChoiceFooter onConfirm={_onConfirm} onReset={_onReset}/>

        {/**半透明遮罩层*/}
        <TouchableOpacity activeOpacity={1} onPress={screenModalToggle} style={styles.sr_modal_mask}/>

      </Modal>
    </TouchableOpacity>
  )
};

export default PriceChoiceModal
