import React, {PureComponent} from 'react'
import {View, Text, Image, ImageSourcePropType, LayoutChangeEvent} from 'react-native'
import style from '../../style'
import { FACILITIES } from '../../common'
import {IProjectDetail} from '@/services/typings/project'

interface IProjectFacilityProps {
  buildingDetail?: IProjectDetail
  onLayout?: (e: LayoutChangeEvent) => void
}

interface IProjectFacilityState {
}

const MatchItem = ({ text, icon}: {text: string, icon: ImageSourcePropType}) => {
  return (
      <View style={style['bd_matchItem']}>
          <Image style={style['bd_matchItemImage']} source={icon} />
          <Text style={[style['bd_matchItemLabel']]}>{text}</Text>
      </View>
  )
}

class ProjectFacility extends PureComponent<IProjectFacilityProps, IProjectFacilityState> {

  constructor (props: IProjectFacilityProps) {
    super(props)
    this.state = {
    }
  }

  render ():Element {
    const {buildingDetail = {}, onLayout} = this.props
    const {facility = [], treeCategory = 1} = buildingDetail
    let renderContent = []
    for (let key in FACILITIES) {
      const FACILITY = FACILITIES[key]
      if (FACILITY.type.has(treeCategory)) {
        const isValid = (facility.findIndex(item => item.facilityvalue ===key)) !== -1
        const text = FACILITY.label
        const icon = isValid ? FACILITY.icon1 : FACILITY.icon2
        renderContent.push(
          <MatchItem
            key={key}
            text={text}
            icon={icon}
          />
        )
      }
    }
    return <View onLayout={onLayout} style={style['projectFacilityWrapper']}>
      <View style={style['itemContent']}>
        <View style={[style['flexRow'], style['alignCenter'], style['justifyBetween'], style['itemTitle']]}>
          <View style={[style['flexRow'], style['alignCenter']]}>
            <View style={style['headerLeftLine']}/>
            <Text style={style['font-32']}>基础设施</Text>
          </View>
        </View>
        <View style={style['bd_matchItemContent']}>
          {renderContent}
        </View>
      </View>
    </View>
  }
}

export default ProjectFacility


