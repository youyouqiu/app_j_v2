import {Image, Text, View, Linking, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import styles from "../styles";
import {Label} from "teaset";
import Modal from '../../../../components/Modal/index'
import {ProjectBlockItem} from './detailInfo'
import {Descriptions} from './baseInfo'
import buildJson from '../buildJson'
import moment from 'moment'

const ProjectInfo = ({onLayout, buildingDetail = {}}) => {
    const [visible, setVisible] = useState(false);
    const [phone, setPhone] = useState('');
    // console.log(buildingDetail)
    const {residentUserInfo = [], treeCategory = 1} = buildingDetail;
    // const residentUserFirst = residentUserInfo[0] // 驻场只展示第一个  这里不做非空。需要用它判断是否显示   产品后续又说要展示完
    let {basicInfo = {}, buildingNos = []} = buildingDetail
    let qfList = buildingNos.filter(item => item.wyzt === '1') // 期房
    let xfList = buildingNos.filter(item => item.wyzt === '2') // 现房
    let qfNames = qfList.map(item => item.storied) // 
    let xfNames = xfList.map(item => item.storied)
    buildingNos.sort((a,b) => a.openDate > b.openDate)
    let lastOpenData = {...(buildingNos[0] || {})} // 最新的开盘时间Item
    buildingNos.sort((a,b) => a.deliveryDate > b.deliveryDate)
    let lastDeliveryDate = {...(buildingNos[0] || {})} // 最新的交房时间item
    const visibleToggle = (item) => {
        item ? setPhone(item.phone) : null;
        setVisible(!visible)
    };
    const renderRight2 = () => {
        return (
            <View style={styles.PIListBtn}>
                <Image style={styles.PIListBtnIcon}
                       source={require('../../../../images/icons/phone.png')}/>
                <Label style={styles.PIListBtnText} text='电话咨询'/>
            </View>
        )
    };

    const onOk = () => {
        Linking.openURL('tel:' + phone);
        setVisible(false)
    }

    const lableList = [{
        label: buildJson[treeCategory].status[1],
        value: qfNames.join(',')
    }, {
        label: buildJson[treeCategory].status[2],
        value: xfNames.join(',')
    }, {
        label: '产权年限',
        value: basicInfo.propertyTerm,
        unit: '年'
    }, {
        label: '产权到期',
        value: basicInfo.landExpireDate,
        moment: 'YYYY-MM'
    }, {
        label: '最新开盘',
        value: lastOpenData.openDate,
        moment: 'YYYY-MM'
    }, {
        label: '最近交房',
        value: lastDeliveryDate.deliveryDate,
        moment: 'YYYY-MM'
    }, {
        label: '优惠政策',
        value: basicInfo.preferentialPolicies
    }, ]
    return (
        <View style={styles.subContent} onLayout={onLayout}>
            <Text style={styles.subHeader}>销售信息</Text>
            {
                lableList.map(item => {
                    let value = item.value
                    if (!value) return null
                    if (item.moment) {
                        value = moment(value).format(item.moment)
                    }
                    if (item.unit) {
                        value = value + item.unit
                    }
                    return <Descriptions label={item.label} children={value}/>
                })
            }
            <View>
                {
                    residentUserInfo.length 
                    ?
                    residentUserInfo.map(item => {
                        return <ProjectBlockItem type='space-between' onPress={() => {visibleToggle(item)}} icon={require('../../../../images/icons/user.png')} text={`项目经理-${item.trueName || ''}`} right={renderRight2} />
                    })
                    :
                    null
                }
            </View>
            <Modal visible={visible} onOk={onOk}
                   transparent={true}
                   onClose={visibleToggle}
                   type='conform' width={541} height={200} title=''>
                <Text style={{width: '100%', textAlign: 'center'}}>是否拨打{phone}</Text>
            </Modal>
        </View>
    )
};

export default ProjectInfo;

export const ListItem = ({leftIcon, rightData, RenderRight, onPress = () => null}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.pi_users}>
            <Image source={leftIcon} style={styles.pi_usersIcon}/>
            <View style={styles.pi_usersRight}>
                {rightData.length > 0 ? rightData.map((item, idx) => (
                    <View style={[styles.pi_usersItem, rightData.length === idx + 1 ? {borderBottomWidth: 0} : {}]} key={item.id}>
                        <Text style={styles.pi_usersName}>{item.trueName}</Text>
                        {typeof RenderRight == 'function' ? <RenderRight item={item}/> : RenderRight}
                    </View>
                )) : (
                    <View style={[styles.pi_usersItem,{justifyContent:'flex-end',borderBottomWidth:0}]}>
                        <Text style={[styles.pi_usersName,{textAlign:'right'}]}>暂无项目经理</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
};
