/**
 * 筛选组件
 */

import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import { scaleSize } from '../../utils/screenUtil'
import { screenStyles } from './style'
import ChoiceModal from '../../components/ChoiceModal/ChoiceModal'
import Sort from './sort'
import Theme from '@new-space/teaset/themes/Theme';
import Area from './content'
import { connect } from 'react-redux';

class Screen extends Component {
    titles = [
        { name: '区域', code: 'area', type: 'area' },
        { name: '排序', code: 'sort', type: 'sort' },
        { name: '筛选', code: 'screen', type: 'screen' },
    ];

    constructor(props) {
        super(props);
        this.state = {
            titles: this.titles,
            screenVisible: false,
            areaVisible: false,
            sortVisible: false,
            frameHeight: 0,
            selectSort: '',
            selectOption: {},
            selectArea: {}
        };
        this.selectData = {}
    }


    componentDidMount() {
        this.getDic()
    }
    // 切换title
    handleScreen = (item, index) => {
        let { titles } = this.state;
        let vVisible = `${item.type}Visible`;
        titles[index].isSelect = true
        this.setState({ titles, [vVisible]: true })
    };
    // 筛选
    submitOption = (item) => {
        this.selectData = {
            ...this.selectData,
            saleStatus: item.saleStatus ? [item.saleStatus] : [],
            buildingType: item.buildingType ? [item.buildingType] : [],
            ...this.setItem('area', item.area),
            ...this.setItem('price', item.price)
        }
        this.setState({ screenVisible: false, selectOption: item });
        this.props.onOk(this.selectData)
    }
    onClose = (type) => {
        this.setState({ [type]: false })
    }
    // 排序
    onSortChange = (item) => {
        this.selectData = {
            ...this.selectData,
            buildingSortField: item.value
        }
        this.setState({ sortVisible: false, selectSort: item.value })
        this.props.onOk(this.selectData)
    }

    // 区域
    onAreaChange = (item, selectArea) => {
        this.selectData = {
            ...this.selectData,
            district: item.parentId,
            area: item.code
        }
        this.setState({ areaVisible: false, selectArea });
        this.props.onOk(this.selectData)
    };

    // 处理最大最小值
    setItem = (type = '', value = '-') => {
        let values = value.split('-')
        type = type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
        let min = `min${type}`
        let max = `max${type}`
        return {
            [min]: values[0] || '',
            [max]: values[1] || ''
        }
    }
    // 获取筛选的数据
    getScreenData = () => {
        let nextProps = this.props;
        return {
            searchShopArea: nextProps.dictionaries.search_shops_area,
            projectType: nextProps.dictionaries.project_type,
            proSaleStatus: nextProps.dictionaries.project_level_sale_status,
            searchPriceXyh: nextProps.dictionaries.search_price_xyh,
            projectSort: nextProps.dictionaries.project_sort,
        }
    };

    // 获取字典数据
    getDic = () => {
        const { dispatch, requestUrl } = this.props;
        dispatch({
            type: 'dictionaries/getDictionaryDefines',
            payload: {
                requestUrl: requestUrl.public,
                requestData: ['PROJECT_TYPE', 'SEARCH_PRICE_XYH', 'PROJECT_SORT', 'SEARCH_SHOPS_AREA', 'PROJECT_LEVEL_SALE_STATUS']
            }
        })
    };

    itemContent = () => {
        let { screenVisible, areaVisible, sortVisible, selectSort, frameHeight, selectOption, selectArea } = this.state;

        let screenContent = this.getScreenData() || {};
        let screenData = [
            { label: '面积', data: screenContent.searchShopArea || [], index: 0, key: 'area' },
            { label: '价格', data: screenContent.searchPriceXyh || [], index: 1, key: 'price' },
            { label: '类型', data: screenContent.projectType || [], index: 2, key: 'buildingType' },
            { label: '售卖状态', data: screenContent.proSaleStatus || [], index: 3, key: 'saleStatus' }
        ];

        let sortData = screenContent.projectSort || [];

        return areaVisible ?
            <Modal visible={areaVisible} transparent={true} animationType='fade' onRequestClose={() => this.onClose('areaVisible')}
                onClose={() => this.onClose('areaVisible')}>
                <TouchableOpacity onPress={() => this.onClose('areaVisible')} activeOpacity={1} style={screenStyles.contentBox}>
                    <Area marginTop={Theme.navBarContentHeight + frameHeight} onChange={this.onAreaChange} selectArea={selectArea} />
                </TouchableOpacity>
            </Modal> :
            sortVisible ?
                <Modal visible={sortVisible} transparent={true} onRequestClose={() => this.onClose('sortVisible')}
                    onClose={() => this.onClose('sortVisible')}>
                    <TouchableOpacity onPress={() => this.onClose('sortVisible')} activeOpacity={1} style={[screenStyles.contentBox]}>
                        <Sort onClose={() => this.onClose('sortVisible')} sortData={sortData} onChange={this.onSortChange} selectSort={selectSort} marginTop={Theme.navBarContentHeight + frameHeight} />
                    </TouchableOpacity>
                </Modal>
                : screenVisible ?
                    <ChoiceModal visible={screenVisible} selectOption={selectOption} random={Math.random()} choiceOption={screenData}
                        modalClosed={() => this.onClose('screenVisible')} submitOption={this.submitOption} />
                    : null
    };

    render() {
        let { titles } = this.state;
        titles = titles.map((item) => {
            item.icon = item.isSelect ? require('../../images/icons/more_open.png') : require('../../images/icons/more_close.png')
            return item
        });
        return (
            <View>
                <View style={screenStyles.topBox} ref={e => this.ref = e}>
                    {titles.map((item, key) => {
                        return (
                            <TouchableOpacity key={key} activeOpacity={0.8} style={screenStyles.topContent} onPress={() => this.handleScreen(item, key)}>
                                <Text style={{ fontSize: scaleSize(28), color: item.isSelect ? '#1F3070' : '#868686' }}>{item.name}</Text>
                                <Image style={screenStyles.topIcon} source={item.icon} />
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {this.itemContent()}

            </View>
        )
    }
}

const mapStateToProps = ({ config, user, dictionaries }) => {
    return {
        requestUrl: config.requestUrl,
        user,
        dictionaries
    }
};
export default connect(mapStateToProps)(Screen)

