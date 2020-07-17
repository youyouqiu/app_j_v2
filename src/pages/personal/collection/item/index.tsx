import React, { FunctionComponent, useState, useEffect } from 'react'
import {View, TouchableOpacity, Image, StyleSheet} from "react-native";
import { NavigationScreenProps } from 'react-navigation';
import {Checkbox} from '@new-space/teaset'
import styles from './style';
import BuildingPreview from '@/businessComponents/BuildingPreview';
import {IBuildingPreview} from "@/services/building/buildingList";

interface collectionItemParam {
    item: IBuildingPreview,
    selectList: string[],
    editing: boolean,
    isChecked: boolean,
    onChangeCheck: (id: string) => void
}

const CollectionItem: FunctionComponent<collectionItemParam  & NavigationScreenProps> = ({item, selectList, editing, onChangeCheck, navigation}) => {
    const [checked, setChecked] = useState<boolean>(false);
    const goDetails = () => {
        (item.buildingTreeId) && navigation.navigate('buildingDetail',{buildingTreeId: item.buildingTreeId})
    };
    useEffect(() => {
        setChecked((selectList || []).findIndex(id => id === item.buildingTreeId) !== -1)
    }, [selectList]);

    return <View style={styles['content']}>
        {
            (editing && <View style={styles['select']}>
                <Checkbox
                    checked={checked}
                    size={'lg'}
                    onChange={() => onChangeCheck(item.buildingTreeId!)}
                    checkedIcon={<Image style={styles['checked-img']} key='icon' source={require('@/images/icons/checkbox_2.png')} />}
                    uncheckedIcon={<Image style={styles['checked-img']} key='icon' source={require('@/images/icons/checkbox_1.png')} />}
                />
            </View>)
        }
        <TouchableOpacity activeOpacity={1}  onPress={() => !editing ? goDetails() : onChangeCheck(item.buildingTreeId!)} style={[{flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#EAEAEA'}]}>
            <BuildingPreview data={item}/>
        </TouchableOpacity>
    </View>
};

export {
    CollectionItem
}