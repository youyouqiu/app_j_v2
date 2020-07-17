import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import React from "react";
import {scaleSize} from "@/utils/screenUtil";

interface ViewSkeletonWrapperProps {
    flexDirection?: 'row' | 'column',
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
    children?: React.ReactElement |  React.ReactNodeArray,
    style?: StyleProp<ViewStyle>,
    height?: number | string,
    padding?: Array<number>
}

const ViewSkeletonWrapper = ({
                                 flexDirection = 'column',
                                 justifyContent = 'flex-start',
                                 alignItems = 'flex-start',
                                 children,
                                 style,
                                 height,
                                 padding=[]
                             }: ViewSkeletonWrapperProps) => {

    let styles: StyleProp<ViewStyle> = {
        width: '100%',
        height: typeof height === 'number' ? scaleSize(height) : height,
        flexDirection,
        justifyContent,
        alignItems,
    };

    if (padding.length === 4) {
        styles = StyleSheet.flatten([styles, {
            paddingTop: scaleSize(padding[0]),
            paddingRight: scaleSize(padding[1]),
            paddingBottom: scaleSize(padding[2]),
            paddingLeft: scaleSize(padding[3])
        }]);
    }
    return (
        <View style={[styles, style]}>
            {children}
        </View>
    )
};

export default ViewSkeletonWrapper
