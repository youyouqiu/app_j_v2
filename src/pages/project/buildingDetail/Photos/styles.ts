import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { scaleSize } from '@/utils/screenUtil'
import { Theme } from 'teaset'

export default {
  'navigation': <ViewStyle>{
    height: scaleSize(96),
  },
  'navigation-item': (length: number, index: number): ViewStyle => ({
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: index === 0 ? scaleSize(38) : scaleSize(25),
    paddingRight: index === length - 1 ? scaleSize(38) : scaleSize(25),
  }),
  'navigation-item-text': (checked: boolean): TextStyle => ({
    color: checked ? '#1F3070' : '#868686',
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  }),
  'navigation-item-underline': (checked: boolean): ViewStyle => ({
    position: 'absolute',
    bottom: 0,
    width: scaleSize(55),
    height: scaleSize(5),
    borderRadius: scaleSize(4),
    backgroundColor: checked ? '#1F3070' : 'transparent',
  }),
  'content': <ViewStyle>{
    marginBottom: Theme.isIPhoneX ? scaleSize(40) : 0,
  },
  'content-title': <TextStyle>{
    marginTop: scaleSize(40),
    marginLeft: scaleSize(32),
    fontSize: scaleSize(28),
    lineHeight: scaleSize(40),
  },
  'content-list': <ViewStyle>{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: scaleSize(16),
    marginHorizontal: scaleSize(32),
  },
  'pic': <ViewStyle>{
    marginVertical: scaleSize(8),
    width: scaleSize(218),
    height: scaleSize(218),
  },
  'pic-img': <ImageStyle>{
    width: '100%',
    height: '100%',
    borderColor: '#EAEAEA',
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(8),
  },
}
