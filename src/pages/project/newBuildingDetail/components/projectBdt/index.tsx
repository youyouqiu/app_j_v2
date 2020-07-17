import React, {PureComponent, FC} from 'react'
import {View, ImageBackground, Text, TouchableOpacity, Image} from 'react-native' 
import style from '../../style'
import {IAibdtEbtrance } from '@/services/typings/project'

const ICONS = {
  '潜力之星': require('@/images/icons/project/qlzx.png'),
  '市场热门': require('@/images/icons/project/scrm.png'),
  '强力推荐': require('@/images/icons/project/qltj.png'),
}

interface IProjectBdtProps {
  onPress: () => Promise<void>
  aibdtEbtrance?: IAibdtEbtrance
}

interface IProjectBdtState {
}

class ProjectBdt extends PureComponent<IProjectBdtProps, IProjectBdtState> {

  constructor (props: IProjectBdtProps) {
    super(props)
    this.state = {
    }
  }

  render ():Element {
    const {aibdtEbtrance} = this.props
    return <View>
      <TouchableOpacity onPress={aibdtEbtrance ? this.props.onPress : () => {}} style={[style['itemContent'], style['projectBdt']]}>
        <ImageBackground source={require('@/images/pictures/bdtBg.png')} style={[style['bdtBg'], style['flexRow']]}>
          {
            aibdtEbtrance
            ?
            <View style={[style['bdtBg'], style['flexRow'], style['bdtBgItem']]}>
              <View style={style['bdtEvaluation']}>
                <View style={[style['flexRow'], style['bdtEvaluationItem']]}>
                  <Text style={style['bdtEvaluationLabel']}>此项目综合评价</Text>
                  <View style={style['flexRow']}>
                    <Image style={style['bdtEvaluationIcon']} source={ICONS[aibdtEbtrance.evaluate]}/>
                    <Text style={style['bdtEvaluationValue']}>{aibdtEbtrance.evaluate}</Text>
                  </View>
                </View>
                <View style={[style['flexRow'], style['bdtEvaluationItem']]}>
                  <Text style={style['bdtEvaluationLabel']}>租金最高业态</Text>
                  <Text style={style['bdtEvaluationValue']}>{aibdtEbtrance?.formatName}</Text>
                </View>
                <View style={[style['flexRow'], style['bdtEvaluationItem']]}>
                  <Text style={style['bdtEvaluationLabel']}>周边最高租金</Text>
                  <Text style={style['other']}>？？？</Text>
                </View>
              </View>
              <View style={style['lookRent']}>
                <Text style={style['lookRentText']}>点击查看租金</Text>
                <Image style={style['bdtHand']} source={require('@/images/icons/project/hand.png')}/>
              </View>
            </View>
            :
            <View style={[style['bdtBg'], style['flexRow'], style['bdtBgItem']]}>
              <View style={[style['bdtEvaluation'], style['noDataContent']]}>
                <View>
                  <Text style={style['yellowText']}>小铺正在采集数据...</Text>
                </View>
                <View>
                  <Text style={style['yellowText']}>敬请期待</Text>
                </View>
              </View>
            </View>
          }
        </ImageBackground>
      </TouchableOpacity>
    </View>
  }
}

export default ProjectBdt
