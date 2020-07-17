import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import React from "react";
import {scaleSize} from "@/utils/screenUtil";


interface ViewSkeletonProps {
    flexDirection?: 'row' | 'column',
    justifyContent?: 'center' | 'flex-start' | 'flex-end',
    width?: number | string,
    height?: number | string,
    children?: React.ReactElement | Array<React.ReactElement>,
    margin?: Array<number>,
    borderRadius?: number,
    style?: StyleProp<ViewStyle>
}

const defaultProps: ViewSkeletonProps = {
    width: '100%',
    height: scaleSize(40),
} as ViewSkeletonProps;

export const ViewSkeleton = ({
                                 width = '100%',
                                 height = 20,
                                 margin = [],
                                 borderRadius = 2,
                                 style
                             }: ViewSkeletonProps = defaultProps,{...otherProps}): React.ReactElement => {

    let _style: StyleProp<ViewStyle> = {
        width: typeof width === 'number' ? scaleSize(width) : width,
        height: scaleSize(height),
        borderRadius
    };

    if (margin.length === 4) {
        _style = StyleSheet.flatten([_style, {
            marginTop: scaleSize(margin[0]),
            marginRight: scaleSize(margin[1]),
            marginBottom: scaleSize(margin[2]),
            marginLeft: scaleSize(margin[3])
        }])
    }

    const finalStyle = StyleSheet.flatten([styles.defaultStyle, _style]);
    return (
        <View style={[finalStyle,style]} {...otherProps}/>
    )
};


const styles = StyleSheet.create({
    defaultStyle: {
        backgroundColor: '#EAEAEA',
        marginBottom: scaleSize(10),
        justifyContent: 'flex-end',
    }
});
