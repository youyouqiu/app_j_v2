import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "@/pages/workbench/stationHelper/copyReport/styles";
import React from "react";

class TemplateModal extends React.Component<any> {

    _modalToggle = (type?: string) => {
        const {modalToggle} = this.props;
        modalToggle && modalToggle(type)
    };

    render() {
        const {visible, reportTemplate} = this.props;
        return (
            <Modal visible={visible} transparent={true}>
                <View style={styles.cr_modal_container}>
                    <View style={styles.cr_modal_content}>
                        <View style={styles.cr_modal_header}>
                            <Text style={styles.cr_modal_header_1}>{reportTemplate.buildingTreeName}</Text>
                            <Text style={styles.cr_modal_header_2}>
                                {reportTemplate.isDefault ? '暂无报备模版，已使用默认模版' : '已成功设置为标准报备模板'}
                            </Text>
                        </View>
                        <View style={styles.cr_modal_body}>
                            <Text style={styles.cr_modal_body_text_1}>微信转发预览</Text>
                            <Text style={styles.cr_modal_body_text_2}>（此模版数据为虚拟数据，不作为真实数据转发）</Text>
                            <ScrollView style={styles.cr_modal_chatContain} showsVerticalScrollIndicator={false}>
                                <View style={styles.cr_modal_scroll_content}>
                                    <View style={styles.cr_modal_chatContent}>
                                        <Text style={styles.cr_modal_chatContent_text}>
                                            {reportTemplate.reportTemplateText}
                                        </Text>
                                    </View>
                                    <Image style={styles.cr_chatSanJiao}
                                           source={require('../../../../images/icons/sanjiao.png')}/>
                                    <Image style={styles.cr_chatIcon}
                                           source={require('../../../../images/icons/logo.png')}/>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.cr_modal_footer}>
                            <TouchableOpacity style={styles.cr_modal_footer_btn} activeOpacity={0.8} onPress={() => this._modalToggle('btnClick')}>
                                <Text style={styles.cr_modal_footer_btnText}>我知道了</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default TemplateModal
