import React, {FC} from 'react'
import {Text, Image, TouchableOpacity, ImageSourcePropType, View} from 'react-native'
import navigation from '../../utils/navigation'
import styles from './Item.styles'
import BuryingPoint from '../../utils/BuryPoint'

export interface ItemProps {
    title: string
    path: string
    icon: ImageSourcePropType
    auth?: boolean
    visible?: boolean
    disabled?: boolean,
    locked?: boolean
}

const Item: FC<ItemProps> = ({
                                 title,
                                 path,
                                 disabled = false,
                                 icon,
                                 auth = true,
                                 visible = true,
                                 locked = false
                             }) => {
    const handlePress = () => {
        BuryingPoint.add({
            page: '工作台',
            target: `${title}_button`,
        });
        // 未认证权重最高
        if (!auth) {
            navigation.navigate('AuthRouter')
            return
        }
        // 被锁权重其次
        if (locked) return;
        navigation.navigate(path)
    }
    return visible ? (
        <TouchableOpacity
            activeOpacity={1}
            style={styles['wrapper']}
            disabled={disabled}
            onPress={handlePress}
        >
            <View style={styles['imgWrap']}>
                <Image style={styles['img']} source={icon}/>
                {locked ? (
                    <Image source={require('../../images/icons/lock.png')} style={styles['lock']}/>
                ) : null}
            </View>
            <Text style={styles['text']}>{title}</Text>
        </TouchableOpacity>
    ) : null
}

export default Item
