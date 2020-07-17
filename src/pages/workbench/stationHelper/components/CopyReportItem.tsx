import React from "react";
import styles from "@/pages/workbench/stationHelper/copyReport/styles";
import {Clipboard, Image, Text, TouchableOpacity, View} from "react-native";
import XKJCheckBox from "@/components/XKJCheckBox";
import {Toast} from '@new-space/teaset'
import moment from "moment";
import {scaleSize} from "@/utils/screenUtil";

class CopyReportItem extends React.Component<any> {

    state: any = {
        checkboxSelectArr: [],
        item: {},
        disabledCheckBox: false
    };

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        const {temporaryCopyObj, item, checkboxSelectArr, disabledCheckBox} = nextProps;
        return {
            ...prevState,
            checkboxSelectArr,
            item, disabledCheckBox,
        }
    }

    checkBoxOnChange = (e: boolean, item: any) => {
        const {checkBoxOnChange} = this.props;
        checkBoxOnChange && checkBoxOnChange(e, item.id);
    };


    copyPhone = (phone: any) => {
        Clipboard.setString(phone);
        Toast.message('复制成功')
    };

    render() {
        const {checkboxSelectArr, item, disabledCheckBox} = this.state;
        return (
            <View style={styles.cr_recordContent}>
                <View style={styles.cr_recordLeft}>
                    <XKJCheckBox
                        checked={checkboxSelectArr.includes(item.id)}
                        disabled={disabledCheckBox && !checkboxSelectArr.includes(item.id)}
                        style={styles.cr_checkbox}
                        onChange={(e: any) => this.checkBoxOnChange(e, item)}/>
                    {disabledCheckBox && !checkboxSelectArr.includes(item.id) && (
                        <View style={styles.cr_recordLeft_mask}>
                            <Text style={styles.cr_recordLeft_mask_container} onPress={() => Toast.message('单次复制报备不超过30条')}/>
                        </View>
                    )}
                </View>
                <View style={styles.cr_recordRight}>
                    <View style={[styles.cr_recordRight_container]}>
                        <View style={styles.cr_recordRight_content}>
                            <View style={styles.cr_recordRight_header}>
                                <Text style={styles.cr_recordRight_header_time}>
                                    {moment(item.reportTime).format('YYYY-MM-DD HH:mm:ss')}
                                </Text>
                            </View>
                            <View style={styles.cr_recordRight_body}>
                                <View style={[styles.cr_recordRight_body_base]}>
                                    <Text style={[styles.cr_recordRight_body_label]}>客户姓名:</Text>
                                    <Text style={styles.cr_recordRight_body_value} numberOfLines={1}>{item.customerName}</Text>
                                </View>
                                <View style={[styles.cr_recordRight_body_base, {paddingBottom: 0}]}>
                                    <Text style={[styles.cr_recordRight_body_label]}>手机号码:</Text>
                                    <View style={[styles.cr_recordRight_body_phone_value]}>
                                        {item.customerPhoneList.map((phone: any, idx: any) => (
                                            <TouchableOpacity activeOpacity={0.9}
                                                              key={idx}
                                                              onPress={() => this.copyPhone(phone.customerPhone)}
                                                              style={[styles.cr_recordRight_body_phone_container, {paddingBottom: scaleSize(24)}]}>
                                                <Text style={styles.cr_recordRight_body_phone_text}
                                                      numberOfLines={1}>{phone.customerPhone}</Text>
                                                <Image style={styles.cr_recordRight_body_phone_icon} source={require('../../../../images/icons/copy.png')}/>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                                <View style={[styles.cr_recordRight_body_base]}>
                                    <Text style={[styles.cr_recordRight_body_label]}>报备项目:</Text>
                                    <Text style={styles.cr_recordRight_body_value} numberOfLines={1}>{item.buildingFullName}</Text>
                                </View>

                                {item.expectedBeltTime && (
                                    <View style={[styles.cr_recordRight_body_base]}>
                                        <Text style={[styles.cr_recordRight_body_label]}>预计到访:</Text>
                                        <Text style={styles.cr_recordRight_body_value} numberOfLines={1}>
                                            {moment(item.expectedBeltTime).format('YYYY-MM-DD HH:mm')}
                                        </Text>
                                    </View>
                                )}

                                {item.templateValues && item.templateValues.map((record: any) => (
                                    <View style={[styles.cr_recordRight_body_base]}>
                                        <Text style={[styles.cr_recordRight_body_label]}>{record.name}:</Text>
                                        <Text style={styles.cr_recordRight_body_value} numberOfLines={1}>{record.value}</Text>
                                    </View>
                                ))}


                            </View>
                            <View style={styles.cr_recordRight_footer}>
                                <Image style={styles.cr_recordRight_footer_icon} source={require('../../../../images/icons/kehu2.png')}/>
                                <Text style={styles.cr_recordRight_footer_user}>{item.userTrueName}</Text>
                                <Text style={styles.cr_recordRight_footer_company}>{item.userCompanyName}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default CopyReportItem
