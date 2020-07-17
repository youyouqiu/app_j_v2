import {StyleSheet} from 'react-native'
import {scaleSize} from '@/utils/screenUtil'

export default StyleSheet.create({
    l_baseStyle: {
        backgroundColor: '#CDD8FF',
        paddingTop: scaleSize(5),
        paddingBottom: scaleSize(3),
        paddingHorizontal: scaleSize(8),
        marginRight: scaleSize(9),
    },
    highCommison: {
      width: scaleSize(84),
      height: scaleSize(33),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor: '#FE5139',
      borderWidth: scaleSize(2),
      borderRadius: scaleSize(4)
    },
    img: {
      width: scaleSize(27),
      height: scaleSize(27),
    },
    redText:{
      fontSize: scaleSize(17),
      color: '#FE5139'
    },
    l_contentStyle: {
        backgroundColor: '#F4F5F9',
        paddingTop: scaleSize(5),
        paddingBottom: scaleSize(3),
        paddingHorizontal: scaleSize(8),
        marginRight: scaleSize(9),
    },

    l_textStyle: {
        color: '#1F3070',
        fontSize: scaleSize(22),
        lineHeight: scaleSize(24),
    },

    l_soloStyle: {
        width: scaleSize(76),
        height: scaleSize(32),
        marginRight: scaleSize(6),
    },
    shopCategoryType_style: {
        backgroundColor: '#CDD8FF',
        color: '#1F3070',
        fontSize: scaleSize(22),
        paddingHorizontal: scaleSize(8),
        paddingVertical: scaleSize(4),
        marginRight: scaleSize(10)
    },
    label_base_style: {
        backgroundColor: '#CDD8FF',
        color: '#1F3070',
        fontSize: scaleSize(22),
        paddingHorizontal: scaleSize(8),
        paddingVertical: scaleSize(4),
        marginRight: scaleSize(10)
    },
    label_base_style_wrap:{
        flexDirection:'row',
        alignItems:'center'
    }
})
