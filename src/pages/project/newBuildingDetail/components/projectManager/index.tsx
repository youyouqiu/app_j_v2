import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, Linking, LayoutChangeEvent } from 'react-native'
import style from '../../style'
import { IResident, IProjectDetail } from '@/services/typings/project'
import service from '@/services/projectService'
import { drop } from 'lodash'
import BuryPoint from '@/utils/BuryPoint'

interface IProjectManagerProps {
  residentList?: IResident[]
  onLayout?: (e: LayoutChangeEvent) => void
  buildingDetail?: IProjectDetail
}

interface IProjectManagerState {
  residentList?: IResident[]
  showHideStatus: boolean
  hideStatus: boolean
}

class ProjectManager extends PureComponent<IProjectManagerProps, IProjectManagerState> {

  constructor(props: IProjectManagerProps) {
    super(props)
    this.state = {
      residentList: [],
      showHideStatus: false,
      hideStatus: true // true 是展开  false是收起
    }
  }

  static getDerivedStateFromProps(nextProps: IProjectManagerProps, prevState: IProjectManagerState) {
    const { residentList } = nextProps;
    if (JSON.stringify(residentList) !== JSON.stringify(prevState.residentList)) {
      return {
        residentList,
        showHideStatus: residentList && (residentList?.length > 1)
      };
    }
    return null;
  }

  collect = (item: IResident) => {
    const { buildingDetail } = this.props
    BuryPoint.add({
      page: '楼盘详情页',
      target: '联系项目经理_button',
      action_param: {
        buildingTreeId: buildingDetail?.buildingTreeId || ''
      }
    })
    item?.phone && Linking.openURL('tel:' + item.phone)
    service.addResidentQuiry({ userId: item.id, buildingTreeId: buildingDetail?.buildingTreeId || '' })
  }

  renderItem = (item: IResident, index: number) => {
    const { onLayout } = this.props
    return (
      <View onLayout={onLayout} key={index}
        style={[style['flexRow'], style['justifyBetween'], style['alignCenter'], index === 0 ? {} : style['xmjlItem']]}>
        <View style={[style['flexRow'], style['alignCenter']]}>
          {
            item.avatar
              ?
              <Image style={[style['userIcon']]} source={{ uri: item.avatar }} />
              :
              <View style={[style['userIconView']]}>
                <Text style={[style['userIconText']]}>
                  {drop(item.trueName, item.trueName.length - 2)}
                </Text>
              </View>

          }
          <View style={[style['flexCloum'], style['justifyBetween']]}>
            <Text style={[style['font-32']]}>{item.trueName}</Text>
            <Text style={[style['font-28']]}>{item.viewCount}<Text style={[style['grayText']]}>人咨询过TA</Text></Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => { this.collect(item) }} style={[style['flexRow'], style['alignCenter'], style['justifyAround'], style['callXmjl']]}>
          <Image style={style['callPhone']} source={require('@/images/icons/project/project_phone.png')} />
          <Text style={[style['font-28'], style['blueText']]}>联系TA</Text>
          {/* <Image /> */}
        </TouchableOpacity>
      </View>
    )
  }

  setHideStatus = () => {
    this.setState({
      hideStatus: !this.state.hideStatus
    })
  }

  render(): Element {
    const { residentList = [] } = this.props
    const { showHideStatus, hideStatus } = this.state
    let realResidentList = hideStatus ? residentList.slice(0, 1) : residentList
    return (
      <View style={style['projectManagerWrapper']}>
        <View style={style['itemContent']}>
          <View style={[style['flexRow'], style['alignCenter'], style['itemTitle']]}>
            <View style={style['headerLeftLine']} />
            <Text style={style['font-32']}>项目经理</Text>
          </View>
          <View>
            {
              realResidentList.map((item: any, index: number) => {
                return this.renderItem(item, index)
              })
            }
            {
              showHideStatus
                ?
                <TouchableOpacity activeOpacity={0.8} style={[style['managerType']]} onPress={this.setHideStatus}>
                  <Text style={[style['font-24'], style['grayText']]}>{hideStatus ? '展开' : '收起'}({residentList?.length})</Text>
                  <Image source={hideStatus ? require('@/images/icons/project/arrow_down.png') : require('@/images/icons/project/arrow_up.png')} />
                </TouchableOpacity>
                :
                null
            }
          </View>
        </View>
      </View>
    )
  }
}

export default ProjectManager
