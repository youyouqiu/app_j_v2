import {StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const styles = StyleSheet.create({
    bd_image: {
        width: '100%',
        height: 200,
        flexDirection:'row',
        justifyContent:'center'
    },
    bd_wrapper:{
        paddingHorizontal:scaleSize(32),
        paddingTop:scaleSize(32)
    },
    bd_title:{
        borderRadius:0,
        height: scaleSize(40),
        marginBottom:scaleSize(6)
    },
    bd_sub_title:{
        borderRadius:0,
        height: scaleSize(20),
        width: scaleSize(400)
    }
});
export default styles
