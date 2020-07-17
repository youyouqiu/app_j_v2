import {scaleSize} from './screenUtil'
import {Platform, StyleSheet} from "react-native";
import {Theme} from "@new-space/teaset";

export default {
    AdaptIPhoneX: {
        ...Platform.select({
            ios: {
                paddingTop: Theme.isIPhoneX ? scaleSize(70) : scaleSize(44)
            },
            android: {
                paddingTop: scaleSize(50)
            }
        })
    },
    Button: {
        disablePrimaryColor: '#6a793a',
        primaryColor: '#1F3070',
        primaryBorderColor: '#1F3070',
        primaryTitleColor: '#fff',
        defaultColor: '#1F3070',
        primaryBorderWidth: 0,
        defaultBorderColor: '#1F3070',
        borderRadiusXL: scaleSize(8),
        paddingVerticalXL: scaleSize(32),
        widthXL: scaleSize(702),
        heightXL: scaleSize(108),
        fontSizeXL: scaleSize(28),
        defaultborderRadius: scaleSize(8),
        defaultPaddingVertical: scaleSize(32),
        defaultWidth: scaleSize(276),
        defaultHeight: scaleSize(108),
        defaultTitleColor: '#fff',
        defaultFontSize: scaleSize(28),
        defaultBorderWidth: 0,
        normalColor: '#fff',
        normalBorderColor: '#CBCBCB',
        normalBorderWidth: 1,
        normalTitleColor: '#000000',
        btnDisabledOpacity: 0
    },
    Input: {
        defaultFontSize: scaleSize(28),
        defaultHeight: scaleSize(104),
        backgroundColor: '#fff',
        textColor: '#000',
        borderBottomWidth: 1,
        width: scaleSize(639),
        borderColor: '#EAEAEA',
        placeholderTextColor: '#CBCBCB'
    }
}
