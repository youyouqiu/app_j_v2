/**
 * @author: zxs
 * @date: 2020/5/28
 */
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {scaleSize} from "@/utils/screenUtil";

const RecommendSkeleton = () => {


  return (
    <View style={styles.m_content}>
      <View style={styles.m_container}>
        <View style={styles.m_reco_buildingInfo_content}>
          <View style={styles.m_reco_buildingInfo}>
            <Text style={styles.m_reco_building_name} numberOfLines={1}>&emsp;</Text>
            <View style={styles.m_reco_building_labels}>
              <Text style={styles.m_reco_building_projectType}/>
              <Text style={styles.m_reco_building_projectType}/>
              <Text style={styles.m_reco_building_projectType}/>
            </View>
            <Text style={styles.m_reco_reason}/>
            <Text style={styles.m_reco_reason}/>
            <Text style={styles.m_reco_reason}/>
          </View>
          <View style={styles.m_reco_building_img}/>
        </View>

        <View style={styles.m_reco_buildingList}>
          <View style={styles.m_reco_date_wrapper}/>
          <View style={styles.m_reco_buildingList_icons}>
            {new Array(5).fill(Math.random()).map((v, i) => (
              <View style={styles.m_reco_buildingList_icon_wrap}>
                <View style={[styles.m_reco_buildingList_icon]}/>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
};

export default RecommendSkeleton

const styles = StyleSheet.create({
  m_content: {
    paddingHorizontal: scaleSize(32),
    marginTop: scaleSize(24),
    paddingTop: scaleSize(24),
    paddingBottom: scaleSize(16)
  },
  m_container: {
    paddingHorizontal: scaleSize(24),
    backgroundColor: 'rgba(255,255,255,0)',
    zIndex: 2
  },
  m_reco_buildingInfo_content: {
    flexDirection: 'row'
  },
  m_reco_buildingInfo: {
    flex: 1,
    paddingRight: scaleSize(50)
  },
  m_reco_building_name: {
    fontSize: scaleSize(32),
    fontWeight: 'bold',
    backgroundColor: '#eaeaea'
  },
  m_reco_building_labels: {
    flexDirection: 'row',
    paddingTop: scaleSize(13),
    paddingBottom: scaleSize(24),
    flexWrap: 'nowrap'
  },
  m_reco_building_projectType: {
    width: scaleSize(76),
    height: scaleSize(33),
    marginRight: scaleSize(8),
    backgroundColor: '#eaeaea'
  },
  m_reco_reason: {
    color: '#919191',
    fontSize: scaleSize(25),
    lineHeight: scaleSize(34),
    backgroundColor:'#eaeaea',
    marginBottom:scaleSize(10)
  },
  m_reco_building_img: {
    width: scaleSize(320),
    height: scaleSize(225),
    borderRadius: scaleSize(8),
    backgroundColor: '#eaeaea'
  },
  m_reco_buildingList: {
    flexDirection: 'row',
    paddingTop: scaleSize(20)
  },
  m_reco_date_wrapper: {
    backgroundColor: '#eaeaea',
    padding: scaleSize(8),
    marginRight: scaleSize(40),
    borderRadius: scaleSize(4),
    width:scaleSize(130),
    height:scaleSize(60)
  },
  m_reco_date: {
    fontSize: scaleSize(45),
    color: '#1F3070'
  },
  m_reco_month_wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: scaleSize(6)
  },
  m_reco_month: {
    fontSize: scaleSize(16),
    color: '#1F3070',
    paddingTop: scaleSize(4)
  },
  m_reco_week: {
    fontSize: scaleSize(16),
    color: '#868686',
    paddingBottom: scaleSize(4)
  },
  m_reco_buildingList_icons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  m_reco_buildingList_icon_wrap: {
    paddingHorizontal: scaleSize(10)
  },
  m_reco_buildingList_icon: {
    width: scaleSize(76),
    height: scaleSize(60),
    borderWidth: scaleSize(4),
    borderColor: '#eaeaea',
    borderRadius: scaleSize(4),
    backgroundColor:'#eaeaea'
  },
  m_reco_buildingList_icon_s: {
    borderColor: '#1F3070',
  },
});
