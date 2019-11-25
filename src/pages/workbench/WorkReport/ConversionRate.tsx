import React, { FC, ReactText } from 'react'
import { View, Text } from 'react-native'
//@ts-ignore
import Shadow from '../../../components/Shadow'
import styles from './conversionRate.styles'
import { TRate } from './types'

const Label: FC<{ value: ReactText, color: string }> = ({ value, color }) => {
  return (
    <View style={[styles['label'], { backgroundColor: color }]}>
      <Text style={styles['label-text']}>{value}</Text>
    </View>
  )
}

interface ConversionProps {
  value?: ReactText,
  reverse?: boolean
}
const Conversion: FC<ConversionProps> = ({ value, reverse }) => {
  return (
    <View style={styles['conversion']}>
      <Text style={styles['conversion-title']}>转换率</Text>
      <View style={styles['conversion-line'](reverse)}>
        <View style={styles['conversion-angle'](reverse)} />
      </View>
      <Text style={styles['conversion-value']}>{`${(value || 0)}%`}</Text>
    </View>
  )
}
const ConversionWithTransform: FC<ConversionProps> = ({ children, ...props }) => {
  return (
    <View style={styles['conversion-transform']}>
      <Conversion {...props} />
    </View>
  )
}

const ConversionRate: FC<TRate> = ({
  bb2df,
  df2rg,
  rg2qy,
  bb2qy,
}) => {
  return (
    <Shadow style={styles['container']}>
      <View style={styles['row']}>
        <Label value='报备' color='#4B6AC5' />
        <Conversion value={bb2df} />
        <Label value='来访' color='#3AD047' />
      </View>

      <View style={styles['row-middle']}>
        <ConversionWithTransform value={bb2qy} />
        <Text style={styles['middle-text']}>我的转换率</Text>
        <ConversionWithTransform value={df2rg} />
      </View>

      <View style={styles['row']}>
        <Label value='签约' color='#FE5139' />
        <Conversion reverse value={rg2qy} />
        <Label value='认购' color='#49A1FF' />
      </View>
    </Shadow>
  )
}

export default ConversionRate
