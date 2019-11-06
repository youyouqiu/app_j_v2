import {Image, Text, View, Linking, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import styles from "../styles";
import {Button, Label} from "teaset";
import Modal from '../../../../components/Modal/index'
import {verifyUser} from '../../../../utils/utils'

const ProjectInfo = ({onLayout, projectInfo = {}, navigation}) => {
    const [visible, setVisible] = useState(false);
    const [phone, setPhone] = useState('');
    const [] = useState();
    const {residentUserInfo = []} = projectInfo;
    const visibleToggle = (item) => {
        item ? setPhone(item.phone) : null;
        setVisible(!visible)
    };
    const gotoMarket = async () => {
        try {
            await verifyUser('weak', '加入公司之后即可查看楼盘实时信息')
            navigation.navigate('marketingData', {buildingTreeId: projectInfo.buildingTreeId})
        } catch (e) {
        }
    };
    const renderRight1 = (
        <View style={styles.PIListRightIconWrap}>
            <Image style={styles.PIListRightIcon} source={require('../../../../images/icons/chose.png')}/>
        </View>
    );
    const renderRight2 = ({item}) => {
        return (
            <Button style={styles.PIListBtn} onPress={() => visibleToggle(item)}>
                <Image style={styles.PIListBtnIcon}
                       source={require('../../../../images/icons/phone.png')}/>
                <Label style={styles.PIListBtnText} text='电话咨询'/>
            </Button>
        )
    };

    const onOk = () => {
        Linking.openURL('tel:' + phone);
        setVisible(false)
    };

    return (
        <View style={styles.subContent} onLayout={onLayout}>
            <Text style={styles.subHeader}>项目信息</Text>
            <Text style={styles.PIText}>
                {projectInfo.summary}
            </Text>
            <ListItem leftIcon={require('../../../../images/icons/material.png')} onPress={gotoMarket}
                      RenderRight={renderRight1} rightData={[{id: 0, trueName: '销讲资料'}]}/>
            <ListItem leftIcon={require('../../../../images/icons/user.png')}
                      RenderRight={renderRight2}
                      rightData={residentUserInfo}/>
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
