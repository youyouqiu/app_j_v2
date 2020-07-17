import {Dimensions, Image, StyleSheet} from "react-native";
import React from "react";
import {scaleSize} from "@/utils/screenUtil";

interface ImageSkeletonProps {
  width?: string | number,
  height?: number,
  margin?: Array<number>
}


const ImageSkeleton = ({
                         width = 240,
                         height = 183,
                         margin = [0, 0, 0, 0]
                       }: ImageSkeletonProps) => {

  let propsStyle: any = {
    marginTop: scaleSize(margin[0]),
    marginRight: scaleSize(margin[1]),
    marginBottom: scaleSize(margin[2]),
    marginLeft: scaleSize(margin[3]),
  };

  if (typeof width === 'number') {
    propsStyle = {
      ...propsStyle,
      width: scaleSize(width),
      height: scaleSize(height)
    }
  } else if (typeof width === 'string') {
    propsStyle = {
      ...propsStyle,
      width: width,
      height: scaleSize(Dimensions.get('window').width / (240 / 183))
    }
  }


  return (
    <Image
      style={[styles.defaultStyle, propsStyle]}
      source={require('./images/skeletonImg.png')}/>
  )
};

export default ImageSkeleton

const styles = StyleSheet.create({
  defaultStyle: {
    width: scaleSize(200),
    height: scaleSize(152),

  }
});
