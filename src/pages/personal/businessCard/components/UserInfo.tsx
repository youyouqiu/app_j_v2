/**
 * @author: zxs
 * @date: 2020/6/11
 */
import React, {useMemo, useState} from "react";
import {Dimensions, Image, ImageSourcePropType, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "@/pages/personal/businessCard/styles";
import {scaleSize} from "@/utils/screenUtil";
// @ts-ignore
import {BoxShadow} from 'react-native-shadow'
import {connect, useSelector} from "react-redux";
import {UserInfoCommonType, UserInfoPropsType, UserInfoStateType} from "@/pages/personal/businessCard/types";
import {updateUser, updateUserBasic} from "@/services/auth";
import request from "@/utils/request";
import {Toast} from "@new-space/teaset";
import ImagePicker from "@/components/ImagePicker";
import StoreState from "@/models/types";

const edit_white = require('../../../../images/icons/edit_white.png');
const phone_white = require('../../../../images/icons/phone_white.png');
const user_card = require('../../../../images/icons/user_card.png');
const user_location = require('../../../../images/icons/user_location.png');
const avatar_0 = require('../../../../images/defaultImage/avatar_0.png');
const avatar_1 = require('../../../../images/defaultImage/avatar_1.png');

const user_man = require('../images/user_man.png');
const bg = require('../images/bg.png');

const d_width = Dimensions.get('window').width;
const shadowOpt = {
  width: d_width - scaleSize(64),
  height: scaleSize(344),
  color: "#3b3b3b",
  border: 0,
  radius: 4,
  opacity: 1,
  x: 0,
  y: 0,
};
const defaultState: UserInfoStateType = {
  visible: false,
  pickImgVisible: false,
};
const defaultCommon: UserInfoCommonType = {
  userName: ''
};
const UserInfo = ({dispatch, businessCard}: UserInfoPropsType) => {

  const common = useMemo(() => defaultCommon, []);
  const [state, setState] = useState<UserInfoStateType>(defaultState);
  const {userInfo} = useSelector(((state1: StoreState) => state1.user));
  /**编辑姓名*/
  const editNameToggle = async (type?: string) => {
    setState(prevState => ({
      ...prevState,
      visible: !prevState.visible
    }));
    if (type === 'confirm') {
      let res = await updateUser(request.getUrl().cqAuth, {'trueName': common.userName}).catch(err => {
        Toast.message(err.message);
      });
      if (res?.code === '0') {
        Toast.message('修改成功');
        dispatch({
          type: 'user/updateUserInfo',
          payload: {trueName: common.userName}
        })
      }
    }
  };

  const nameEditOnChange = (e: string) => {
    common.userName = e;
  };

  const pickImgToggle = async (e?: any) => {
    if (e) {
      setState(prevState => ({
        ...prevState,
        pickImgVisible: false
      }));
      const params = {avatar: e.extension};
      let res = await updateUserBasic(request.getUrl().cqAuth, params);
      if (res.code === '0') {
        Toast.message('修改成功');
        dispatch({type: 'user/interfaceUpdateUserAsync'})
      }
    } else {
      setState(prevState => ({
        ...prevState,
        pickImgVisible: !prevState.pickImgVisible
      }));
    }
  };

  let avatar: any = userInfo.avatar || '';
  if (avatar) {
    if (avatar.includes('/0.png')) {
      avatar = avatar_0
    } else if (avatar.includes('/1.png')) {
      avatar = avatar_1
    }
  } else {
    avatar = userInfo.sex === 0 ? avatar_0 : avatar_1
  }

  return (
    <View>
      <View style={styles.bc_container1}>
        {/**个人信息*/}
        <View style={styles.bc_card_wrapper}>
          <BoxShadow setting={shadowOpt}>
            <View style={styles.bc_card_content}>
              <View style={styles.bc_card_info}>
                <View style={styles.bc_card_row}>
                  {userInfo.trueName ? (
                    <Text style={styles.bc_card_row_label}>{userInfo.trueName}</Text>
                  ) : ([
                    <Image style={styles.bc_card_row_icon} source={edit_white}/>,
                    <Text style={styles.bc_card_row_label} onPress={() => editNameToggle()}>编辑姓名</Text>,
                  ])}
                </View>
                <View style={styles.bc_card_row}>
                  <Image style={styles.bc_card_row_icon} source={phone_white}/>
                  <Text style={[styles.bc_card_row_label, styles.bc_card_phone]}>{userInfo.phoneNumber}</Text>
                </View>
              </View>

              <View style={styles.bc_card_other_info} pointerEvents='none'>
                <View style={styles.bc_card_row}>
                  <Image style={styles.bc_card_row_icon} source={user_card}/>
                  <Text style={[styles.bc_card_row_label, styles.bc_card_location]} numberOfLines={1}>{userInfo.filiale}</Text>
                </View>
                <View style={styles.bc_card_row}>
                  <Image style={styles.bc_card_row_icon} source={user_location}/>
                  <Text style={[styles.bc_card_row_label, styles.bc_card_location]} numberOfLines={1}>{userInfo.address}</Text>
                </View>
              </View>
              <Image source={bg} style={styles.bc_card_bg}/>
              <TouchableOpacity onPress={() => pickImgToggle()} activeOpacity={0.8} style={styles.bc_card_user_icon_wrapper}>
                <Image source={typeof avatar === 'string' ? {uri: avatar} : avatar} defaultSource={user_man} style={styles.bc_card_user_icon}/>
              </TouchableOpacity>
            </View>
          </BoxShadow>
        </View>

        {/**姓名修改modal*/}
        <Modal transparent={true} visible={state.visible} animationType='fade'>
          <TouchableOpacity style={styles.bc_modal_container} activeOpacity={0} onPress={() => editNameToggle()}>
            <View style={styles.bc_modal_content}>
              <Text style={styles.bc_modal_header}>编辑姓名</Text>
              <TextInput placeholder='请输入姓名' style={styles.bc_modal_input} onChangeText={nameEditOnChange}/>
              <View style={styles.bc_modal_footer}>
                <Text onPress={() => editNameToggle()} style={styles.bc_modal_footer_btn}>取消</Text>
                <Text style={styles.bc_modal_footer_line}/>
                <Text onPress={() => editNameToggle('confirm')} style={[styles.bc_modal_footer_btn, styles.bc_modal_footer_confirm]}>确定</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/**头像修改modal*/}
        <ImagePicker width={400} height={400} cropping={true} addId={userInfo.id} onSuccess={(e: any) => pickImgToggle(e)} visible={state.pickImgVisible} onClose={() => pickImgToggle()}/>
      </View>
    </View>
  )
};

const mapStateToProps = ({config, user, businessCard}: any) => {
  return {config, userInfo: user?.userInfo, businessCard}
};
export default connect(mapStateToProps)(UserInfo)

