/**
 * @author: zxs
 * @date: 2020/6/2
 */
import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";


const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  registerProtocol: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: scaleSize(20)
  },
  agreeText: {
    color: '#868686',
    fontSize: scaleSize(26)
  },
  agreeTextWrap: {
    fontSize: scaleSize(22)
  },
  agreeProtocolText: {
    color: '#1F3070',
  },
  header_wrapper: {
    paddingTop: scaleSize(100),
    paddingBottom:scaleSize(20),
    paddingHorizontal: scaleSize(48),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaleSize(20)
  },
  header_logo: {
    width: scaleSize(55),
    height: scaleSize(55),
    marginRight: scaleSize(20)
  },
  hello: {
    fontSize: scaleSize(44),
    fontWeight: '400',
    color: '#000',
  },
  header_desc: {
    fontSize: scaleSize(26),
    color: '#868686'
  },
  welcome: {
    color: '#868686',
    fontSize: scaleSize(28),
    fontWeight: '400',
    lineHeight: scaleSize(45),
    marginLeft: scaleSize(16)
  },
  tourist: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touristText: {
    color: '#1F3070',
    fontSize: scaleSize(28),
    fontWeight: '400',
    width:'100%',
    textAlign:'center',
    paddingTop:scaleSize(40)
  },
  tab_wrapper: {
    minHeight:scaleSize(600),
    paddingTop: scaleSize(48),
  },
  tabBarStyle: {
    display: 'none',
  },
  footer_wrapper: {
    paddingHorizontal: scaleSize(60),
  },
  footer_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:scaleSize(40)
  },
  footer_text: {
    fontSize: scaleSize(22),
    color: '#868686',
    paddingHorizontal: scaleSize(30)
  },
  footer_line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#868686'
  },
  footer_content: {
    flexDirection: 'row',
  },
  footer_content_item: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  footer_content_touch:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  footer_login_logo_wrapper:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width: scaleSize(80),
    height:scaleSize(80),
    borderRadius:scaleSize(40),
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#CBCBCB'
  },
  footer_login_logo: {
    width: scaleSize(40),
    height:scaleSize(40)
  },
  footer_login_text: {
    fontSize:scaleSize(28),
    paddingTop:scaleSize(30)
  }
});

export default styles
