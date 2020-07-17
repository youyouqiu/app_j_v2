/**
 * @author: zxs
 * @date: 2020/6/15
 */
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "@/pages/personal/businessCard/styles";
import React, {useEffect, useState} from "react";
import navigation from "@/utils/navigation";
import {connect} from "react-redux";
import {UserDescribePropsType, UserDescribeStateType} from "@/pages/personal/businessCard/editUserDescribe/types";

const edit_dark = require('../../../../images/icons/edit_dark.png');

const defaultState: UserDescribeStateType = {
  describe: '',
  labels: []
};

const UserDescribe = ({
                        dispatch,
                        businessCard
                      }: UserDescribePropsType) => {

  const [state, setState] = useState<UserDescribeStateType>(defaultState);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      describe: businessCard.describe,
      labels: businessCard.labels
    }))
  }, [businessCard.describe, businessCard.labels]);


  useEffect(() => {
    getUserDescribe()
  }, []);

  /**用户简介*/
  const getUserDescribe = async () => {
    dispatch({type: 'businessCard/getUserDescribeAsync'})
  };

  const gotoEditUserDescribe = () => {
    navigation.navigate('editUserDescribe')
  };

  return (
    <View style={styles.bc_intro_wrapper}>
      <View style={styles.bc_intro_container}>
        <View style={styles.bc_intro_header}>
          <Text style={styles.bc_intro_header_label}>个人简介（非必填）</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={gotoEditUserDescribe}>
            <Image style={styles.bc_intro_header_icon} source={edit_dark}/>
          </TouchableOpacity>
        </View>
        <View style={styles.bc_intro_content}>
          <Text style={styles.bc_intro_content_text}>
            {state.describe ? state.describe : '点击“个人简介”右侧的“编辑”按钮，完善要发送给客户的个人信息'}
          </Text>
          <View style={styles.bc_intro_labels}>
            {state.labels?.length > 0 ? (
              state.labels?.map((v, i) => (
                <Text style={styles.bc_intro_label}>{v}</Text>
              ))
            ) : null}
          </View>
        </View>
      </View>
    </View>

  )

};

const mapStateToProps = ({config, user, businessCard}: any) => {
  return {config, userInfo: user?.userInfo, businessCard}
};
export default connect(mapStateToProps)(UserDescribe)

