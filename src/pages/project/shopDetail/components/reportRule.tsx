import { LayoutChangeEvent, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import projectService from "../../../../services/projectService";
import SubHeader from "@/pages/main/components/SubHeader";
import ScrollableTabView, { ChangeTabProperties } from '@new-space/react-native-scrollable-tab-view'
import styles from '../styles'
import { IReportOtherInfoType, IReportRuleTypes, ReportRulePropsTypes } from "@/pages/project/shopDetail/types/ReportRuleTypes";
import NoData from '@/pages/project/newBuildingDetail/components/noData';
import SwitchView from '@/components/SwitchView';
import { scaleSize } from "@/utils/screenUtil";
import BuryPoint from '@/utils/BuryPoint';

const SwitchViewItem = SwitchView.Item;

const defaultHeight = scaleSize(500);
const ReportRule = ({
  reportOtherInfo = {} as IReportOtherInfoType,
  reportRule,
  onLayout,
  page,
}: ReportRulePropsTypes) => {
  const [tabViews, setTabViews] = useState<number[]>([]);
  const [canLayout, setCanLayout] = useState<Boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [scrollableHeight, setScrollableHeight] = useState<number>(defaultHeight);

  const onTabViewLayout = (event: LayoutChangeEvent, i: number) => {
    if (canLayout) return // 在点击切换tab的时候不再进行高度的切换
    let _tabViews = tabViews.concat([]);
    _tabViews[i] = event.nativeEvent.layout.height;
    setTabViews(_tabViews);
    (i === 0) && setScrollableHeight(_tabViews[tabIndex]);
  };

  const handleTabHeight = (obj: ChangeTabProperties) => {
    setCanLayout(true)
    BuryPoint.add({
      page,
      target: '销售规则tab_button',
      action_param: {
        tabName: obj.ref.props['data-value'].name,
      },
    })
    setTabIndex(obj.i)
    setScrollableHeight(tabViews[obj.i])
  };
  const ReportRule = () => {
    return (
      <View style={styles.sd_rr_reportRule_wrapper}>
        <SwitchView current={(reportRule !== null && reportRule.length !== 0) ? 1 : 2}>
          <SwitchViewItem type={1}>
            <View style={styles.sd_rr_reportRule}>
              {reportRule ? (reportRule as IReportRuleTypes[]).map(item => (
                <View style={styles.sd_rr_reportRule_item} key={item.key}>
                  <View style={styles.sd_rr_reportRule_label_wrapper}>
                    <Text style={styles.sd_rr_reportRule_label}>{item.data.label}</Text>
                  </View>
                  <View style={styles.sd_rr_reportRule_value_wrapper}>
                    <Text style={styles.sd_rr_reportRule_value}>{item.data.value}</Text>
                  </View>
                </View>
              )) : null}
            </View>
          </SwitchViewItem>
          <SwitchViewItem type={2}>
            <NoData />
          </SwitchViewItem>
        </SwitchView>
      </View>
    )
  };

  const ReportOtherElem = (props: { info?: string }) => {
    return <SwitchView current={props.info ? 1 : 2}>
      <SwitchViewItem type={1}>
        <Text style={styles.sd_rr_text_wrapper}>{props.info}</Text>
      </SwitchViewItem>
      <SwitchViewItem type={2}>
        <NoData />
      </SwitchViewItem>
    </SwitchView>
  };
  return (
    <View style={styles.sd_rr_wrapper} onLayout={onLayout}>
      <SubHeader subTitle='销售规则' />
      <View style={styles.sd_rr_tab_wrapper}>
        <ScrollableTabView
          locked={true}
          prerenderingSiblingsNumber={Infinity}
          style={{ height: scrollableHeight + scaleSize(200) }}
          tabBarBackgroundColor='white'
          tabBarInactiveTextColor={'#4D4D4D'}
          tabBarActiveTextColor={'#1F3070'}
          tabBarStyle={styles.sd_rr_tab_scroll_tab}
          tabBarUnderlineStyle={styles.sd_rr_tab_scroll_tab_line}
          onChangeTab={(obj: ChangeTabProperties) => handleTabHeight(obj)}>
          <View data-value={{ name: "报备规则" }} onLayout={(event) => onTabViewLayout(event, 0)} style={styles.sd_rr_tab_view_wrapper}>
            <ReportRule />
          </View>
          <View data-value={{ name: "案场制度" }} onLayout={(event) => onTabViewLayout(event, 1)} style={styles.sd_rr_tab_view_wrapper}>
            <ReportOtherElem info={reportOtherInfo.caseSystem} />
          </View>
          <View data-value={{ name: "带看流程" }} onLayout={(event) => onTabViewLayout(event, 2)} style={styles.sd_rr_tab_view_wrapper}>
            <ReportOtherElem info={reportOtherInfo.lookProcess} />
          </View>
          <View data-value={{ name: "佣金方案" }} onLayout={(event) => onTabViewLayout(event, 3)} style={styles.sd_rr_tab_view_wrapper}>
            <ReportOtherElem info={reportOtherInfo.moneyProgramme} />
          </View>
        </ScrollableTabView>
      </View>
    </View>
  )
};
export default ReportRule
