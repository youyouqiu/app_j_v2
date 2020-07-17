import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { scaleSize } from '../../../utils/screenUtil';
import { connect } from 'react-redux';
import { checkPermission } from '../../../utils/utils'
import BaseContainer from '../../../components/Page'
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles'
import Toast from "@new-space/teaset/components/Toast/Toast";
import { getLocationInfo } from "@/pages/project/common";
import BuryPoint from '@/utils/BuryPoint'

class cityList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      cityName: '',
      cityCode: '',
      locationLoading: false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      cityName: nextProps.projectLocation.cityName,
      cityCode: nextProps.projectLocation.cityCode,
      defaultCityName: nextProps.projectLocation.defaultCityName,
      defaultCityCode: nextProps.projectLocation.defaultCityCode,
      cityList: nextProps.projectLocation.cityList,
    };
  }

  componentDidMount() {
    if (this.state.cityList.length === 0) {
      const { dispatch } = this.props;
      dispatch({ type: 'projectLocation/getCityList' })
    }
  }

  getLocation = async () => {
    const response = await checkPermission('location');
    if (response) {
      const { dispatch } = this.props;
      this.setState({ locationLoading: true });
      const result = await getLocationInfo({ cityList: this.state.cityList }).catch(err => {
        console.log('获取定位失败：', err)
      });
      if (!result) return;
      console.log('result', result);
      const { cityName, cityCode, lat, lng } = result;
      let payloadData = null;
      if (result.cityCode) {
        Toast.message('已定位到当前城市：' + cityName);
        payloadData = { cityName, cityCode, lat, lng }
      } else {
        Toast.message('定位失败，为您切换到：' + this.state.defaultCityName);
        payloadData = {
          cityCode: this.state.defaultCityCode,
          cityName: this.state.defaultCityName
        }
      }
      dispatch({
        type: 'projectLocation/changeCityInfo',
        payload: payloadData
      });
      this.setState({ locationLoading: false });
    }
  };

  changeCity = (cityItem) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectLocation/changeCityInfo',
      payload: {
        cityName: cityItem.name,
        cityCode: cityItem.code,
      }
    });
    BuryPoint.add({
      page: '首页',
      target: '城市列表_item',
      action: 'click',
      action_param: {
        cityName: cityItem.name,
      }
    })
    this.props.navigation.goBack();
  };

  _renderItemSeparatorComponent = () => <View bgColor='#EEEFF5' height={scaleSize(2)} />;

  _renderItem = (item) => {
    return (
      <View style={styles.Opening_city}>
        <TouchableOpacity onPress={() => this.changeCity(item)}>
          <Text style={{ fontSize: scaleSize(28), color: '#4D4D4D', lineHeight: scaleSize(109) }}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
  };

  render() {
    const { cityList, currentCity, cityName, locationLoading } = this.state;
    console.log('cityName', cityName);
    return (

      <BaseContainer title='城市切换' viewBackgroundColor={'#F8F8F8'}>
        <View style={styles.current}>
          <Text style={styles.current_txt}>当前城市</Text>
          <View style={styles.current_city}>
            <TouchableOpacity style={{ width: '60%' }}>
              <Text style={styles.current_cityName}>{cityName || '定位失败'}</Text>
            </TouchableOpacity>
            {(currentCity || {}).code === '0000' ? (
              <View style={styles.padL}>
                <Text style={{ fontSize: scaleSize(28), color: '#CBCBCB' }}>当前城市未开通</Text>
              </View>
            ) : null}

            {locationLoading ? (
              <Text style={styles.cl_refreshLocationIng}>定位中...</Text>
            ) : (
                <View style={styles.padL}>
                  <TouchableOpacity onPress={() => this.getLocation()} style={styles.cl_refreshTouch}>
                    <Image source={require('../../../images/icons/loction.png')} style={styles.cl_refreshLocationIcon} />
                    <Text style={styles.cl_refreshLocation}>重新定位</Text>
                  </TouchableOpacity>
                </View>
              )}


          </View>
        </View>
        <View style={styles.Opening}>
          <Text style={styles.Opening_txt}>已开通城市</Text>
          <FlatList data={cityList}
            renderItem={({ item }) => this._renderItem(item)}
            keyExtractor={(item, index) => item + index.toString()}
            ItemSeparatorComponent={this._renderItemSeparatorComponent} />
        </View>
      </BaseContainer>
    )
  }
}


const mapStateToProps = ({ config, projectLocation }) => {
  return { config, projectLocation }
};


export default connect(mapStateToProps)(cityList);

