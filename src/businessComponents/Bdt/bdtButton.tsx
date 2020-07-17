import React, { FC } from "react";
import {TouchableOpacity, Text} from 'react-native'
import style from './index.style'
import {verifyUser} from '@/utils/utils'
import { connect } from 'react-redux'
import navigate from '@/utils/navigation'
import {Toast} from '@new-space/teaset'
import projectService from '@/services/projectService';
import LinearGradient from 'react-native-linear-gradient'

interface props {
  buildingTreeId?: string | number
  name?: string
  config?: any
  disabled?: boolean
  user?: any
}

const BdtButton: FC<props> = props => {
  const gotoAi = async () => {
    if (props.disabled) {
      Toast.message('数据采集中，敬请期待')
      return
    }
    await verifyUser('noVerifyFree', '')
    const { config, user } = props
    projectService.addShareAvatar({
      BuildingTreeId: props.buildingTreeId,
      Avatar: user.userInfo.avatar
    })
    props?.buildingTreeId && navigate.navigate('xkjWebView', {
      title: props.name,
      isBdt: true,
      url: `${config?.requestUrl?.AIurl}/${props.buildingTreeId}?time=1}`,
    })
  }
  return <TouchableOpacity onPress={gotoAi}>
    <LinearGradient colors={['#415DA9', '#1F3070']} style={style.btn}>
      <Text style={style['btnText']}>打听一下</Text>
    </LinearGradient>
  </TouchableOpacity>
}

const mapStateToProps = ({ user, config }: { user: any, config: any }) => {
  return { user, config }
}
export default connect(mapStateToProps)(BdtButton)
