import React from 'react'
import {Modal, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Button from "../components/Button";
import {scaleSize} from "../utils/screenUtil";

/**
 * data:数据 例如['高德地图', '百度地图', '腾讯地图']
 * visible： 是否显示
 * onSelect:选中后的回调函数
 * onClose ：关闭得回调函数
 */

export class XActionSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    modalClose = () => {
        const {onClose} = this.props;
        onClose ? onClose() : null;
    };

    onSelect = (item, idx) => {
        const {onSelect} = this.props;
        onSelect ? onSelect(item, idx) : null;
    };

    render() {
        const {visible, data} = this.props;
        console.log('datadatadata', data);
        return (
            <Modal visible={visible} animationType='slide' transparent={true} onRequestClose={this.modalClose}>
                <TouchableOpacity onPress={this.modalClose} activeOpacity={1} style={asStyle.as_modal_content}>
                    <View style={asStyle.as_modal_container}>
                        <View style={asStyle.as_modal_item_wrap}>
                            {data.map((item, idx) => (
                                <TouchableOpacity key={idx} style={asStyle.as_modal_btn} activeOpacity={1} onPress={() => this.onSelect(item, idx)}>
                                    <Text style={asStyle.as_modal_btn_text}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity style={asStyle.as_modal_cancel} activeOpacity={1} onPress={this.modalClose}>
                            <Text style={asStyle.as_modal_cancel_text}>取消</Text>
                        </TouchableOpacity>


                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const asStyle = StyleSheet.create({
    as_modal_content: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20),
        paddingBottom: scaleSize(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    as_modal_container: {
        width: '100%',
    },
    as_modal_item_wrap: {
        borderRadius: scaleSize(8),
        padding: scaleSize(15),
        backgroundColor: '#fff'
    },
    as_modal_btn: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        height: scaleSize(100),
    },
    as_modal_btn_text: {
        color: '#4D4D4D',
        fontSize: scaleSize(30)
    },
    as_modal_cancel: {
        height: scaleSize(80),
        width: '100%',
        backgroundColor: '#fff',
        marginTop: scaleSize(20),
        borderRadius: scaleSize(8),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    as_modal_cancel_text: {
        color: '#4D4D4D',
        fontSize: scaleSize(30)
    }
});
