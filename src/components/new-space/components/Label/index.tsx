import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { scaleSize } from "../../utils/screenUtil";

/**
 * tips：必须为父元素设置flex布局
 * <Label.SaleStatus _key={1}/> <Label.ShopStatus _key={1}/> <Label.ProjectType _key={'酒店'}/>
 * @constructor
 */
interface labelProps {
    _key?: number | string
    style?: ViewStyle,
    textStyle?: TextStyle,
    SaleStatus?: any
}

const SaleStatusLabel = ({ _key }: labelProps) => {
    const saleStatus: any = {
        1: {
            text: '在售',
            style: { ...styles.l_baseStyle, backgroundColor: '#E4F1FF' },
            textStyle: { fontSize: scaleSize(22), color: '#49A1FF' }
        },
        2: {
            text: '待售',
            style: { ...styles.l_baseStyle, backgroundColor: '#FFDDD8' },
            textStyle: { fontSize: scaleSize(22), color: '#FE5139' }
        },
        3: {
            text: '售罄',
            style: { ...styles.l_baseStyle, backgroundColor: '#F8F8F8' },
            textStyle: { fontSize: scaleSize(22), color: '#CBCBCB' }
        },
        4: {
            text: '停售',
            style: { backgroundColor: '#FFE3BD' },
            textStyle: { fontSize: scaleSize(22), color: '#E58400' }
        }
    };
    return (
        _key
            ?
            <View style={{ ...styles.l_baseStyle, ...saleStatus[_key].style }}>
                <Text style={saleStatus[_key].textStyle}>{saleStatus[_key].text}</Text>
            </View>
            :
            null
    )
};

const ShopSaleStatus = ({ _key }: labelProps) => {
    const saleStatus: any = {
        1: {
            text: '待售',
            style: { ...styles.l_baseStyle, backgroundColor: '#F8F8F8' },
            textStyle: { fontSize: scaleSize(22), color: '#CBCBCB' }
        },
        2: {
            text: '在售',
            style: { ...styles.l_baseStyle, backgroundColor: '#E4F1FF' },
            textStyle: { fontSize: scaleSize(22), color: '#49A1FF' }
        },
        3: {
            text: '锁定',
            style: { ...styles.l_baseStyle, backgroundColor: '#FFE3BD' },
            textStyle: { fontSize: scaleSize(22), color: '#E58400' }
        },
        10: {
            text: '已售',
            style: { ...styles.l_baseStyle, backgroundColor: '#FFDDD8' },
            textStyle: { fontSize: scaleSize(22), color: '#FE5139' }
        },
        4: {
            text: '已认购',
            style: { ...styles.l_baseStyle, backgroundColor: '#FFE3BD' },
            textStyle: { fontSize: scaleSize(22), color: '#E58400' }
        }
    };
    return (
        _key
            ?
            <View style={{ ...styles.l_baseStyle, ...saleStatus[_key].style }}>
                <Text style={saleStatus[_key].textStyle}>{saleStatus[_key].text}</Text>
            </View>
            :
            null
    )
};

const ShopStatusLabel = ({ _key }: labelProps) => {
    const saleStatus: any = {
        1: {
            text: '期铺',
            style: { ...styles.l_baseStyle, backgroundColor: '#EAEAEA' },
            textStyle: { fontSize: scaleSize(22), color: '#868686' }
        },
        2: {
            text: '现铺',
            style: { ...styles.l_baseStyle, backgroundColor: '#FFDDD8' },
            textStyle: { fontSize: scaleSize(22), color: '#FE5139' }
        }
    };
    return (
        _key
            ?
            <View style={{ ...styles.l_baseStyle, ...saleStatus[_key].style }}>
                <Text style={saleStatus[_key].textStyle}>{saleStatus[_key].text}</Text>
            </View>
            :
            null
    )
};

const ProjectTypeLabel = (props: labelProps) => {
    return (
        <View style={[styles.l_baseStyle, { backgroundColor: '#F4F5F9' }]}>
            <Text style={{ fontSize: scaleSize(22), color: '#66739B' }}>{props._key}</Text>
        </View>
    )
};


class Label extends React.Component<labelProps, any> {

    static SaleStatus = SaleStatusLabel;
    static ShopStatus = ShopStatusLabel;
    static ProjectType = ProjectTypeLabel;
    static ShopSaleStatus = ShopSaleStatus

    render() {
        return (
            <View style={{ ...styles.l_contentStyle, ...this.props.style }}>
                <Text style={{ ...styles.l_textStyle, ...this.props.textStyle }}>{this.props._key}</Text>
            </View>
        );
    }
}

export default Label;

const styles = StyleSheet.create({
    l_baseStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scaleSize(4),
        paddingHorizontal: scaleSize(9),
        marginRight: scaleSize(6)
    },

    l_contentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F5F9',
        paddingVertical: scaleSize(4),
        paddingHorizontal: scaleSize(9),
        marginRight: scaleSize(6)
    },

    l_textStyle: {
        color: '#66739B',
        fontSize: scaleSize(22),
        lineHeight: scaleSize(24),
    }
})
