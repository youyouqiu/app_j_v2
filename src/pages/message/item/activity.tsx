import React, {FunctionComponent} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType} from 'react-native'
import moment from 'moment'
import {scaleSize} from '@/utils/screenUtil'

interface DataProps {
  pushId?: string
  extData: string
  url: string
  id: string
}

interface InfoProps {
  sendTime: string
  title: string
  data?: string
  contents: string
}

interface extDataType {
  content: string,
  cover: string,
  type: number
}

const Activity: FunctionComponent<{ info: InfoProps, onPress: (url: string, param: any) => void }> = ({info, onPress}) => {
  const data: DataProps = info.data ? JSON.parse(info.data) : {};
  const extData: extDataType = JSON.parse(data.extData || '{}');
  let param: any;
  switch (data.url) {
    case 'webView':
    case 'xkjWebView':
      param = {title: info.title, url: data.id};
      break;
    case 'buildingDetail':
      param = {buildingTreeId: data.id};
      break;
    case 'textDetail':
      param = {id: data.pushId};
      break;
    default:
  }
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {
      param && onPress(data.url, param)
    }}>
      <View style={[styles.flexRow, styles.itemHeader]}>
        <Text style={styles.headerText}>{moment(info.sendTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
      </View>
      <View style={[styles['content']]}>
        {(extData || {}).cover ? <Image style={styles.img} resizeMode='stretch' source={{uri: extData!.cover}}/> : null}
        {/*<Image style={styles.img} resizeMode='stretch' source={require('@/images/pictures/AIBDT.png')}/>*/}
        <View style={{padding: scaleSize(30)}}>
          <Text style={styles.title}>{info.title}</Text>
          <Text style={styles['content-text']} numberOfLines={2}>{info.contents}</Text>
          <View style={styles['details']}>
            <Text style={styles['details-text']}>查看详情</Text>
            <Image style={styles['details-img']} source={require('@/images/icons/message/jt.png')}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  'content': {
    backgroundColor: '#fff',
    width: scaleSize(686),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    width: scaleSize(688),
    height: scaleSize(288)
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemHeader: {
    height: scaleSize(65),
    width: '100%'
  },
  headerText: {
    color: '#CBCBCB',
    fontSize: scaleSize(24),
    fontWeight: '400',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#000000',
    fontSize: scaleSize(32),
    fontWeight: '500',
    marginTop: scaleSize(16)
  },
  'content-text': {
    marginVertical: scaleSize(24),
    color: '#868686'
  },
  'details': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  'details-text': {
    color: '#1F3070',
    fontSize: scaleSize(28),
    marginRight: scaleSize(6)
  },
  'details-img': {
    width: scaleSize(30),
    height: scaleSize(30)
  }
});


export default Activity
