import React, { useState, FC } from 'react'
import { View, Text, Image } from 'react-native'
//@ts-ignore
import Shadow from '../../../components/Shadow'
import { RangePicker } from '../../../components/DatePicker'
import { DateMoment, DateString } from '../../../components/DatePicker/types'
import moment from 'moment'
import styles from './counterTable.styles'

export interface DataSourceItem {
  label: string
  value: string | number
}
interface CounterTableProps {
  loading: boolean
  startTime: string
  dataSource: DataSourceItem[]
  onChose: (start: string, end: string) => void
}
const CounterTable: FC<CounterTableProps> = ({
  loading,
  startTime,
  dataSource,
  onChose,
}) => {
  const [date, setDate] = useState<DateMoment>([moment(startTime), moment()])

  const dateFormat = (date: moment.Moment) => {
    return date.format('YYYY-MM-DD')
  }

  const handleChose = (chose: DateMoment, choseString: DateString) => {
    setDate(chose)
    onChose(...choseString)
  }

  return !loading ? <>
    {/* 本体 */}
    <Shadow style={styles['container']}>

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
            source={require('../../../images/icons/calendar.png')}
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
            source={require('../../../images/icons/chose.png')}
          />
        </View>
      </RangePicker>

      {/* body */}
      <View style={styles['body']}>
        {
          dataSource.map((item, index) => (
            <View style={styles['item']} key={index}>
              <Text style={styles['value']}>{item.value}</Text>
              <Text style={styles['label']}>{item.label}</Text>
            </View>
          ))
        }
      </View>
    </Shadow>
  </> : null
}

export default CounterTable
