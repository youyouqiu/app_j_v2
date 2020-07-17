/**
 * @author: zxs
 * @date: 2020/6/11
 */
import Page from "@/components/Page";
import React, {useEffect} from "react";
import {View, Text, TextInput, Image, TouchableOpacity} from "react-native";
import styles from './styles'

const add_circular_dark = require('../../../../images/icons/add_circular_dark.png');
const Comment = () => {

  useEffect(()=>{

  });

  return (
    <View style={styles.c_wrapper}>
      <Page title='评价'>
        <View style={styles.c_content}>
          <View style={styles.c_comment_header}>
            <Text style={styles.c_header_text_1}>编辑你对</Text>
            <Text style={styles.c_header_text_2}>红星大都汇 9栋-2-3</Text>
            <Text style={styles.c_header_text_1}>的评价</Text>
          </View>
          <View style={styles.c_comment_content}>
            <TextInput multiline={true}
                       style={styles.c_text_input}
                       placeholder='你觉得红星大都汇 9栋-2-3的位置怎么样，交通是否便利，周边配套是否齐全，或者有其他想说的？'/>
            <View style={styles.c_comment_footer}>
              <Text style={styles.c_comment_clean}>清空</Text>
              <Text style={styles.c_comment_number}>0/50</Text>
            </View>
          </View>
        </View>

        <View style={styles.c_line}/>

        <View style={styles.c_content}>
          {new Array(5).fill(Math.random()).map((v, i) => (
            <View style={styles.c_comments_item}>
              <View style={styles.c_item_header}>
                <Text style={styles.c_item_header_title}>默认评价</Text>
                <Image style={styles.c_item_header_icon} source={add_circular_dark}/>
                <Text style={styles.c_item_header_add}>加入评价</Text>
              </View>
              <Text style={styles.c_item_content}>位置特色：新盘集合人文商旅、健康医疗、养生居住等多种功能的新型城市，双轻轨换乘站 + 住宅组团入口 + 景观广场，不夜九街，配套位置好，核心地段，人流量超级多。</Text>
              <Text style={styles.c_item_tips}>此文案内容来自楼盘详情</Text>
            </View>
          ))}
        </View>
      </Page>
      <View style={styles.c_footer}>
        <TouchableOpacity style={styles.c_footer_touch}>
          <Text style={styles.c_footer_text}>保存</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

};

export default Comment
