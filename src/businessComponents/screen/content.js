/**
 * 筛选组件
 */

import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform} from 'react-native'
import {scaleSize} from '../../utils/screenUtil'
import {connect} from 'react-redux';
import Theme from '@new-space/teaset/themes/Theme';

class Area extends Component {
    constructor(props) {
        super(props);
        this.common = {
            code: props.projectLocation.cityCode || props.projectLocation.defaultCityCode,
        };
        this.selectArea = {
            childrenCodeOne: props.selectArea.childrenCodeOne || '',
            childrenCodeTwo: props.selectArea.childrenCodeTwo || ''
        }
    }

    componentDidMount() {
        const {requestUrl} = this.props;
        const {code} = this.common;
        this.getBuildingCityScreenByCityCode(requestUrl.public, code)

    }

    getBuildingCityScreenByCityCode = (_public, code) => {
        const {global} = this.props;
        if (global.buildingCityScreen[code]) {
            this.setState({});
            return
        }
        const {dispatch} = this.props;
        dispatch({
            type: 'global/getBuildingCityScreenByCityCode',
            payload: {_public, code}
        })
    };

    levelItemOnClick = (level, item) => {
        if (level === 1) {
            if(item.code.includes('_0')){
                this.selectArea.childrenCodeOne= item.code;
                this.selectArea.childrenCodeTwo= '';
                this.props.onChange(item, this.selectArea);
                return
            }
            this.selectArea.childrenCodeOne = item.code;
            const {requestUrl} = this.props;
            this.getBuildingCityScreenByCityCode(requestUrl.public, item.code)
        } else if (level === 2) {
            if(item.code.includes('_0')){
                this.selectArea.childrenCodeTwo= item.code;
                item.parentId = this.selectArea.childrenCodeOne;
                this.props.onChange(item, this.selectArea);
                return
            }
            this.selectArea.childrenCodeTwo = item.code;
            this.props.onChange(item, this.selectArea)
        }
    };

    render() {
        const {buildingCityScreen} = this.props.global;
        const {code} = this.common;
        const {childrenCodeOne, childrenCodeTwo} = this.selectArea;
        const levelOneList = buildingCityScreen[code] || [];
        const levelTwoList = buildingCityScreen[childrenCodeOne] || [];

        return (
            <View style={styles.ac_wrapper}>
                <ScrollView style={styles.ac_levelOneScroll} showsVerticalScrollIndicator={false}>
                    {levelOneList.map((item, key) => (
                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.levelItemOnClick(1, item)}
                                          key={key} style={[styles.ac_levelOne, childrenCodeOne === item.code ? styles.ac_selectedLevelOne : null]}>
                            <Text style={[styles.ac_defaultText, childrenCodeOne === item.code ? styles.ac_selectedText : null]}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {levelTwoList.length > 0 ? (
                    <ScrollView style={styles.ac_levelTwoScroll} showsVerticalScrollIndicator={false}>
                        {levelTwoList.map((item, key) => (
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.levelItemOnClick(2, item)}
                                              key={key} style={styles.ac_levelOne}>
                                <Text style={[styles.ac_defaultText, childrenCodeTwo === item.code ? styles.ac_selectedText : null]}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : null}
            </View>
        )
    }
}

const mapStateToProps = ({config, user, global,projectLocation}) => {
    return {
        requestUrl: config.requestUrl,
        user,
        global,projectLocation
    }
};
export default connect(mapStateToProps)(Area)

const styles = StyleSheet.create({
    ac_wrapper: {
        ...Platform.select({
            ios: {
                marginTop: Theme.navBarContentHeight + Theme.statusBarHeight + scaleSize(100),
            },
            android: {
                marginTop: Theme.navBarContentHeight + scaleSize(100),
            }
        }),

        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1
    },
    ac_levelOneScroll: {
        width: scaleSize(200),
        maxWidth: scaleSize(200),
    },
    ac_levelTwoScroll: {
        width: scaleSize(200),
        maxWidth: scaleSize(200),
    },
    ac_levelOne: {
        width: scaleSize(200),
        height: scaleSize(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA'
    },
    ac_selectedLevelOne: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRightWidth: 0
    },
    ac_defaultText: {
        color: '#868686',
        fontSize: scaleSize(28)
    },
    ac_selectedText: {
        color: '#1F3070'
    }
});

