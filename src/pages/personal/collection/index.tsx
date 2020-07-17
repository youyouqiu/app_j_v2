/**
 * Created by Kary on 2020/05/06 13:54.
 */
import React, { FunctionComponent, useState, useEffect } from 'react'
import {View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, DeviceEventEmitter} from "react-native";
import {connect} from "react-redux";
import BaseContainer from '@/components/Page'
import Button from "@/components/new-space/components/Button";
import styles from './style';
import {CollectionItem} from "@/pages/personal/collection/item";
import {Checkbox, Toast} from '@new-space/teaset'
import API_getCollectionList, {getCollectionListRequest} from "@/services/collection/getCollectionList.ts";
import API_deleteFavorite from "@/services/collection/deleteFavorite.ts";
import {IBuildingPreview} from "@/services/building/buildingList";

const Collection: FunctionComponent<any> = props => {
    const pageSize = 20;
    const [editing, setEditing] = useState<boolean>(false);
    const [allElection, setAllElection] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const [inited, setInited] = useState<boolean>(false);
    const [list, setList] = useState<Array<IBuildingPreview>>([]);
    const [selectList, setSelectList ] = useState<Array<string>>([]);
    const [searchData, setSearchData] = useState({pageIndex: 0, pageSize: pageSize} as getCollectionListRequest);
    const [totalCount, setTotalCount] = useState<number>(0);

    const method = {
        initData: async (type: 'init'|'more'|'refresh' = 'init', pageIndex: number = 0) => {
            try {
                method.setLoading(type, true);
                const res = await API_getCollectionList({pageIndex: pageIndex, pageSize: searchData.pageSize});
                const _list = res.extension || [];
                console.log(res, '收藏楼盘');
                if (type === 'refresh') method.onAllElection(false);

                if (type === 'more') {
                    let arr: IBuildingPreview[] = [];
                    [...list, ..._list].forEach((item) => {
                        let _item: IBuildingPreview|undefined = arr.find((curr) => curr.buildingTreeId === item.buildingTreeId);
                        !_item && arr.push(item)
                    });
                    setList(arr);
                    (editing && allElection) && setSelectList(arr.reduce((res, curr) => {
                        curr.buildingTreeId && res.push(curr.buildingTreeId);
                        return res
                    }, [] as string[]))
                } else {
                    setList(_list)
                }
                setTotalCount(res.totalCount);
                setSearchData({pageIndex: pageIndex, pageSize: pageSize});
                !inited && setInited(true)
            } catch (e) {
                console.log(e, '列表加载失败');
                Toast.message(`列表加载失败：${e.message}`)
            } finally {
                method.setLoading(type, false);
            }
        },
        onDelete: async () => {
            if (!selectList.length) return;
            try {
                await API_deleteFavorite(allElection ? {isAll: true, buildingTreeIds: []} : {buildingTreeIds: selectList});
                await setList(list.reduce((res, curr) => {
                    if (!selectList.includes(curr.buildingTreeId!)) res.push(curr);
                    return res
                }, [] as IBuildingPreview[]));
                setSelectList([]);
                setTotalCount(allElection ? 0 : totalCount - selectList.length);
                Toast.message('已删除');
            } catch (e) {
                Toast.message(`删除失败：${e.message}`)
            } finally {
            }
        },
        onRefresh: async () => {
            console.log('刷新');
            !refreshing && method.initData('refresh', 0)
        },
        loadMore: async () => {
            console.log('到底了');
            const nowCount = list.length;
            if (totalCount > nowCount && !moreLoading) {
                let currPageIndex = Math.floor(nowCount/pageSize);
                method.initData('more', currPageIndex)
            }
        },
        edit: () => {
            setEditing(!editing);
            editing && method.onAllElection(false);
        },
        onAllElection: (checked: boolean) => {
            setAllElection(checked);
            method.setSelectList(checked)
        },
        setSelectList: (checked: boolean) => {
            !checked && setSelectList([]);
            checked && setSelectList(list.reduce((res, curr) => {
                curr.buildingTreeId && res.push(curr.buildingTreeId);
                return res
            }, [] as string[]))
        },
        onChangeCheck: (id: string) => {
            const i = selectList.findIndex(_id => _id === id);
            if (i === -1) {
                setSelectList([...selectList, id])
            } else {
                setSelectList(selectList.reduce((res, curr) => {
                    if (curr !== id) res.push(curr);
                    return res
                }, [] as string[]))
            }
        },
        isWhole: (): boolean => {
            return ((selectList.length === list.length) && list.length !== 0)
        },
        setLoading: (type: 'init'|'more'|'refresh' = 'init', value: boolean) => {
            switch (type) {
                case 'init':
                    setLoading(value);
                    break;
                case 'more':
                    setMoreLoading(value);
                    break;
                case 'refresh':
                    setRefreshing(value);
                    break;
                default:
                    break;
            }
        },
    };

    useEffect(() => {
        const fun = method.initData;
        fun();
    }, []);

    useEffect(() => {
        const listener = DeviceEventEmitter.addListener('buildingDetailBack', method.initData);
        return () => listener && listener.remove()
    }, []);

    useEffect(() => {
        const isWhole = method.isWhole();
        if (isWhole !== allElection) {
            setAllElection(isWhole);
        }
    }, [selectList]);

    const RightView = <TouchableOpacity style={styles['edit-btn']} activeOpacity={0.9} onPress={method.edit}>
        <Text  style={styles['edit-btn-text']}>{ editing ? '取消' : '编辑' }</Text>
    </TouchableOpacity>;

    const FooterView = <View style={styles['footer']}>
        <View style={styles['footer-checkbox']}>
            <Checkbox
                title={<Text style={styles['footer-checkbox-text']}>全选</Text>}
                checked={allElection}
                onChange={() => method.onAllElection(!allElection)}
                checkedIcon={<Image style={styles['checked-img']} key='icon' source={require('@/images/icons/checkbox_2.png')} />}
                uncheckedIcon={<Image style={styles['checked-img']} key='icon' source={require('@/images/icons/checkbox_1.png')} />}
            />
        </View>
        <Button onPress={method.onDelete} title='删除收藏' activeOpacity={0.8}/>
    </View>;

    return <BaseContainer
        scroll={false}
        title={'我的收藏'}
        topBarStyle={styles['top-bar']}
        rightView={RightView}
        footer={editing ? FooterView : null}
        showSkeleton={!inited}
        skeleton={<ActivityIndicator
            style={{ flex: 1 }}
            size='large'
        />}
    >
            <View style={styles['container']}>
                <FlatList
                  data={list}
                  keyExtractor={(_, i) => i.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}: any) => {
                      return  <CollectionItem item={item} isChecked={(selectList || []).findIndex(id => id === item.id) !== -1} navigation={props.navigation} selectList={selectList} editing={editing} onChangeCheck={method.onChangeCheck}/>
                  }}
                  refreshing={refreshing}
                  onRefresh={method.onRefresh}
                  onEndReached={method.loadMore}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={<Text style={styles['footer-text']}>{moreLoading ? '加载中...' : list.length === 0 ? '暂无收藏' : '到底了~'}</Text>}
                />
            </View>
        </BaseContainer>
};

const mapStateToProps = ({ user, config }: { user: any, config: any }) => {
    return { user, config }
};
export default connect(mapStateToProps)(Collection)
