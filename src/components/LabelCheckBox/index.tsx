import React, { FC, useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styles from './styles'

interface Props {
  label: string
  separator?: boolean
  name?: string
  value?: boolean
  onChange?: (params: { name?: string, value: boolean }) => void
}

const LabelCheckBox: FC<Props> = ({ label, name, value, separator = false, onChange }) => {
  const [checked, setChecked] = useState(false)
  const _checked = typeof value === 'boolean' ? value : checked
  const handleChange = () => {
    onChange && onChange({ name, value: !_checked })
    setChecked(!_checked)
  }
  return (
    <View style={separator ? styles['separator'] : null}>
      <TouchableOpacity
        style={[styles['container'], _checked ? styles['checked'] : null]}
        activeOpacity={1}
        onPress={handleChange}
      >
        <Text style={[styles['text'], _checked ? styles['checked'] : null]}>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LabelCheckBox
