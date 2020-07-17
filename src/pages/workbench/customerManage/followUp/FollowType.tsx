import {View, Text, TouchableOpacity, Image} from "react-native";
import React, {useState} from "react";
import styles from "./styles";

const labels = ['微信', '电话', '见面', '邮件', '上门', '其他'];
const FollowTypeGroup = (props: any): any => {

    const [activityTab, setActivityTab] = useState('');

    const onPress = (activityTab: any) => {
        setActivityTab(activityTab);
        props.labelSelectedOnchange ? props.labelSelectedOnchange(activityTab) : null;
    };

    return (
        <View style={styles.fu_followTypeContent}>
            {labels.map((item: any) => (
                <TouchableOpacity style={[styles.fu_followType, activityTab === item ? styles.fu_followType_select : {}]}
                                  activeOpacity={1} onPress={() => onPress(item)}>
                    <Text style={[styles.fu_followTypeText, activityTab === item ? styles.fu_followTypeText_select : {}]}>{item}</Text>
                    {activityTab === item ? (
                        <Image source={require('../../../../images/icons/choiceSelected.png')} style={styles.fu_icon}/>
                    ) : null}
                </TouchableOpacity>
            ))}
        </View>
    )
};

export default FollowTypeGroup
