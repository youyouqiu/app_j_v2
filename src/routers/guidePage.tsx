import React, { FunctionComponent, useState } from 'react'
import {Image, View, ImageBackground, TouchableOpacity} from 'react-native'
import {Carousel} from "@new-space/teaset";
import Button from '../components/Button'
import {scaleSize} from '../utils/screenUtil'
import storage from '../utils/storage'

const guidePage: FunctionComponent<{init: any}> = props => {
  const [index, setIndex] = useState(0)
  
  const onChange = (index: number) => {
    setIndex(index)
	}
	
	const jump = () => {
		storage.set('initFirst', 5)
		props.init()
	}

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: index === 3 ? 'transparent' : '#fff'}}>
      <Button onPress={jump} titleStyle={{color: '#fff'}} style={{position: 'absolute', width: scaleSize(92), height: scaleSize(61), zIndex: 9, backgroundColor: 'rgba(0,0,0,0.32)', top: scaleSize(110), right: scaleSize(50)}} title='跳过'/>
      <Carousel 
        style={{width: '100%', height: '100%', backgroundColor: 'transparent'}} 
        onChange={onChange} 
        carousel={false} 
        cycle={false}
        control={
          <Carousel.Control
            style={{alignItems: 'center', marginBottom: scaleSize(40)}}
            dot={<View style={{width: scaleSize(20), marginLeft: scaleSize(5), marginRight: scaleSize(5), height: scaleSize(20), borderRadius: scaleSize(10), backgroundColor: '#ccc'}}></View>}
            activeDot={<View style={{width: scaleSize(20), height: scaleSize(20),marginLeft: scaleSize(5), marginRight: scaleSize(5), borderRadius: scaleSize(10), backgroundColor: '#526dcd'}}></View>}
          />
        }
      >
        <Image style={{width: '100%', height: '100%'}} resizeMode='cover' source={require('../images/guide/guidePage7.png')} />
        <Image style={{width: '100%', height: '100%'}} resizeMode='cover' source={require('../images/guide/guidePage8.png')} />
        <ImageBackground imageStyle={{height: '100%', width: '100%', resizeMode: 'cover'}} style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}} source={require('../images/guide/guidePage9.png')}>
          <TouchableOpacity onPress={jump} style={{width: scaleSize(366), height: scaleSize(91), marginBottom: scaleSize(120)}} activeOpacity={0.9}>
            <Image style={{width: '100%', height: '100%'}} resizeMode='contain' source={require('../images/guide/guidePageBtn.png')}/>
          </TouchableOpacity>
        </ImageBackground>
      </Carousel>
    </View>
    )
}

export default guidePage
