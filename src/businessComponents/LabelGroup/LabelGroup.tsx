import {View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import styles from "./styles";
import ChoiceLabel from "./ChoiceLabel";
import {Toast} from '@new-space/teaset'
import {IChoiceLabelDataPropsType, ILabelGroupPropsType} from "@/businessComponents/LabelGroup/types";


const LabelGroup = ({
                      data = [],
                      multiple = false,
                      minSize = 0,
                      maxSize = 10,
                      flex,
                      selectValues = [],
                      ...otherProps
                    }: ILabelGroupPropsType) => {
  const [values, setValues] = useState(selectValues);

  useEffect(() => {
    selectValues?.length > 0 && setValues(selectValues)
  }, [selectValues]);

  const _onchange = ({value, label}: IChoiceLabelDataPropsType) => {
    let _values = [...values];
    const hasKey: boolean = values.some((v) => v.value === value);
    if (multiple) {
      if (hasKey) {
        _values = _values.filter((v) => v.value !== value)
      } else {
        if (_values.length >= maxSize) {
          Toast.message('最多选择' + maxSize + '个', null, true, 'bottom');
          return;
        }
        _values.push({value, label})
      }
    } else {
      if (hasKey) {
        if (minSize === 0) {
          _values = []
        }
      } else {
        _values = [{value, label}]
      }
    }
    setValues(_values);
    otherProps.onchange && otherProps.onchange(_values)
  };


  const renderContent = () => {
    let content: any = [];
    data.map((v1) => {
      const isSelected = values.some((v2) => v1.value === v2.value);
      const choiceLabel = (
        <ChoiceLabel idx={v1.value}
                     isSelected={isSelected} {...otherProps} data={{label: v1.label, value: v1.value}}
                     onChange={_onchange}/>
      );
      content.push(flex ? flexContent(choiceLabel) : choiceLabel)
    });
    return content
  };

  const flexContent = (choiceLabel: any) => <View style={styles.lp_flex_content}>{choiceLabel}</View>;

  const content = renderContent();

  return (
    <View style={styles.lp_itemContainer}>
      <View style={styles.lp_areaContent}>
        {content}
      </View>
    </View>
  )
};

export default LabelGroup;


