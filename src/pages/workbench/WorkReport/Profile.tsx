import React, { FC } from 'react'
import { View, Text, Image } from 'react-native'
//@ts-ignore
import Shadow from '../../../components/Shadow'
import moment from 'moment'
import styles from './profile.styles'
import { UserInfo } from '../../../models/types'

const Profile: FC<UserInfo> = ({
  sex,
  avatar,
  trueName,
  filialeShortName,
  deptName,
  createTime,
}) => {
  const getAvatar = (pAvatar?: string, pSex?: number) => {
    if (pAvatar) {
      return { uri: pAvatar }
    }
    return pSex === 1
      ? require('../../../images/defaultImage/avatar.man.png')
      : require('../../../images/defaultImage/avatar.woman.png')
  }
  return (
    <Shadow style={styles['container']}>
      {/* left */}
      <View style={styles['left']}>
        <Image
          style={styles['avatar']}
          source={getAvatar(avatar, sex)}
        />
        <View style={styles['left-text']}>
          <Text style={styles['left-row1']} numberOfLines={1}>
            {trueName}
          </Text>
          <Text style={styles['left-row2']} numberOfLines={1}>
            <Text>{filialeShortName}</Text>
            {filialeShortName && deptName ? '|' : null}
            <Text>{deptName}</Text>
          </Text>
        </View>
      </View>

      {/* right */}
      <View style={styles['right']}>
        <View style={styles['right-row1']}>
          <Text style={styles['days-value']}>
            {moment().diff(moment(createTime, 'YYYY-MM-DD'), 'days')}
          </Text>
          <Text style={styles['days-unit']}>天</Text>
        </View>
        <Text style={styles['right-row2']}>使用铺侦探</Text>
      </View>
    </Shadow>
  )
}

export default Profile
