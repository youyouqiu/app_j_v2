/**
 * @author: zxs
 * @date: 2020/5/7
 */
import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from '../styles'
import { connect } from "react-redux";
import LabelGroup from "@/businessComponents/LabelGroup/LabelGroup";
import { IChoiceLabelDataPropsType } from "@/businessComponents/LabelGroup/types";
import { IChoiceAreaPropsType } from "@/businessComponents/choice/areaChoice/types";

const AreaChoice = ({
  dictionaries,
  onchange = () => null,
  areaSelectValues = [],
  config,
  dispatch,
}: IChoiceAreaPropsType) => {

  useEffect(() => {
    dispatch({
      type: 'dictionaries/getDictionaryDefines',
      payload: {
        requestUrl: config.requestUrl.public,
        requestData: ['SEARCH_SHOPS_AREA']
      }
    })
  }, [])

  const _onchange = (params: Array<IChoiceLabelDataPropsType>) => {
    onchange && onchange(params);
  };

  const AreaComponent = (props: any) => {
    return (
      <View style={styles.cp_tab_item}>
        <LabelGroup flex={true}
          selectValues={areaSelectValues}
          multiple={true}
          onchange={_onchange}
          data={dictionaries.search_shops_area} />
      </View>
    )
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.cp_wrapper}>
      <AreaComponent />
    </TouchableOpacity>
  )
};
const mapStateToProps = ({ dictionaries, config }: any) => {
  return { dictionaries, config }
};

export default connect(mapStateToProps)(AreaChoice)
