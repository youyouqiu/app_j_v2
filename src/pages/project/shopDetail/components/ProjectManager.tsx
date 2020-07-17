/**
 * @author: zxs
 * @date: 2020/4/28
 */
import React, {useEffect, useState} from "react";
import {Image, ImageSourcePropType, Linking, Text, TouchableOpacity, View} from "react-native";
import SubHeader from "@/pages/main/components/SubHeader";
import styles from '../styles'
import projectService from "@/services/projectService";
import {ResponseCommon} from "@/services/typings/types";
import {IProjectManagerPropsType, IProjectManagerStateType, IUserInfo} from "@/pages/project/shopDetail/types/projectManagerTypes";
import BuryPoint from '@/utils/BuryPoint';

const call = require('../../../../images/icons/call.png');
const defaultAvatar = require('../../../../images/defaultImage/avatar.man.png');

const defaultState: IProjectManagerStateType = {
  userList: [],
  showMore: false,
};

const ProjectManager = ({buildingTreeId}: IProjectManagerPropsType) => {

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    buildingTreeId && buildingResidentReq()
  }, [buildingTreeId]);

  const buildingResidentReq = async () => {
    const response: ResponseCommon<Array<IUserInfo>> = await projectService.buildingResidentReq(buildingTreeId);
    if (response.code === '0') {
      setState({
        ...state,
        userList: response.extension
      });
    }
  };

  const callPhone = (phone: string, userId: string) => {
    BuryPoint.add({
      page: '单个房源详情',
      target: '联系项目经理_button',
    })
    const requestData = {userId, buildingTreeId};
    projectService.addResidentQuiry(requestData);
    phone && Linking.openURL('tel:' + phone);
  };

  const content = (userList: Array<IUserInfo>) => {
    return (
      userList.map((v, i) => (
        <View style={styles.sd_pm_manager_item}>
          <Text style={styles.sd_pm_manager_name_icon}>{v.trueName.substr(-2)}</Text>
          <View style={styles.sd_pm_manager_info}>
            <Text style={styles.sd_pm_manager_name}>{v.trueName}</Text>
            <Text style={styles.sd_pm_manager_tips}>
              <Text style={styles.sd_pm_manager_num}>{v.viewCount}</Text>人咨询过TA
            </Text>
          </View>
          <TouchableOpacity style={styles.sd_pm_call_btn} onPress={() => callPhone(v.phone, v.id)} activeOpacity={0.8}>
            <Image style={styles.sd_pm_call_btn_icon} source={call}/>
            <Text style={styles.sd_pm_call_btn_text}>联系TA</Text>
          </TouchableOpacity>
        </View>
      ))
    )
  };

  const showMore = () => {
    setState({
      ...state,
      showMore: !state.showMore
    })
  };
  const length = state.userList.length;
  if (length === 0) return null;

  return (
    <View style={styles.sd_pm_wrapper}>
      <SubHeader subTitle='项目经理'/>
      <View style={styles.sd_pm_content}>
        {content(state.showMore ? state.userList : [state.userList[0]])}
        {length > 1 ? (
          <TouchableOpacity onPress={showMore} activeOpacity={0.8} style={styles.sd_pm_more_wrapper}>
            <Text style={styles.sd_pm_more_text}>{state.showMore ? `收起(${length})` : `展开(${length})`}</Text>
            <Image style={styles.sd_pm_more_img}
                   source={state.showMore ? require('@/images/icons/project/arrow_up.png') : require('@/images/icons/project/arrow_down.png')}/>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
};

export default ProjectManager
