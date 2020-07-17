/**
 * 到访信息-业务组件(签约，到访详情有用到)
 * created by chenfengxia 2019-08-28
 *  */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {scaleSize} from '@/utils/screenUtil'
import Phone from '../../phone/index'
import moment from 'moment';
import style from './styles'
import {VisitInfoType, zcInfoType} from "@/types/singDetail/subscriptionInfoTypes";

interface VisitInfoProps {
    title: string,
    data: VisitInfoType,
    gotoPreview: (key:number,fileList:any) => void,
    zcInfo: any
}

export default class VisitInfo extends Component<VisitInfoProps> {

    render() {
        let {data = {} as VisitInfoType, title, gotoPreview, zcInfo = {} as zcInfoType} = this.props;
        let fileList = data.files || [];
        return (
            <View style={style.wrap}>
                <View style={[style.row, style.titleBox]}>
                    <Text style={style.title}>{title}</Text>
                    {data.visitTime && (
                        <Text style={style.title_reportTime}> | {moment(data.visitTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    )}
                </View>

                <View style={[style.row, style.contentBox, {justifyContent: 'space-between', alignItems: 'center'}]}>
                    <View style={[style.row, {flex: 1}]}>
                        <Text style={[style.label]}>项目经理：</Text>
                        <Text style={[style.normalText, {flex: 1}]} numberOfLines={1}>
                            {zcInfo.trueName}
                        </Text>
                    </View>
                    {
                        zcInfo.phoneNumber ? <Phone telPhone={zcInfo.phoneNumber}/>
                            : null
                    }

                </View>

                <View style={[style.row, style.contentBox]}>
                    <Text style={style.label}>到访客户：</Text>
                    <Text style={style.normalText}>{(data.customerInfo || {}).customerName}</Text>
                </View>

                <View style={[style.row, style.contentBox, {alignItems: 'flex-start'}]}>
                    <Text style={[style.label]}>联系电话：</Text>
                    <View>
                        {
                            ((data.customerInfo || {}).customerPhone || []).map((item, key) => (
                                <Text style={[style.normalText]}>{item}</Text>
                            ))
                        }
                    </View>
                </View>

                <View style={[style.row, style.contentBox]}>
                    <Text style={style.label}>实际到访时间：</Text>
                    <Text style={style.normalText}>{data.visitTime && moment(data.visitTime).format('YYYY-MM-DD HH:mm')}</Text>
                </View>

                <View style={[style.row, {flexWrap: 'wrap', flex: 1}]}>

                    {
                        fileList.map((item:any, key:any) => {
                            return (
                                <TouchableOpacity
                                    key={key}
                                    activeOpacity={0.9}
                                    onPress={() => gotoPreview(key, fileList)}
                                >
                                    <Image style={[style.img, {marginRight: ((key + 1) % 3) ? scaleSize(16) : 0}]} source={{uri: item.fileUrl}}/>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}
