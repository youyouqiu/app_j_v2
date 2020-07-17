/**
 * Created by Kary on 2020/05/25 15:38.
 */
import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

export default StyleSheet.create({
  'search-view': {
    width: '100%',
    height: scaleSize(188),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA'
  },
  'search-icon-view': {
    paddingHorizontal: scaleSize(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
  'search-icon-img': {
      width: scaleSize(45),
      height: scaleSize(45),
  },
  'search-view-screen-1': {
    width: '100%',
    flexDirection: 'row',
    paddingVertical:scaleSize(10)
  },
  'scroll-view': {
    flexDirection: 'row',
    marginVertical: scaleSize(15),
  },
  'filters-row2-scroll': {
    paddingHorizontal: scaleSize(32),
  },
  'map-view': {
    width: '100%',
    flex: 1,
  },
  'filters-rank': {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(20),
  },
  'filters-rank-text': {
    color: '#868686',
    fontSize: scaleSize(28),
    maxWidth: scaleSize(120),
  },
  'filters-rank-img': {
    width: scaleSize(20),
    height: scaleSize(20),
  },
  'modal-view': {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%'
  },
  'modal-view-bg': {
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 9,
    bottom: 0,
    width: '100%',
    paddingTop: scaleSize(35),
    paddingBottom: scaleSize(16),
    borderTopLeftRadius: scaleSize(24),
    borderTopRightRadius: scaleSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  'modal-line': {
    backgroundColor: '#1F3070',
    width: scaleSize(50),
    height: scaleSize(10),
    borderRadius: scaleSize(5),
    marginBottom: scaleSize(35)
  },
  'modal-content': {
    borderTopRightRadius: scaleSize(24),
    borderTopLeftRadius: scaleSize(24),
    width: '100%',
  }
})