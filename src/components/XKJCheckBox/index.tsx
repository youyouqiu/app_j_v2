import {Checkbox} from "@new-space/teaset";
import React, {useEffect, useState} from "react";
import {Image, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const XKJCheckBox = (props: any) => {

    const [checked, setChecked] = useState(props.checked || false);

    useEffect(() => {
        setChecked(props.checked || false);
    }, [props.checked]);

    const onChange = (checked: any) => {
        setChecked(checked);
        props.onChange && props.onChange(checked)
    };

    const checkedIcon = props.checkedIcon ? props.checkedIcon : (
        <Image style={styles.cr_checkbox_icon} source={require('../../images/icons/checkbox_2.png')}/>
    );
    const uncheckedIcon = props.uncheckedIcon ? props.uncheckedIcon : (
        <Image style={styles.cr_checkbox_icon} source={require('../../images/icons/checkbox_1.png')}/>
    );

    return (
        <Checkbox {...props}
                  checked={checked}
                  checkedIcon={checkedIcon}
                  uncheckedIcon={uncheckedIcon}
                  onChange={(e: any) => onChange(e)}/>
    )
};
export default XKJCheckBox


const styles = StyleSheet.create({
    cr_checkbox_icon: {
        width: scaleSize(44),
        height: scaleSize(44)
    },
});
