import React from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform} from 'react-native';
import {Theme, Button} from 'teaset';
import {scaleSize} from '../../utils/screenUtil';

class ChoiceModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            random: Math.random(),
            choiceOption: props.choiceOption || [],
            selectOption: props.selectOption || {}
        };
    }

    optionClick = (key, value) => {
        const {selectOption} = this.state;
        let _selectOption = selectOption;
        if (selectOption[key] === value) {
            delete selectOption[key]
        } else {
            _selectOption[key] = value
        }
        this.setState({
            selectOption: _selectOption
        })
    };

    modalClosed = () => {
        this.props.modalClosed ? this.props.modalClosed() : null
    };

    resetOption = () => {
        this.setState({selectOption: []})
        this.props.submitOption ? this.props.submitOption([]) : null;
    };

    submitOption = () => {
        const {selectOption} = this.state;
        this.props.submitOption ? this.props.submitOption(selectOption) : null;
    };

    renderOption = (item, item2) => {
        const {selectOption} = this.state;
        let selectStyle = null;
        let selectTextStyle = null;
        const selected = selectOption[item.key] === item2.value;
        if (selected) {
            selectStyle = {
                backgroundColor: '#fff',
                borderColor: '#1F3070',
                borderWidth: StyleSheet.hairlineWidth
            };
            selectTextStyle = {color: '#1F3070'}
        }
        return (
            <TouchableOpacity activeOpacity={0.8} key={item2.order}
                              onPress={() => this.optionClick(item.key, item2.value)}
                              style={styles.cm_itemValueWrap}>
                <View style={[styles.cm_itemValue, {...selectStyle}]}>
                    <Text style={[styles.cm_itemValueText, selectTextStyle]}>{item2.key}</Text>
                    {selected ? <Image style={styles.cm_choiceSelected} source={require('../../images/icons/choiceSelected.png')}/> : null}
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        const {choiceOption} = this.state;
        const {visible = false, title = '筛选'} = this.props;
        return (
            <Modal animationType='slide' transparent={true}
                   visible={visible}
                   onRequestClose={this.modalClosed}>
                <View style={styles.cm_content}>
                    <View style={styles.cm_header}>
                        <Text style={styles.cm_headerText} numberOfLines={1}>{title}</Text>
                    </View>
                    <View style={styles.cm_container}>
                        <ScrollView style={styles.cm_main}>
                            {choiceOption && choiceOption.map(item => (
                                <View key={item.index} style={styles.cm_item}>
                                    <Text style={styles.cm_itemHeader}>{item.label}</Text>
                                    <View style={styles.cm_itemContent}>
                                        {item.data && item.data.map(item2 => this.renderOption(item, item2))}
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.cm_footer}>
                            <Button title='重置' onPress={this.resetOption} style={styles.cm_btnLeft} activeOpacity={0.8}/>
                            <Text style={styles.cm_btnDivision}/>
                            <Button title='确定' onPress={this.submitOption} style={styles.cm_btnRight} titleStyle={styles.cm_btnRightText} activeOpacity={0.8}/>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ChoiceModal;

const styles = StyleSheet.create({
    cm_content: {
        height: '100%',
        width: '100%',
        flexDirection: 'column'
    },
    cm_header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32),
        backgroundColor: '#fff',
        height: Theme.navBarContentHeight,
        ...Platform.select({
            ios: {
                marginTop: Theme.statusBarHeight
            }
        })
    },
    cm_headerText: {},
    cm_container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cm_main: {
        paddingLeft: scaleSize(32),
        paddingRight: scaleSize(24),
        flex: 1
    },
    cm_footer: {
        flexDirection: 'row',
        paddingRight: scaleSize(32),
        paddingLeft: scaleSize(32),
        paddingTop: scaleSize(16),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#EAEAEA',
        width: '100%',
        ...Platform.select({
            ios: {
                paddingBottom: Theme.isIPhoneX ? scaleSize(40) : scaleSize(16)
            },
            android: {
                paddingBottom: scaleSize(16),
            }
        })
    },
    cm_item: {
        flexDirection: 'column',
        paddingTop: scaleSize(40)
    },
    cm_itemHeader: {
        fontSize: scaleSize(24),
        color: '#000000'
    },
    cm_itemContent: {
        flexDirection: 'row',
        paddingTop: scaleSize(32),
        flexWrap: 'wrap'
    },
    cm_itemValueWrap: {
        width: '25%',
        height: scaleSize(52),
        marginBottom: scaleSize(24),
        paddingRight: scaleSize(8),
    },
    cm_itemValue: {
        width: '100%',
        height: scaleSize(52),
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F5F5F5',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: scaleSize(8)
    },
    cm_itemValueText: {
        fontSize: scaleSize(24)
    },
    cm_choiceSelected: {
        width: scaleSize(20),
        height: scaleSize(23),
        position: 'absolute',
        right: scaleSize(1),
        bottom: scaleSize(1)
    },
    cm_btnDivision: {
        width: scaleSize(26),
        backgroundColor: '#fff'
    },
    cm_btnLeft: {
        flex: 1,
        height: scaleSize(108)
    },
    cm_btnRight: {
        flex: 1,
        height: scaleSize(108),
        backgroundColor: '#1F3070',

    },
    cm_btnRightText: {
        color: '#fff'
    }
});
