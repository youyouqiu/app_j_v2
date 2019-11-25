import React, { useState, FC, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
//@ts-ignore
import Shadow from '../../../Shadow'
import RangePicker from './RangePicker'
import { DateMoment, DateString } from './types'
import moment from 'moment'
import styles from './rangerPickerWithText.style'

interface CounterTableProps {
  startTime: string
  onChose: (start: string, end: string) => void
  endTime?: string
  value?: string[]
}
const CounterTable: FC<CounterTableProps> = ({
  startTime,
  onChose,
  endTime,
  value = []
}) => {
  const [date, setDate] = useState<DateMoment>([moment(value[0] || startTime), moment(value[1] || endTime)])

  useEffect(() => {
    setDate([moment(value[0] || startTime), moment(value[1] || endTime)])
  }, [value])

  const dateFormat = (date: moment.Moment) => {
    return date.format('YYYY-MM-DD')
  }

  const handleChose = (chose: DateMoment, choseString: DateString) => {
    setDate(chose)
    onChose(...choseString)
  }

  return <>
    {/* 本体 */}
    <View style={styles['container']}>

      {/* header */}
      <RangePicker
        style={styles['header']}
        enableDate={[startTime, moment()]}
        defaultValue={date}
        onChose={handleChose}
      >
        {/* header - left */}
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles['icon']}
            source={require('../../images/icons/calendar.png')}
          />
          <Text style={styles['title']}>日期</Text>
        </View>

        {/* header - right */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles['date']}>
            {`${dateFormat(date[0])} 至 ${dateFormat(date[1])}`}
          </Text>
          <Image
            style={styles['icon']}
            source={require('../../images/icons/chose.png')}
          />
        </View>
      </RangePicker>
    </View>
  </>
}

export default CounterTable
