/**
 * @author: zxs
 * @date: 2020/6/10
 */
import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const data = [
  {
    key: 1,
    text: '模板一'
  },
  {
    key: 2,
    text: '模板二'
  },
  {
    key: 3,
    text: '模板三'
  },
  {
    key: 4,
    text: '模板四'
  }
];

export const ChooseTemplate = () => {

  const [activeKey, setActiveKey] = useState(1);

  const touchOnPress = (key: number) => {
    if (activeKey === key) return;
    setActiveKey(key);
  };

  return (
    <View style={styles.wrapper}>
      {data.map((v, i) => (
        <TouchableOpacity activeOpacity={0.8}
                          onPress={() => touchOnPress(v.key)}
                          style={[styles.touch, activeKey === v.key ? styles.touch_active : null]}>
          <Text style={[styles.text, activeKey === v.key ? styles.text_active : null]}>{v.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
};

export interface OnchangeParamsType {
  selected: boolean,
  text: string
}

export interface ChooseLabelPropsType {
  title: string,
  onchange: (params: OnchangeParamsType) => void,
  selected: boolean
}

export const ChooseLabel = ({title, onchange, selected}: ChooseLabelPropsType) => {

  const [active, setActive] = useState(selected);

  useEffect(() => {
    setActive(selected)
  }, [selected]);

  const touchOnPress = () => {
    const params: OnchangeParamsType = {
      selected: !active,
      text: title
    };
    onchange && onchange(params)
  };

  return (
    <TouchableOpacity activeOpacity={0.8}
                      onPress={touchOnPress}
                      style={[styles.label_touch, active ? styles.label_touch_active : null]}>
      <Text style={[styles.label_text, active ? styles.label_text_active : null]}>{title}</Text>
    </TouchableOpacity>
  )

};


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  touch: {
    borderRadius: scaleSize(4),
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    paddingHorizontal: scaleSize(26),
    paddingVertical: scaleSize(10)
  },
  touch_active: {
    borderColor: '#1F3070',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#1F3070'
  },
  text: {
    fontSize: scaleSize(28),
    color: '#333333'
  },
  text_active: {
    color: '#fff'
  },
  label_touch: {
    borderRadius: scaleSize(4),
    backgroundColor: '#F4F5F9',
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(13),
    marginBottom: scaleSize(10),
    marginRight: scaleSize(5),
    marginLeft: scaleSize(5)
  },
  label_touch_active: {
    backgroundColor: '#1F3070'
  },
  label_text: {
    fontSize: scaleSize(24),
    color: '#808CB1'
  },
  label_text_active: {
    color: '#fff'
  }
});
