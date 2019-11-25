import {TextInput, View, Text, TextInputProps, StyleSheet} from "react-native";
import React, {useState} from "react";
import {scaleSize} from "../../utils/screenUtil";

const TextArea = (props: TextInputProps) => {

    const [count, setCount] = useState(0);

    const onChangeText = (text: any) => {
        setCount(text.length);
        props.onChangeText && props.onChangeText(text)
    };

    let numCountVisible = props.maxLength && props.maxLength > 0;
    return (
        <View style={{position: 'relative'}}>
            <TextInput {...props} onChangeText={onChangeText}/>
            {numCountVisible ? (
                <Text style={styles.numCount}>
                    {count}
                    <Text style={{color:'#CBCBCB'}}>/{props.maxLength}</Text>
                </Text>
            ) : null}
        </View>
    )
};

export default TextArea


const styles = StyleSheet.create({
    numCount: {
        position: 'absolute',
        bottom: scaleSize(10),
        right: scaleSize(10),
        zIndex: 999
    }
});
