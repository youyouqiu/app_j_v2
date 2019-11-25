import React, { FC } from 'react'
import { TouchableOpacity, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { DateType, EnableDate } from './types'
import styles from './calendar.styles'
import moment from 'moment'

/**
 * state -> chose状态
 * 0: chose === [undefind,undefind]
 * 1: chose === [moment,undefind]
 * 2: chose === [moment,moment]
 */
export type Code = 0 | 1 | 2
export type Chose = [moment.Moment?, moment.Moment?]
interface CalendarProps {
  date: DateType
  chose: Chose
  enableDate: EnableDate
  onChose: (date: moment.Moment) => void
}
const Calendar: FC<CalendarProps> = ({
  date,
  chose,
  enableDate,
  onChose,
}) => {
  const firstDay = moment(date).startOf('month')
  const firstDayStr = firstDay.format('YYYYMM')

  const choseStart = chose[0] ? moment(chose[0]).startOf('date').format('YYYYMMDD') : undefined
  const choseEnd = chose[1] ? moment(chose[1]).endOf('date').format('YYYYMMDD') : undefined

  const enableStart = moment(enableDate[0]).startOf('date').format('YYYYMMDD')
  const enableEnd = moment(enableDate[1]).endOf('date').format('YYYYMMDD')

  const days = []
  //  左侧空白
  const leftNum = firstDay.weekday()
  if (leftNum) {
    days.push(<View key='left' style={{ width: `${leftNum * 100 / 7}%` }} />)
  }
  // 日子
  for (let i = 0; i < firstDay.daysInMonth(); i++) {
    // 当前日期
    const current = `${firstDayStr}${`0${i + 1}`.slice(-2)}`

    // 样式
    const DStyle: StyleProp<ViewStyle> = [styles['day']]
    const DTStyle: StyleProp<TextStyle> = [styles['day-text']]
    const BCStyle: StyleProp<ViewStyle> = [styles['bubble-content']]

    // 可选样式
    if (current === choseStart || current === choseEnd) {
      DStyle.push(styles['day-side'])
      DTStyle.push(styles['day-side-text'])
      if (!choseEnd) {
        DStyle.push(styles['day-side-left'], styles['day-side-right'])
      } else {
        DStyle.push(current === choseStart
          ? styles['day-side-left']
          : styles['day-side-right'])
        DStyle.push(current === choseEnd
          ? styles['day-side-right']
          : styles['day-side-left'])
      }
    }
    else if (choseStart && choseEnd && current > choseStart && current < choseEnd) {
      DStyle.push(styles['day-middle'])
    }

    // 不可选样式
    const disabled = current < enableStart || current > enableEnd
    if (disabled) {
      DTStyle.push(styles['day-disabled-text'])
    }

    // 泡泡左右偏移样式
    if (choseStart === current && !choseEnd) {
      if (moment(choseStart).weekday() === 0) {
        BCStyle.push({ marginLeft: 0 })
      }
      else if (moment(choseStart).weekday() === 6) {
        BCStyle.push({ marginRight: 0 })
      }
    }

    // 渲染日期item
    days.push(
      <View style={styles['day-container']}>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={1}
          style={DStyle}
          onPress={() => onChose(firstDay.add(i, 'day'))}
        >
          <Text style={DTStyle}>{i + 1}</Text>
        </TouchableOpacity>

        {/* 请选择结束日期 */}
        {choseStart === current && !choseEnd && (
          <View style={styles['bubble']}>
            <View style={BCStyle}>
              <Text style={styles['bubble-content-text']}>请选择结束日期</Text>
            </View>
            <View style={styles['bubble-triangle']} />
          </View>
        )}
      </View>
    )
  }
  return (
    <View style={styles['container']}>
      {days}
    </View>
  )
}

export default Calendar
