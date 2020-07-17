import React, {PureComponent} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, LayoutChangeEvent, Platform, StatusBar, Modal, ImageBackground, ScrollView} from 'react-native'
import style from '../../style'
import {Label, Line} from '@/components/new-space'
import {scaleSize, deviceWidth} from '@/utils/screenUtil'
import {Carousel} from '@new-space/teaset'
import {IProjectDetail, IBuildingTreeFiles, IFiltItem} from '@/services/typings/project'
import {NavigationScreenProps} from 'react-navigation'
// import buildJson from '../../buildJson'
import ImageViewer from '@new-space/react-native-image-zoom-viewer'
import {fileIcons} from '../../buildJson'
import moment from 'moment'

interface IHeaderInfoProps extends NavigationScreenProps {
  buildingDetail?: IProjectDetail
  gotoShopList?: () => Promise<void>
  gotoMarket?: () => Promise<void>
  onLayout: (e: LayoutChangeEvent) => void
  filesInfo?: IBuildingTreeFiles
  marketingList?: IFiltItem[]
  saleControl: boolean
  userStatus?: any
}

interface IHeaderInfoState {
  imageViewerVisible: boolean
  imageViewerIdx: number
}

class HeaderInfo extends PureComponent<IHeaderInfoProps, IHeaderInfoState> {

  constructor(props: IHeaderInfoProps) {
    super(props)
    this.state = {
      imageViewerVisible: false,
      imageViewerIdx: 0
    }
  }

  gotoPhotos = () => {
    const {navigation, buildingDetail} = this.props
    navigation?.navigate('buildingDetailPhotos', {
      buildingId: buildingDetail?.buildingTreeId,
      buildingName: buildingDetail?.fullName,
    })
  }

  imageViewerToggle = (idx?: number) => {
    if (Platform.OS === 'android') {
      if (!this.state.imageViewerVisible) {
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor('#000', true);
      } else {
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setBackgroundColor('rgba(255,255,255,0)', true);
      }
    }
    this.setState(prevState => ({
      imageViewerVisible: !prevState.imageViewerVisible,
      imageViewerIdx: typeof idx === 'number' ? idx : 0
    }))
  };

  scanData = (url: string, fileName: string, item: any) => {
    const {navigation, buildingDetail} = this.props
    navigation.push('xkjWebView', {
      title: fileName,
      // url: Platform.OS === 'android' ? (item.fileExt === 'pdf' ? `file:///android_asset/pdf.html?${url}` : `https://view.officeapps.live.com/op/view.aspx?src=${url}`) : url,
      url: Platform.OS === 'android' ? `https://view.officeapps.live.com/op/view.aspx?src=${url}` : url,
    })
  };

  render(): Element {
    const {buildingDetail, gotoShopList, gotoMarket, onLayout, filesInfo, marketingList = [], saleControl, userStatus} = this.props
    const {imageViewerVisible, imageViewerIdx} = this.state
    const {treeLabels = ''} = buildingDetail || {}
    const {images = [], imageCount = 0} = filesInfo || {}
    const imagesView = images.map(item => {
      return {url: item?.images?.ORIGINAL || '', props: {resizeMethod: 'resize', resizeMode: 'center'}}
    })

    const treeLabelArr = treeLabels ? treeLabels.split(',').slice(0, 3) : []
    return <View style={style['headerInfo']} onLayout={onLayout}>
      <View>
        <Carousel control cycle={false} style={{height: 470 * deviceWidth / 750}}>
          {
            imageCount !== 0
              ?
              images?.map((item, idx) => {
                return (<TouchableOpacity activeOpacity={1} onPress={() => this.imageViewerToggle(idx)} key={idx}>
                    <Image style={style['headerInfoImage']} resizeMode='cover' source={{uri: item?.images?.MEDIUM || item?.images?.ORIGINAL}}/>
                  </TouchableOpacity>
                )
              })
              :
              <Image style={style['headerInfoImage']} source={require('@/images/pictures/defaultBuildImg.png')}/>
          }
        </Carousel>
        {
          imageCount > 5 && (
            <TouchableOpacity
              activeOpacity={1}
              style={style['more-photos']}
              onPress={this.gotoPhotos}
            >
              <Text style={style['more-photos-text']}>{`+${imageCount}`}</Text>
              <Text style={style['more-photos-text']}>更多相册</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <View style={[style['itemContent'], style['headerInfoWrapper']]}>
        <Text style={style['buildName']}>{buildingDetail?.fullName}</Text>
        <View style={style['brageList']}>
          {
            buildingDetail?.projectType === 1
              ?
              <Image style={[style['exclusive'], style['labelItem']]} source={require('@/images/icons/project/exclusive.png')}/>
              :
              null
          }
          <Label.BuildingSaleStatus _key={buildingDetail?.saleStatus || 1}/>
          <Label.TreeCategory _key={buildingDetail?.treeCategory || 1}/>
          {
            treeLabelArr.map((item: string, index: number) => {
              return <Label key={index} style={style['labelItem']} _key={item}/>
            })
          }
        </View>
        <View style={style['content']}>
          <View style={style['contentRight']}>
            <View style={style['contentItem']}>
              <Text style={[style['contentItemText'], style['redText']]}>{buildingDetail?.minPrice || 0}<Text
                style={[style['unitText'], style['redText']]}>万/套起</Text></Text>
              <Text style={style['contentItemLabel']}>参考总价</Text>
            </View>
            <View>
              <Line height={scaleSize(75)} width={StyleSheet.hairlineWidth} backgroundColor='#CBCBCB'/>
            </View>
            <View style={style['contentItem']}>
              <Text style={[style['contentItemText'], style['blackText']]} numberOfLines={1}>{buildingDetail?.minAcreage || 0}-{buildingDetail?.maxAcreage || 0}<Text
                style={[style['unitText'], style['blackText']]}>㎡</Text></Text>
              <Text style={style['contentItemLabel']}>建面范围</Text>
            </View>
            <View>
              <Line height={scaleSize(75)} width={StyleSheet.hairlineWidth} backgroundColor='#CBCBCB'/>
            </View>
          </View>
          <View style={style['contentLeft']}>
            <Text style={[style['contentItemText'], style['blackText']]}>{buildingDetail?.shopsStock || 0}/{buildingDetail?.writeShopsNumber || 0}<Text
              style={[style['unitText'], style['blackText']]}>套</Text></Text>
            <Text style={style['contentItemLabel']}>在售/总套数</Text>
          </View>
        </View>
        <View style={[style['flexCloum'], style['discount']]}>
          {
            buildingDetail?.commission
              ?
              <View style={[style['flexRow'], style['discountItem'], style['alignCenter']]}>
                <Text style={[style['font-28'], style['redText'], style['discountItemText']]}>佣金</Text>
                <Text style={[style['font-28'], style['discountItemValue']]}>{userStatus == 202 ? '🔐加入经纪公司后可见' : buildingDetail?.commission}</Text>
              </View>
              :
              null
          }
          {
            (buildingDetail?.takelookreward || buildingDetail?.dealreward)
              ?
              <View style={[style['flexRow'], style['discountItem'], style['alignCenter']]}>
                <Text style={[style['font-28'], style['redText'], style['discountItemText']]}>奖励</Text>
                <Text style={[style['font-28'], style['discountItemValue']]}>{buildingDetail?.takelookreward} {buildingDetail?.dealreward}</Text>
              </View>
              :
              null
          }
          {
            buildingDetail?.preferentialPolicies
              ?
              <View style={[style['flexRow'], style['discountItem']]}>
                <Text style={[style['font-28'], style['pinkText'], style['discountItemText']]}>优惠</Text>
                <Text style={[style['font-28'], style['discountItemValue']]}>{buildingDetail?.preferentialPolicies}</Text>
              </View>
              :
              null
          }
        </View>

        {/**销控，销讲资料*/}
        <ScrollView horizontal style={[style['flexRow']]} showsHorizontalScrollIndicator={false}>
          {saleControl ? (
            <TouchableOpacity activeOpacity={0.8}
                              onPress={gotoShopList}
                              style={[style['flexRow'], style['alignCenter'], style['justifyCenter'], style['fyxk']]}>
              <ImageBackground style={[style['fyxkBack']]} source={require('@/images/pictures/fyxk.png')}>
                <Text style={[style['tzxkText']]}>图纸实时销控</Text>
              </ImageBackground>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.8}
                              onPress={gotoShopList}
                              style={[style['flexRow'], style['alignCenter'], style['justifyCenter'], style['fyxk']]}>
              <View style={[style['fyxkBack'], style['fyxkTwo']]}>
                <Image style={style['fyxkIcon']} source={require('@/images/icons/project/fyxkIcon.png')}/>
                <Text style={[style['fyxkText']]}>房源实时销控</Text>
              </View>
            </TouchableOpacity>
          )}
          {marketingList?.length > 0 ? marketingList.map(item => (
            <TouchableOpacity onPress={() => this.scanData(item.fileUrl, item.fileName, item)} activeOpacity={0.8} style={[style['hasxjzl']]}>
              <Image style={[style['headerBtnItemImg']]} source={fileIcons[item.fileExt.replace('.', '')]}/>
              <Text numberOfLines={2} style={[style['font-22'], style['blackText'],style['textCenter']]}>{item.fileName}</Text>
              <Text style={[style['font-22'], style['grayText']]}>{moment(item.createTime).format('YYYY-MM-DD')}更新</Text>
            </TouchableOpacity>
          )) : (
            <View style={[style['flexCloum'], style['alignCenter'], style['justifyCenter'], style['headerBtnItem'], style['xjzl']]}>
              <Image style={[style['headerBtnItemImg'], style['headerNoBtnImg']]} source={require('@/images/icons/project/sjxjzl.png')}/>
              <Text style={[style['font-22'], style['grayText']]}>小铺正在收集销讲资料…</Text>
            </View>
          )}

        </ScrollView>
        <Modal visible={imageViewerVisible} transparent={true} onRequestClose={this.imageViewerToggle} animationType='fade'>
          <ImageViewer imageUrls={imagesView} index={imageViewerIdx} saveToLocalByLongPress={false}/>
          <TouchableOpacity activeOpacity={0.8} style={[style['closeTouch']]} onPress={() => {
            this.imageViewerToggle()
          }}>
            <Image style={[style['closeImage']]} source={require('@/images/icons/project/close_white.png')}/>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  }
}

export default HeaderInfo
