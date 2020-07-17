/**
 * @author: zxs
 * @date: 2020/5/15
 */
import {Animated} from "react-native";

export interface IHeaderBarPropsType {
    headerOpacity1:Animated.Value,
    headerOpacity0:Animated.Value,
    modalToggle:()=>void,
    shopCategoryTypeStr:string
}
