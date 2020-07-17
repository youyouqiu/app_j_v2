import React, {RefObject} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Page from '../../../components/Page';
import styles from './styles'
import projectService from '../../../services/projectService';
import {scaleSize} from '@/utils/screenUtil';
import {Toast, Alert} from '@new-space/teaset';
// import ShopListSkeleton from '@/components/skeleton/components/ShopListSkeleton';
import {cloneDeep} from 'lodash'
import {
  IBuildingNoDetailType,
  IShopListPropsType,
  IFloorItem,
  IShopListStateType,
  IshopFilterType,
  IShopResponse
} from "@/pages/project/shopList/types";
import {ResponseCommon} from "@/services/typings/types";
import ScrollableTabView, {ChangeTabProperties, ScrollableTabBar} from '@new-space/react-native-scrollable-tab-view';
import BuildingNoDetail from "@/pages/project/shopList/components/buildingNoDetail";
import PriceChoiceModal from "@/businessComponents/choice/priceChoice/priceChoiceModal";
import AreaChoiceModal from "@/businessComponents/choice/areaChoice/areaChoiceModal";
import ChoicePrice from "@/businessComponents/choice/priceChoice/priceChoice";
import ChoiceArea from "@/businessComponents/choice/areaChoice/areaChoice";
import Selector from '@/components/Selector'
import { IModalPriceChoiceOnChangeType } from '@/businessComponents/choice/priceChoice/types'
import {IChoiceLabelDataPropsType} from "@/businessComponents/LabelGroup/types";
import SaleControlDetails from './components/saleControlDetails'
import Orientation, {OrientationType} from 'react-native-orientation-locker'
import * as WeChat from 'xkj-react-native-wechat';
import {debounceLast, debounce} from '@/utils/utils'
// import { debounce } from 'lodash';

class ShopList extends React.Component<IShopListPropsType, IShopListStateType> {

  tabRef : any = null;

  dontScroll: boolean = false

  constructor(props: IShopListPropsType) {
    super(props);
    this.state = {
      buildingNoList: [],
      drawingNoList: [],
      lastActiveFloor: '',
      choiceOption: {
        buildingTreeId: props.navigation?.state?.params?.buildingTreeId || '',
        pageIndex: 0,
        pageSize: 999
      },
      showSkeleton: true,
      loading: false,
      imgloading:false,
      visible: false,
      buildingTreeId: props.navigation?.state?.params?.buildingTreeId || '',
      fullName: props.navigation?.state?.params?.fullName || '',
      saleControl: props.navigation?.state?.params?.saleControl || false,
      floorList: [],
      shopInfoLoading:true,
      drawingFloorList: [],
      shopInfo: {}
    };
  }

  componentDidMount() {
    this.getBuildingNoList(true);
    Orientation.unlockAllOrientations()
    Orientation.addOrientationListener(this.orientationDidChang)
  };

  componentWillUnmount(){
    Orientation.lockToPortrait()
    Orientation.removeOrientationListener(this.orientationDidChang)
  }


  orientationDidChang = (orientation: OrientationType) => {
    const {floorList, buildingTreeId} = this.state
    const activeFloor = floorList.find(item => item.active)
    this.props.sendPoint.add({
      target: '图纸销控旋转监听',
      page: '房源-图纸销控',
      action_param: {
        activeFloor: activeFloor,
        buildingTreeId: buildingTreeId,
        orientation: orientation
      }
    })
    if (activeFloor?.isDrawing) {
      if (orientation === 'LANDSCAPE-LEFT') {
        !this.state.visible && this.setState({visible: true});
      } else if (orientation === 'LANDSCAPE-RIGHT') {
        !this.state.visible && this.setState({visible: true});
      } else {
        this.setState({visible: false});
      }
    }
  }

  getBuildingNoList = async (isInit?: boolean) => {
    const {choiceOption, buildingTreeId} = this.state
    try {
      await this.setState({loading: true})
      if (buildingTreeId) {
        // delete choiceOption.buildingNos
        // delete choiceOption.floors
        const requestData = {...choiceOption}
        delete requestData.buildingNos
        delete requestData.floors
        const response: ResponseCommon<Array<IBuildingNoDetailType>> = await projectService.buildingNoListReq(requestData);
        let {code, extension = []} = response;
        if (isInit) {
          let drawing = extension.filter(item => item.isDrawing)
          this.setState({
            drawingNoList: drawing
          })
        }
        if (code === '0') {
          this.setState({
            buildingNoList: extension,
            showSkeleton: false
          }, async () => {
            if (extension.length > 0) {
              choiceOption.buildingNos = choiceOption.buildingNos || extension[0].buildingNo;
              await this.setState({ choiceOption })
              await this.getBuildingFloorList()
            }
          });
        } else {
          Toast.message('获取商铺失败！');
          this.setState({
            showSkeleton: false
          })
        }
      } else {
        Toast.message('参数错误');
        this.setState({
          showSkeleton: false
        })
      }
    } catch (e) {

    } finally {
      await this.setState({loading: false})
    }

  };

  getBuildingFloorList = async (lastActiveFloor?: string) => {
    const {choiceOption = {}} = this.state
    delete choiceOption.floors
    try {
      const response: ResponseCommon<Array<IFloorItem>> = await projectService.getBuildingFloorList(choiceOption);
      let {extension, code} = response
      if (extension?.length > 0) {
        let drawing = extension.filter(item => item.isDrawing)
        this.setState({
          drawingFloorList: drawing
        })
        if (!lastActiveFloor) {
          let i = extension.findIndex(item => item.count > 0)
          i = (i === -1 ? 0 : i)
          extension[i].active = true
          choiceOption.floors = extension[i].floor
        } else {
          let i = extension.findIndex(item => item.floor === lastActiveFloor)
          i = (i === -1 ? 0 : i)
          extension[i].active = true
          choiceOption.floors = lastActiveFloor
        }
      }
      if (code === '0') {
        console.log(2)
        this.setState({
          floorList: cloneDeep(extension),
          choiceOption
        }, () => {
          if(extension.length > 0) {
            this.getShopList()
          }
        })
      }
    } catch (e) {
    }
  }

  getShopList = async () => {
    const {choiceOption} = this.state
    try {
      await this.setState({imgloading: true})
      const response: ResponseCommon<IShopResponse> = await projectService.getBuildingShopList(choiceOption);
      const {code, extension} = response;
      if (code === '0') {
        this.setState({
          shopInfo: extension,
          shopInfoLoading:false,
        })
      }
    } catch (e) {

    } finally {
      await this.setState({imgloading: false})
    }
  }

  onChangeTab = (e: ChangeTabProperties) => {
    // console.log(3, e.ref.props['data-key'])
    if (this.dontScroll) {
      this.dontScroll = false
      return
    }
    const {choiceOption, lastActiveFloor} = this.state
    choiceOption.buildingNos = e.ref.props['data-key'];
    this.setState({
      choiceOption,
      lastActiveFloor: ''
    }, () => {this.getBuildingFloorList(lastActiveFloor)})
  };

  share = () => {
    const {choiceOption, fullName, floorList, buildingTreeId} = this.state;
    const {requestUrl, user} = this.props
    const activeFloor = floorList.find(item => item.active)
    const activeBuildingNo = choiceOption?.buildingNos
    let shareData = {
      type: 'news',
      title: `${user.trueName}分享了${fullName}实时图纸销控`,
      thumbImage: encodeURI(`${this.props.requestUrl.api}/v2/api/shops/sellchart?buildingTreeId=${buildingTreeId}&buildingNo=${activeBuildingNo}&FloorNo=${activeFloor?.floor}&time=${new Date().getTime()}`),
      description: `点击查看${fullName}实时图纸销控`,
      webpageUrl: `${requestUrl.AIurl}/drawing/?btid=${buildingTreeId}&name=${fullName}`
    };
    WeChat.shareToSession(shareData);
  };

  rightView = (
    <TouchableOpacity activeOpacity={0.8} onPress={this.share} style={{paddingRight: scaleSize(16)}}>
      <Image source={require('@/images/icons/project/share_black.png')} style={{width: scaleSize(40), height: scaleSize(40)}}/>
    </TouchableOpacity>
  );

  priceOnConfirm = (params: IModalPriceChoiceOnChangeType) => {
    const {total, unit} = params;
    let _shopTotalPrices: Array<IshopFilterType> = [];
    let _shopUnitPrices: Array<IshopFilterType> = [];
    if (total.length > 0) {
      total.map((v) => {
        const valueArr = v.value.toString().split('-');
        //处理多少平以上这种数据
        if (valueArr.length === 2) {
          const shopTotalPrice: IshopFilterType = {
            min: parseFloat(valueArr[0]),
            max: parseFloat(valueArr[1])
          };
          _shopTotalPrices.push(shopTotalPrice)
        } else {
          const shopTotalPrice: IshopFilterType = {
            min: parseFloat(valueArr[0]),
            max: 0x7fffffff
          };
          _shopTotalPrices.push(shopTotalPrice)
        }
      });
    } else {
    }
    if (unit.length > 0) {
      unit.map((v) => {
        const valueArr = v.value.toString().split('-');
        //处理多少平以上这种数据
        if (valueArr.length === 2) {
          const shopUnitPrice: IshopFilterType = {
            min: parseFloat(valueArr[0]) * 10000,
            max: parseFloat(valueArr[1]) * 10000
          };
          _shopUnitPrices.push(shopUnitPrice)
        } else {
          const shopUnitPrice: IshopFilterType = {
            min: parseFloat(valueArr[0]) * 10000,
            max: 0x7fffffff
          };
          _shopUnitPrices.push(shopUnitPrice)
        }
      });
    } else {
    }
    this.setState({
      choiceOption: {
        ...this.state.choiceOption,
        ...params,
        totalPriceArray: _shopTotalPrices,
        unitPriceArray: _shopUnitPrices
      }
    }, this.getBuildingNoList)
  }

  areaOnConfirm = (params: IChoiceLabelDataPropsType[]) => {
    const shopAreas = [] as Array<IshopFilterType>;
    params.map((v, i) => {
      const shopAreasItemArr: Array<string> = v.value.toString().split('-');
      const shopAreasItem: IshopFilterType = {
        min: parseFloat(shopAreasItemArr[0]),
        max: parseFloat(shopAreasItemArr[1] || 0x7fffffff.toString())
      };
      shopAreas.push(shopAreasItem);
    });
    this.setState({
      choiceOption: {
        ...this.state.choiceOption,
        area: params,
        buildingAreasArray: shopAreas
      }
    }, this.getBuildingNoList)
  }

  handleFilter2Change = (params: any) => {
    let arr: number | null = null
    switch(params.value) {
      case 0: arr = null; break
      case 1: arr = 2; break
      case 2: arr = 10; break
    }
    this.setState({
      choiceOption: {
        ...this.state.choiceOption,
        saleStatus: arr
      }
    }, () => {
      this.getBuildingNoList()
    })
  }

  closeModal = (buildNo: string, floorNo: string) => {
    const { choiceOption } = this.state
    this.setState({
      visible: false,
      lastActiveFloor: floorNo,
      choiceOption: {
        ...choiceOption,
        buildingNos: buildNo,
      }
    }, () => {
      Orientation.lockToPortrait()
    })
    const {buildingNoList} = this.state
    const index = buildingNoList.findIndex(it => it.buildingNo === buildNo)
    this.tabRef?.goToPage(index, 'third')
  }

  onPressFloor = (item: IFloorItem) => {
    const {floorList, choiceOption} = this.state
    const newFloorList = floorList.map(it => {
      it.active = false
      if (it.floor === item.floor) {
        it.active = true
        choiceOption.floors = it.floor
      }
      return it
    })
    console.log('1')
    this.setState({
      floorList: newFloorList,
      choiceOption
    }, this.getShopList)
  }

  render() {
    const {buildingNoList, choiceOption, loading, visible, fullName, floorList, shopInfo, drawingNoList, drawingFloorList, buildingTreeId,shopInfoLoading} = this.state;
    const activeFloor = floorList.find(item => item.active)
    const activeBuildingNo = choiceOption?.buildingNos
    return (
      <Page title={fullName || ''} scroll={false} rightView={activeFloor?.isDrawing ? this.rightView : null}>
        <View style={styles['sr_screen_wrapper']}>
          <PriceChoiceModal
            totalPriceSelectValues={choiceOption.total}
            unitPriceSelectValues={choiceOption.unit}
            onConfirm={this.priceOnConfirm}
            label='价格'
            content={<ChoicePrice />}
          />
          <AreaChoiceModal
            areaSelectValues={choiceOption.area}
            onConfirm={this.areaOnConfirm}
            label='建面'
            content={<ChoiceArea />}
          />
          <Selector
            style={styles['filters-rank']}
            name='buildingTreeOderBy'
            onChange={this.handleFilter2Change}
            selection={[
              { label: '默认', value: 0 },
              { label: '在售', value: 1 },
              { label: '已售', value: 2 },
            ]}
          >
            {({ item, isOpen }) => <>
              <Text style={[styles['filters-rank-text'], isOpen ? { color: '#1F3070' } : null]} numberOfLines={1}>{item.value === 0 ? '售卖状态' : item.label}</Text>
              <Image style={styles['filters-rank-img']} source={isOpen ? require('@/images/icons/more_open.png') : require('@/images/icons/more_close.png')} />
            </>}
          </Selector>
        </View>
        {
          this.state.saleControl
          ?
          (
            activeFloor?.isDrawing
            ?
            <TouchableOpacity onPress={() => {
              this.dontScroll = true
              this.setState({visible: true}, () => {
                Orientation.lockToLandscapeLeft();
                this.props.sendPoint.add({
                  target: '图纸点击监听',
                  page: '房源-图纸销控',
                  action_param: {
                    activeFloor: activeFloor,
                    buildingTreeId: buildingTreeId,
                  }
                })
              });
            }}>
              {
                !this.state.imgloading
                ?
                <Image defaultSource={require('@/images/pictures/img_loading.png')} resizeMode='stretch' style={styles['fyxk']} source={{uri: `${this.props.requestUrl.api}/v2/api/shops/sellchart?buildingTreeId=${buildingTreeId}&buildingNo=${activeBuildingNo}&FloorNo=${activeFloor?.floor}&time=${new Date().getTime()}`}}/>
                :
                <View style={styles.fyxk}></View>
              }
            </TouchableOpacity>
            :
            <View style={[styles['noxkView']]}>
              <Image resizeMode='stretch' style={styles['noxk']} source={require('@/images/pictures/noxk.png')}/>
              <Text style={styles['noxkText']}>抱歉，暂未上传图纸</Text>
            </View>
          )
          :
          null
        }
        <View style={{flex: 1}}>
          {buildingNoList.length > 0 ? (
            <ScrollableTabView
              tabsContainerStyle={{backgroundColor: '#F4F5F9', justifyContent: 'flex-start'}}
              ref={e => this.tabRef = e}
              locked={true}
              renderTabBar={ScrollableTabBar}
              // @ts-ignore
              onChangeTab={(e) => {debounce(this.onChangeTab, 500)(e)}}
              acTiveTabStyle={{backgroundColor: '#fff', borderTopColor: '#1F3070', borderTopWidth: scaleSize(6)}}
              tabBarActiveTextColor='#1F3070'
              tabBarInactiveTextColor='#868686'
            >
              {
                buildingNoList.map((v) => {
                  if (loading){
                    return (
                      <View style={[styles['noShopData']]} data-value={{name: v.name}} data-key={v.buildingNo}>
                        <Text>数据正在加载中....</Text>
                      </View>
                    )
                  }
                  if (v.count === 0) {
                    return (
                      <View style={[styles['noShopData']]} data-value={{name: v.name}} data-key={v.buildingNo}>
                        <Image style={[styles['noShopDataImg']]} source={require('@/images/pictures/noShopData.png')}/>
                        <Text style={[styles['noShopDataText']]}>抱歉～小铺正在努力为您录入铺源</Text>
                      </View>
                    )
                  }
                  return <BuildingNoDetail choiceOption={choiceOption} shopInfo={shopInfo} onPressFloor={(item) => {this.onPressFloor(item)}} shopInfoLoading={shopInfoLoading} data-value={{name: v.name}} data-key={v.buildingNo} floorList={floorList || []}/>
                })
              }
            </ScrollableTabView>
          ) : null}
        </View>
        <SaleControlDetails
          buildingNoList={drawingNoList}
          activeBuildingNo={activeBuildingNo}
          onClosePress={this.closeModal}
          requestUrl={this.props.requestUrl}
          buildingTreeId={buildingTreeId}
          defaultFloorList={drawingFloorList}
          activeFloorNo={activeFloor?.floor}
          fullName={fullName}
          visible={visible}
          user={this.props.user}
        />
      </Page>
    )
  }
}

const mapStateToProps = ({config, global, dictionaries, point, user}: any) => {
  return {
    requestUrl: config.requestUrl,
    global, dictionaries,
    sendPoint: point.buryingPoint,
    user: user.userInfo
  }
};

export default connect(mapStateToProps)(ShopList)

export const BuildingStatusTips = () => {

  return (
    <View style={styles.tipsContent}>
      <Disorder color='#49A1FF' text='在售'/>
      <Disorder color='#FE5139' text='已售'/>
      <Disorder color='#D2D0D2' text='待售'/>
      <View style={styles.tipsRight}>
        <Image style={styles.subscriptionLock} source={require('../../../images/icons/subscriptionLock.png')}/>
        <Text style={styles.tipsRightText}>已认购 / 锁定</Text>
      </View>
    </View>
  )
};

export const Disorder = ({text, color}: any) => {
  return (
    <View style={styles.disorderItem}>
      <Text style={[styles.tipsCircular, {backgroundColor: color}]}/>
      <Text style={[styles.tipsStatusText, {color: color}]}>{text}</Text>
    </View>
  )
};
