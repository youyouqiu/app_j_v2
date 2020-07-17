/**
 * @author: zxs
 * @date: 2020/5/27
 */
import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const styles = StyleSheet.create({
  bc_wrapper: {
    flexDirection: 'column',
    width: scaleSize(400),
    height:scaleSize(500),
    paddingHorizontal:scaleSize(32),
    backgroundColor:'#fff'
  },
  bc_company_name: {
    paddingTop:scaleSize(32),
    lineHeight:scaleSize(40),
    textAlign: 'center'
  },
  bc_container: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  bc_errorText:{
    color: '#868686',
    textAlign: 'center',
    marginBottom: scaleSize(24)
  }
});
export default styles
