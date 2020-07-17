/**
 * @author: zxs
 * @date: 2020/5/22
 */
import {Platform, StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const styles = StyleSheet.create({
  noDataText: {
    color: '#868686'
  },
  noData: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  address: {
    fontSize: scaleSize(24),
    color: '#868686'
  },
  addressIcon: {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  distance: {
    fontSize: scaleSize(24),
    color: '#868686'
  },
  valueItemName: {
    fontSize: scaleSize(28),
    color: '#000000',
    marginBottom: scaleSize(10)
  },
  valueItemRight: {
    flex: 0,
    flexDirection: 'row'
  },
  valueItemLeft: {
    flex: 1,
    flexDirection: 'column'
  },
  valueItem: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: scaleSize(24),
    paddingRight: scaleSize(24),
    paddingTop: scaleSize(16),
    paddingBottom: scaleSize(16)
  },
  itemText: {
    fontSize: scaleSize(24),
  },
  itemIcon: {
    width: scaleSize(32),
    height: scaleSize(32)
  },
  renderTabBarItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: scaleSize(12),
    paddingBottom: scaleSize(12),
    flex: 1
  },
  renderTabBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scaleSize(90)
  },
  ms_wrapper: {
    flexDirection: 'column',
    height: '100%',
  },
  ms_map_view: {
    width: '100%',
    height: '70%'
  },
  ms_marker_icon: {
    width: scaleSize(82),
    height: scaleSize(82)
  },
  ms_footer: {
    height: scaleSize(150),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(20),
    flexDirection: 'row', alignItems: 'center'
  },
  ms_footer_left: {
    flex: 1
  },
  ms_footer_text1: {
    fontSize: scaleSize(32),
    color: '#494A4C'
  },
  ms_footer_text2: {
    fontSize: scaleSize(28),
    color: '#868686',
    paddingTop: scaleSize(10)
  },
  ms_footer_right_icon: {
    width: scaleSize(100),
    height: scaleSize(100)
  },
  markerView:{
    width: scaleSize(48),
    height: scaleSize(58)
  },
  mapView_callout_shadow:{
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'ios' ? scaleSize(-50) : 0,
    padding: scaleSize(10),
  },
  current_location:{
    position: 'absolute',
    bottom: '32%',
    right: scaleSize(50),
    padding: scaleSize(10)
  },
  current_navigation:{
    position: 'absolute',
    bottom: '32%',
    right: scaleSize(130),
    padding: scaleSize(10)
  },
  current_location_icon:{
    width: scaleSize(55),
    height: scaleSize(55)
  }
});

export default styles
