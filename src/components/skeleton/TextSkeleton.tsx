import {StyleSheet, Text, TextProps, TextStyle} from "react-native";
import React from "react";
import {scaleSize} from "@/utils/screenUtil";

interface TextSkeletonProps extends TextProps {
    showSkeleton?: boolean,
    children?: string | React.ReactElement<Text>,
    style?: TextStyle,
    skeletonLines?: number
}

const defaultProps = {
    skeletonLines: 1
};

const TextSkeleton = (props: TextSkeletonProps = defaultProps) => {
    let {showSkeleton, style, skeletonLines, ...otherProps} = props as TextSkeletonProps;

    /**
     * 默认显示骨架逻辑：当props为{}，null，或者undefined时展示骨架
     */
    if (showSkeleton === undefined) {
        showSkeleton = propsIsBlank(props.children);
    }

    /**
     * 骨架行数
     */
    skeletonLines = showSkeleton ? skeletonLines : defaultProps.skeletonLines;
    const skeletonLinesList = new Array(skeletonLines).fill(Math.random());

    /**
     * 骨架样式
     */
    const skeletonStyle = showSkeleton ? styles.skeletonStyle : {};
    const currentStyle = StyleSheet.flatten([skeletonStyle, style]);

    let renderContent: any = (
        <Text {...otherProps} style={currentStyle}>
            {showSkeleton ? '' : props.children}
        </Text>
    );

    if (skeletonLines && skeletonLines > 1) {
        renderContent = skeletonLinesList.map(() => (
            <Text {...otherProps} key={1} style={currentStyle}>
                {props.children}
            </Text>
        ))
    }

    return renderContent
};
export default TextSkeleton


const styles = StyleSheet.create({
    skeletonStyle: {
        width: scaleSize(100),
        backgroundColor: '#EAEAEA',
    }
});

const propsIsBlank = (children: any): boolean => {
    return children === null || children === undefined || children === ''
};
