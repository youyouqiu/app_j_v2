import React, { useState, FC } from 'react'
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import RangePickerModal from './RangePickerModal'
import { DefaultValue, EnableDate, DateMoment, DateString } from './types'

interface RangePickerProps {
  style?: StyleProp<ViewStyle>
  defaultValue?: DefaultValue
  enableDate: EnableDate
  onChose: (dateMoment: DateMoment, dateString: DateString) => void
}
const RangePicker: FC<RangePickerProps> = ({
  style,
  defaultValue,
  enableDate,
  onChose,
  children
}) => {
  const [visible, setVisible] = useState(false)

  const handleOk = (dateMoment: DateMoment, dateString: DateString) => {
    setVisible(false)
    onChose(dateMoment, dateString)
  }

  return <>
    <TouchableOpacity
      style={style}
      activeOpacity={0.9}
      onPress={() => setVisible(true)}
    >
      {children}
    </TouchableOpacity>

    {
      visible && (
        <RangePickerModal
          defaultValue={defaultValue}
          enableDate={enableDate}
          onOk={handleOk}
          onCancel={() => setVisible(false)}
        />
      )
    }
  </>
}

export default RangePicker
