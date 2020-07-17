/**
 * @author: zxs
 * @date: 2020/6/16
 */
import styles from "./styles";
import Page from "@/components/Page";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {USER_LABEL, USER_TEMPLATE} from "@/pages/personal/businessCard/constant";
import React, {useEffect, useMemo, useState} from "react";
import Loading from "@/components/Loading/Loading";
import {Toast} from "@new-space/teaset";
import businessCardService from "@/services/businessCardService/businessCardService";
import {DetailCommentCommonType, DetailCommentPropsType, DetailCommentStateType} from "./types";
import {connect} from "react-redux";
import {examineText} from "@/utils/examine";

const add_circular_dark = require('../../../../images/icons/add_circular_dark.png');

const defaultState: DetailCommentStateType = {
  inputText: '',
  evaluateList: []
};
const defaultCommon: DetailCommentCommonType = {
  loadingNumber: -1,
  id: '',
  detailId: '',
  detailName: ''
};
const DetailComment = ({
                         dispatch,
                         businessCard,
                         navigation
                       }: DetailCommentPropsType) => {

  const [state, setState] = useState<DetailCommentStateType>(() => {
    return {
      ...defaultState,
      inputText: businessCard?.editDetail?.evaluate || ''
    }
  });

  const common = useMemo(() => {
    return {
      ...defaultCommon,
      id: navigation?.state?.params?.id,
      type: navigation?.state?.params?.type,
      detailId: navigation?.state?.params?.detailId,
      detailName: navigation?.state?.params?.detailName
    }
  }, []);

  useEffect(() => {
    common.detailId && getBuildingEvaluate();
  }, []);

  const getBuildingEvaluate = async () => {
    const res = await businessCardService.getBuildingEvaluate(common.detailId).catch();
    if (res.code === '0') {
      setState(prevState => ({
        ...prevState,
        evaluateList: res.extension
      }))
    }
  };

  /**使用模板*/
  const useTemplate = (text: string) => {
    const _inputText = text === '' ? '' : state.inputText + text;
    setState(prevState => ({
      ...prevState,
      inputText: _inputText.length > 200 ? _inputText.substr(0, 500) : _inputText
    }))
  };

  const onChangeText = (text: string) => {
    setState(prevState => ({
      ...prevState,
      inputText: text
    }))
  };

  /**保存评价*/
  const saveDetailEvaluate = async () => {
    if (!state.inputText) {
      Toast.message('评价不能未空');
      return
    }
    const res0 = await examineText(state.inputText).catch(err => {
      Toast.message(err)
    });
    if (!res0) return;
    common.loadingNumber = Loading.show();
    const requestData = {
      id: common.id,
      value: state.inputText,
    };
    const res = await businessCardService.saveDetailEvaluate(requestData).catch(err => {
      Toast.message('保存失败');
      Loading.hide(common.loadingNumber)
    });
    if (res.code === '0') {
      Toast.message('保存成功');
      Loading.hide(common.loadingNumber);
      dispatch({type: 'businessCard/getEditDetailAsync', payload: {id: common.id, type: common.type}});
      navigation.goBack();
    }
  };

  return (
    <View style={styles.dc_wrapper}>
      <Page scroll={true} title='页面简介'>
        <View style={styles.dc_instr_container}>
          <View style={styles.dc_instr_content_item}>
            <Text style={styles.dc_instr_header}>
              编辑你对<Text style={styles.dc_instr_header_name}>{common.detailName}</Text>的评价
            </Text>
            <View style={styles.dc_instr_content}>
              <TextInput multiline={true}
                         textAlignVertical='top'
                         style={styles.dc_instr_input}
                         value={state.inputText}
                         onChangeText={onChangeText}
                         maxLength={500}
                         placeholder='你觉得红星大都汇 9栋-2-3的位置怎么样，交通是否便利，周边配套是否齐全，或者有其他想说的？'/>
              <View style={styles.dc_instr_footer}>
                <Text style={styles.dc_instr_clean} onPress={() => useTemplate('')}>清空</Text>
                <Text style={styles.dc_instr_number}>{state?.inputText?.length || 0}/500</Text>
              </View>
            </View>
          </View>

          <View style={styles.dc_temp_wrapper}>
            {state.evaluateList.map((v, i) => (
              v.value ? (
                <View style={styles.dc_temp_item}>
                  <View style={styles.dc_temp_header}>
                    <Text style={styles.dc_temp_header_title}>{v.label}</Text>
                    <TouchableOpacity onPress={() => useTemplate(v.value)} activeOpacity={1} style={styles.dc_temp_header_right}>
                      <Image source={add_circular_dark} style={styles.dc_temp_header_right_icon}/>
                      <Text style={styles.dc_temp_header_right_text}>加入评价</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.dc_temp_header_content}>{v.value}</Text>
                  {v.explain ? <Text style={styles.dc_temp_header_explain}>{v.explain}</Text> : null}
                </View>
              ) : null
            ))}
          </View>
        </View>

      </Page>
      <View style={styles.dc_footer_wrapper}>
        <TouchableOpacity style={styles.dc_footer_touch} activeOpacity={0.8} onPress={saveDetailEvaluate}>
          <Text style={styles.dc_footer_touch_text}>保存</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

};

const mapStateToProps = ({businessCard}: any) => {
  return {businessCard}
};
export default connect(mapStateToProps)(DetailComment)

