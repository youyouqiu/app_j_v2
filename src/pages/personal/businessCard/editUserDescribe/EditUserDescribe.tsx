/**
 * @author: zxs
 * @date: 2020/6/10
 */
import Page from "@/components/Page";
import React, {useMemo, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import styles from './styles'
import {ChooseLabel, OnchangeParamsType} from "@/pages/personal/businessCard/components/ChooseTemplate";
import {USER_LABEL, USER_TEMPLATE} from "@/pages/personal/businessCard/constant";
import {
  EditUserDescribeCommonType,
  EditUserDescribePropsType,
  EditUserDescribeStateType
} from "@/pages/personal/businessCard/editUserDescribe/types";
import businessCardService from "@/services/businessCardService/businessCardService";
import {Toast} from "@new-space/teaset";
import Loading from "@/components/Loading/Loading";
import {connect} from "react-redux";
import navigation from "@/utils/navigation";
import {examineText} from "@/utils/examine";

const add_circular_dark = require('../../../../images/icons/add_circular_dark.png');

const defaultState: EditUserDescribeStateType = {
  inputText: '',
  labels: [],
};
const defaultCommon: EditUserDescribeCommonType = {
  loadingNumber: -1,
  labels: [],
};
const EditUserDescribe = ({
                            businessCard,
                            dispatch,
                          }: EditUserDescribePropsType) => {

  const common = useMemo(() => defaultCommon, []);
  const [state, setState] = useState<EditUserDescribeStateType>(() => {
    return {
      ...defaultState,
      labels: businessCard.labels || [],
      inputText: businessCard.describe || ''
    }
  });

  const saveUserInstr = async () => {
    if (!state.inputText) {
      Toast.message('个人简介不能未空');
      return
    }
    const res0 = await examineText(state.inputText).catch(err => {
      Toast.message(err)
    });
    if (!res0) return;
    if (state.labels.length === 0) {
      Toast.message('个人标签不能未空');
      return
    }
    common.loadingNumber = Loading.show();
    const requestData = {
      describe: state.inputText,
      labels: state.labels
    };
    const res = await businessCardService.saveUserDescribe(requestData).catch(err => {
      Toast.message('保存失败');
      Loading.hide(common.loadingNumber)
    });
    if (res.code === '0') {
      Toast.message('保存成功');
      Loading.hide(common.loadingNumber);
      dispatch({type: 'businessCard/getUserDescribeAsync'});
      navigation.goBack();
    }
  };

  const labelOnChange = (params: OnchangeParamsType) => {
    if (params.selected) {
      if (state.labels.length >= 3) {
        Toast.message('最多选择3个');
        return
      }
      setState(prevState => ({
        ...prevState,
        labels: [...prevState.labels, params.text]
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        labels: prevState.labels.filter((v) => v !== params.text)
      }))
    }
  };

  const useTemplate = (text: string, type: string) => {
    const _inputText = type === 'clean' ? '' : (state.inputText + text);
    setState(prevState => ({
      ...prevState,
      inputText: _inputText.length > 200 ? _inputText.substr(0, 200) : _inputText
    }))
  };

  const onChangeText = (text: string) => {
    setState(prevState => ({
      ...prevState,
      inputText: text
    }))
  };

  return (
    <View style={styles.eu_wrapper}>
      <Page scroll={true} title='个人简介'>
        <View style={styles.eu_instr_container}>
          <View style={styles.eu_instr_content_item}>
            <Text style={styles.eu_instr_header}>个人标签({state?.labels?.length || 0}/3)</Text>
            <View style={styles.eu_instr_template_wrapper}>
              {USER_LABEL.map((v, i) => (
                <ChooseLabel onchange={labelOnChange} selected={state?.labels?.includes(v)} title={v} key={i}/>
              ))}
            </View>
          </View>

          <View style={styles.eu_instr_content_item}>
            <Text style={styles.eu_instr_header}>个人简介</Text>
            <View style={styles.eu_instr_content}>
              <TextInput multiline={true}
                         textAlignVertical='top'
                         style={styles.eu_instr_input}
                         value={state.inputText}
                         onChangeText={onChangeText}
                         maxLength={200}
                         placeholder='请用几句话简单介绍自己，让客户更了解你吧'/>
              <View style={styles.eu_instr_footer}>
                <Text style={styles.eu_instr_clean} onPress={() => useTemplate('', 'clean')}>清空</Text>
                <Text style={styles.eu_instr_number}>{state?.inputText?.length || 0}/200</Text>
              </View>
            </View>
          </View>

          <View style={styles.eu_temp_wrapper}>
            {USER_TEMPLATE.map((v, i) => (
              <View style={styles.eu_temp_item}>
                <View style={styles.eu_temp_header}>
                  <Text style={styles.eu_temp_header_title}>{v.label}</Text>
                  <TouchableOpacity onPress={() => useTemplate(v.text, '')} activeOpacity={1} style={styles.eu_temp_header_right}>
                    <Image source={add_circular_dark} style={styles.eu_temp_header_right_icon}/>
                    <Text style={styles.eu_temp_header_right_text}>加入评价</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.eu_temp_header_content}>{v.text}</Text>
              </View>
            ))}
          </View>
        </View>

      </Page>
      <View style={styles.eu_footer_wrapper}>
        <TouchableOpacity style={styles.eu_footer_touch} activeOpacity={0.8} onPress={saveUserInstr}>
          <Text style={styles.eu_footer_touch_text}>保存</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

};

const mapStateToProps = ({businessCard, user}: any) => {
  return {businessCard, userInfo: user?.userInfo}
};
export default connect(mapStateToProps)(EditUserDescribe)
