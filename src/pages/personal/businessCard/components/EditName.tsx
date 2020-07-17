/**
 * @author: zxs
 * @date: 2020/6/16
 */
import React, {useEffect, useRef, useState} from "react";
import {Image, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "@/pages/personal/businessCard/editComponent/styles";
import businessCardService from "@/services/businessCardService/businessCardService";
import {Toast} from "@new-space/teaset";
import {connect} from "react-redux";

const edit_blue = require('../../../../images/icons/edit_blue.png');

interface EditNamePropsType {
  name: string,
  id: string,
  dispatch?: any,
  type: string
}

interface EditNameStateType {
  visible: boolean,
  name: string,
  type: string,
  inputText: string
}

const defaultState: EditNameStateType = {
  visible: false,
  name: '',
  type: '',
  inputText: ''
};

const EditName = ({
                    name,
                    id,
                    dispatch,
                    type
                  }: EditNamePropsType) => {

  const [state, setState] = useState(() => {
    return {
      ...defaultState,
      name: name,
      inputText: name
    }
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      name: name
    }))
  }, [name]);

  /**编辑名称*/
  const editNameToggle = async (clickType?: string) => {
    if (clickType === 'confirm') {
      const requestData = {
        id: id,
        value: state.inputText
      };
      const res = await businessCardService.saveDetailName(requestData).catch();
      if (res.code === '0') {
        Toast.message('修改成功');
        setState(prevState => ({
          ...prevState,
          visible: !prevState.visible,
          name: state.inputText
        }));
        if (type === 'shop') {
          dispatch({type: 'businessCard/getSelectedShopAsync'})
        } else {
          dispatch({type: 'businessCard/getSelectedBuildingAsync'})
        }
      }
    } else {
      setState(prevState => ({
        ...prevState,
        visible: !prevState.visible,
        inputText: state.name
      }));
    }
  };

  const nameEditOnChange = (e: string) => {
    setState(prevState => ({
      ...prevState,
      inputText: e
    }));
  };

  return (
    <View>
      <View style={styles.eb_row}>
        <Text style={styles.eb_name} numberOfLines={2}>{state.name}</Text>
        <TouchableOpacity style={styles.eb_name_icon_wrapper} activeOpacity={0.8} onPress={() => editNameToggle()}>
          <Image style={styles.eb_name_icon} source={edit_blue}/>
        </TouchableOpacity>
      </View>
      {/**楼盘名修改modal*/}
      <Modal transparent={true} visible={state.visible} animationType='fade'>
        <TouchableOpacity style={styles.bc_modal_container} activeOpacity={0} onPress={() => editNameToggle()}>
          <View style={styles.bc_modal_content}>
            <Text style={styles.bc_modal_header}>编辑名称</Text>
            <TextInput placeholder='请输入名称'
                       style={styles.bc_modal_input}
                       value={state.inputText}
                       maxLength={30}
                       onChangeText={nameEditOnChange}/>
            <View style={styles.bc_modal_footer}>
              <Text onPress={() => editNameToggle()} style={styles.bc_modal_footer_btn}>取消</Text>
              <Text style={styles.bc_modal_footer_line}/>
              <Text onPress={() => editNameToggle('confirm')} style={[styles.bc_modal_footer_btn, styles.bc_modal_footer_confirm]}>确定</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )

};

const mapStateToProps = ({businessCard}: any) => {
  return {businessCard}
};
export default connect(mapStateToProps)(EditName)

