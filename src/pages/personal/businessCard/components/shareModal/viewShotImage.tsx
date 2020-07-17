/**
 * @author: zxs
 * @date: 2020/6/22
 */
import {Dimensions, Image, ImageSourcePropType, View} from "react-native";
import React, {useEffect, useState} from "react";

const d_width = Dimensions.get('window').width;

interface AdaptionImagePropsType {
  uri: string
}

interface StatePropsType {
  width: number,
  height: number
}

const defaultState: StatePropsType = {
  width: 1,
  height: 1
};

const ViewShotImage = ({uri}: AdaptionImagePropsType) => {

  const [state, setState] = useState<StatePropsType>(defaultState);

  useEffect(() => {
    if (!uri) return;
    Image.getSize(uri, (width: number, height: number) => {
      setState({width, height})
    }, () => null)
  }, [uri]);

  return <Image style={{width: '100%', height: d_width * state.height / state.width}} resizeMode='contain' source={{uri: uri}}/>

};

export default ViewShotImage
