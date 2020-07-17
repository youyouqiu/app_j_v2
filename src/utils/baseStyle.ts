import { StyleSheet} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const baseStyles = StyleSheet.create({
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    columnCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default baseStyles;

export const baseStyles_paddingMerge = (p1: number = 0, p2: number = 0, p3: number = 0, p4: number = 0) => {
    return {
        paddingTop: scaleSize(p1),
        paddingLeft: scaleSize(p2),
        paddingBottom: scaleSize(p3),
        paddingRight: scaleSize(p4)
    }
};

