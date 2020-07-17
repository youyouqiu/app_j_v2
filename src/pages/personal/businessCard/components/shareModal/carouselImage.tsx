/**
 * @author: zxs
 * @date: 2020/6/22
 */
import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {scaleSize} from "@/utils/screenUtil";
import request from "@/utils/request";

interface CarouselImagePropsType {
  uri: string
}

interface CarouselImageStateType {
  loading: boolean,
  uri: string
}

const defaultState: CarouselImageStateType = {
  loading: true,
  uri: ''
};

const CarouselImage = ({uri}: CarouselImagePropsType) => {

  const [state, setState] = useState<CarouselImageStateType>(() => {
    return {
      ...defaultState,
      uri
    }
  });

  useEffect(() => {
    if (uri) {
      setState(prevState => ({
        ...prevState,
        uri: uri
      }))
    }
  }, [uri]);

  const onLoadEnd = () => {
    setState(prevState => ({
      ...prevState,
      loading: false
    }))
  };

  const onError = ()=>{
    setState(prevState => ({
      ...prevState,
      uri: `${request.getUrl().cqAuth}/images/defaultProject.png`
    }))
  };

  return (
    <View style={styles.carousel_image_wrapper}>
      <Image style={styles.img} resizeMode='contain' onError={onError} onLoadEnd={onLoadEnd} source={{uri: state.uri}}/>
      {state.loading ? (
        <View style={styles.carousel_image_loading}>
          <ActivityIndicator size='large'/>
          <Text style={styles.carousel_image_loading_text}>正在生成您的专属海报</Text>
        </View>
      ) : null}
    </View>
  )
};

export default CarouselImage


const styles = StyleSheet.create({
  carousel_image_wrapper: {
    height: '100%',
    width: '100%'
  },
  carousel_image_loading: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 0
  },
  carousel_image_loading_text: {
    color: '#BBBBBB',
    paddingTop: scaleSize(10),
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  img: {
    height: '100%',
    width: '100%',
  }
});
