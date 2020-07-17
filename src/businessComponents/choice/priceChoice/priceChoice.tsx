/**
 * @author: zxs
 * @date: 2020/5/7
 */
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import ScrollableTabView from '@new-space/react-native-scrollable-tab-view';
import styles from '../styles'
import { connect } from "react-redux";
import LabelGroup from "@/businessComponents/LabelGroup/LabelGroup";
import { IChoiceLabelDataPropsType } from "@/businessComponents/LabelGroup/types";
import { IChoicePricePropsType } from "./types";

const tabLabel = {
  totalPrice: {
    name: '总价(万/套)'
  },
  unitPrice: {
    name: '单价(万/㎡)'
  }
};

const PriceChoice = ({
  dictionaries,
  onchange = () => null,
  totalPriceSelectValues = [],
  unitPriceSelectValues = [],
  config,
  dispatch,
}: IChoicePricePropsType) => {

  const [totalPriceSelectValuesArr, setTotalPriceSelectValuesArr] = useState(totalPriceSelectValues);
  const [unitPriceSelectValuesArr, setUnitPriceSelectValuesArr] = useState(unitPriceSelectValues);

  useEffect(() => {
    dispatch({
      type: 'dictionaries/getDictionaryDefines',
      payload: {
        requestUrl: config.requestUrl.public,
        requestData: ['SEARCH_PRICE_XYH', 'SHOP_UNIT_PRICE']
      }
    })
  }, [])

  useEffect(() => {
    setTotalPriceSelectValuesArr(totalPriceSelectValues);
    setUnitPriceSelectValuesArr(unitPriceSelectValues);
  }, [totalPriceSelectValues, unitPriceSelectValues]);

  const _totalPriceOnchange = (params: Array<IChoiceLabelDataPropsType>) => {
    onchange && onchange(params, 'total');
    setTotalPriceSelectValuesArr(params);
    setUnitPriceSelectValuesArr([]);
  };

  const _unitPriceOnchange = (params: Array<IChoiceLabelDataPropsType>) => {
    onchange && onchange(params, 'unit');
    setUnitPriceSelectValuesArr(params);
    setTotalPriceSelectValuesArr([]);
  };

  const TotalPriceComponent = () => {
    return (
      <View style={styles.cp_tab_item}>
        <LabelGroup flex={true}
          selectValues={totalPriceSelectValuesArr}
          multiple={true}
          onchange={_totalPriceOnchange}
          data={dictionaries.search_price_xyh} />
      </View>
    )
  };

  const UnitPriceComponent = () => {
    return (
      <View style={styles.cp_tab_item}>
        <LabelGroup flex={true}
          selectValues={unitPriceSelectValuesArr}
          multiple={true}
          onchange={_unitPriceOnchange}
          data={dictionaries.shop_unit_price} />
      </View>
    )
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => null} style={styles.cp_wrapper}>
      <ScrollableTabView>
        <TotalPriceComponent data-value={tabLabel.totalPrice} />
        <UnitPriceComponent data-value={tabLabel.unitPrice} />
      </ScrollableTabView>
    </TouchableOpacity>
  )
};
const mapStateToProps = ({ dictionaries, config }: any) => {
  return { dictionaries, config }
};

export default connect(mapStateToProps)(PriceChoice)
