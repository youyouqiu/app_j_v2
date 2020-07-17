import React from "react";
import {View, Text} from "react-native";
import styles from "@/pages/main/style";

interface SubHeaderTypes {
    subTitle: string,
    rightContent?: string | number | JSX.Element | null
}

const SubHeader = ({subTitle, rightContent = null}: SubHeaderTypes) => {
    return (
        <View style={styles.m_subHeader_content}>
            <View style={styles.m_subHeader_content_left}>
                <View style={styles.m_subHeader_left}/>
                <Text style={styles.m_subHeader_text}>{subTitle}</Text>
            </View>
            {rightContent}
        </View>
    )
};

export default SubHeader
