import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {scaleSize} from '../../../utils/screenUtil';
import {connect} from 'react-redux';
import {checkPermission} from '../../../utils/utils'
import BaseContainer from '../../../components/Page'
import {FlatList} from 'react-native-gesture-handler';
import styles from './styles'
import Toast from "teaset/components/Toast/Toast";


class cityList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cityList: props.global.cityList,
            cityName: props.global.cityName,
            cityCode: props.global.cityCode,
            locationLoading: false,
            renderFrom: ''
        }
    }

    _setState = (params) => {
        this.setState({
            ...params,
            renderFrom: 'state'
        })
    };

    componentDidMount() {
        if (this.props.CityLists) {
            this.setState({
                currentCity: this.props.currentCity
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.renderFrom === 'state') {
            return {
                ...prevState,
                renderFrom: ''
            }
        } else {
            return {
                ...prevState,
                cityName: nextProps.global.cityName,
                cityCode: nextProps.global.cityCode,
                renderFrom: 'props'
            }
        }
    }

    componentDidUpdate(prevProps) {
        const {cityCode, cityName, locationLoading, renderFrom} = this.state;
        if (cityCode !== prevProps.global.cityCode) {
            if (locationLoading) {
                Toast.message('已定位到当前城市：' + cityName);
                this._setState({locationLoading: false})
            }
        } else if (cityCode === prevProps.global.cityCode && renderFrom === 'props') {
            if (locationLoading) {
                Toast.message('已定位到当前城市：' + cityName);
                this._setState({locationLoading: false})
            }
        }
    }

    getLocation = async () => {
        const response = await checkPermission('location');
        if (response) {
            const {dispatch} = this.props;
            this._setState({locationLoading: true});
            dispatch({type: 'location/getLocationInfo'});
        }
    };

    changeCity = (cityItem) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'global/changeCity',
            payload: {
                cityName: cityItem.name,
                cityCode: cityItem.code,
            }
        });
        this.props.navigation.goBack();
    };

    _renderItemSeparatorComponent = () => <View bgColor='#EEEFF5' height={scaleSize(2)}/>;

    _renderItem = (item) => {
        return (
            <View style={styles.Opening_city}>
                <TouchableOpacity onPress={() => this.changeCity(item)}>
                    <Text style={{fontSize: scaleSize(28), color: '#4D4D4D', lineHeight: scaleSize(109)}}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        const {cityList, currentCity, cityName, locationLoading} = this.state;
        return (

            <BaseContainer title='城市切换' viewBackgroundColor={'#F8F8F8'}>
                <View style={styles.current}>
                    <Text style={styles.current_txt}>当前城市</Text>
                    <View style={styles.current_city}>
                        <TouchableOpacity style={{width: '60%'}}>
                            <Text style={styles.current_cityName}>{cityName || '定位失败'}</Text>
                        </TouchableOpacity>
                        {(currentCity || {}).code === '0000' ? (
                            <View style={styles.padL}>
                                <Text style={{fontSize: scaleSize(28), color: '#CBCBCB'}}>当前城市未开通</Text>
                            </View>
                        ) : null}

                        {locationLoading ? (
                            <Text style={styles.cl_refreshLocationIng}>定位中...</Text>
                        ) : (
                            <View style={styles.padL}>
                                <TouchableOpacity onPress={() => this.getLocation()} style={styles.cl_refreshTouch}>
                                    <Image source={require('../../../images/icons/loction.png')} style={styles.cl_refreshLocationIcon}/>
                                    <Text style={styles.cl_refreshLocation}>重新定位</Text>
                                </TouchableOpacity>
                            </View>
                        )}


                    </View>
                </View>
                <View style={styles.Opening}>
                    <Text style={styles.Opening_txt}>已开通城市</Text>
                    <FlatList data={cityList}
                              renderItem={({item}) => this._renderItem(item)}
                              keyExtractor={(item, index) => item + index.toString()}
                              ItemSeparatorComponent={this._renderItemSeparatorComponent}/>
                </View>
            </BaseContainer>
        )
    }
}


const mapStateToProps = ({config, global}) => {
    return {config, global}
};


export default connect(mapStateToProps)(cityList);

