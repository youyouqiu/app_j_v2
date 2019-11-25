import { ViewStyle, TextStyle } from 'react-native'
import { scaleSize } from '../../../utils/screenUtil'

export default {
  a: <ViewStyle>{
    width: scaleSize(176),
    height: scaleSize(176),
    backgroundColor: 'red',
  },
  'container': <ViewStyle>{
    flex: 1,
    paddingLeft: scaleSize(24),
    paddingVertical: scaleSize(24),
  },
  'chart': <ViewStyle>{
    flexDirection: 'row',
    alignItems: 'center',
  },
  'title': <ViewStyle>{
    marginLeft: scaleSize(31),
  },
  'title-text': <TextStyle>{
    fontSize: scaleSize(22),
    lineHeight: scaleSize(30),
  },
  'label-ul': <ViewStyle>{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: scaleSize(5),
  },
  'label': (width: string): ViewStyle => ({
    width,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleSize(17),
    marginBottom: scaleSize(7),
  }),
  'circle': (color: string): ViewStyle => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleSize(15),
    height: scaleSize(15),
    borderRadius: scaleSize(8),
    backgroundColor: color,
  }),
  'circle-inner': <ViewStyle>{
    width: scaleSize(5),
    height: scaleSize(5),
    borderRadius: scaleSize(3),
    backgroundColor: '#FFF',
  },
  'label-text': <TextStyle>{
    flex: 1,
    marginLeft: scaleSize(7),
    fontSize: scaleSize(22),
    lineHeight: scaleSize(24),
  },
}
