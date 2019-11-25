/**
 * Modal
 * created by chenfengxia 2019-08-30
 *  */
import React,{Component} from 'react';
import {Text, View, TouchableOpacity,Modal,Image} from 'react-native';
import {scaleSize} from '../../utils/screenUtil'
import {modalStyles} from './style'

export default class BasicModal extends Component {
    constructor(){
        super()
        this.state = {
            multiRes:[], // 多选选中的数据
            multiData:[], // 多选的数据源
            multiSelectCode:[],// 多选选中的code
        }
    }
    componentDidMount(){
        let {data,type,selectCode} = this.props
        let multiData = data
        if((data || []).length && type === 'multiSelect'){
            this.initMulti(selectCode,multiData)
        }
    }
    componentWillReceiveProps(newProps){
        let {data,type,selectCode} = newProps
        let multiData = data
        if((data || []).length && type === 'multiSelect'){
            this.initMulti(selectCode,multiData)
        }
    }

    // 单选
    handleSelectOne = (item) =>{
        let {onChange,onClose} = this.props
        onClose()
        onChange && onChange(item)
        onClose() 
    }

    // 多选
    handleMulti = (item) =>{
        let {multiData} = this.state
        let res = []
        let code = []
        multiData = multiData.map((v)=>{
            if(v.code === item.code){
                v.isSelet = !item.isSelet
            }
            if(v.isSelet){
                res.push(v)
                code.push(v.code)
            }
            return v
        })

        this.setState({multiData,multiRes:res,multiSelectCode:code})
    }
    // 多选初始化
    initMulti = (selectCode,multiData) =>{
        let multiRes = [],
            multiSelectCode = []
        if((selectCode || []).length){
            multiData = multiData.map((item)=>{
                if(selectCode.includes(item.code)){
                    item.isSelet = true
                    multiRes.push(item)
                    multiSelectCode.push(item.code)
                } else {
                    item.isSelet = false
                }
                return item
            })
        } else {
            multiData = multiData.map((item)=>{
                item.isSelet = false
                return item
            })

        }
        this.setState({multiData,multiRes,multiSelectCode})
    }

    // 多选确定
    handleMultiOk = () =>{
        let {multiRes,multiSelectCode} = this.state
        let {onOk} = this.props
        onOk && onOk(multiRes,multiSelectCode)
    }

    _renderContent = () => { // 渲染内容页面
        const {children} = this.props
        return (
            <View style={{ flex: 1 }}>
                {children}
            </View>
        )

    }

    basicContent = () =>{
        let {title,onClose,width,height,footerType = 'two',
            cancelText,confirmText,onOk, contentStyle = {},cancelBtnStyle = {}, closable, onClosable
        } = this.props

        return(
            <View style={modalStyles.modalBg}>
                <View style={[modalStyles.modalContent,{height:scaleSize(height),width:scaleSize(width)}]}>
                    {
                        title?
                            <View style={[modalStyles.row,modalStyles.titleBox,{paddingTop:closable?scaleSize(20):scaleSize(0)}]}>
                                <Text style={modalStyles.title} numberOfLines={2}>{title}</Text>
                            </View>
                            :null
                    }
                    {
                        closable
                            ?
                            <TouchableOpacity activeOpacity={1} style={modalStyles.closable} onPress={onClosable || onClose}>
                                <Image style={modalStyles.closeImage} source={require('../../images/icons/close.png')}/>
                            </TouchableOpacity>
                            :
                            null
                    }
                    <View style={[{
                        paddingLeft:scaleSize(32),
                        paddingRight:scaleSize(32),
                        height:scaleSize(title?height-200:height-140),
                        flex: 1},
                    contentStyle]}
                    >
                        {this._renderContent()}
                    </View>
                    <View  style={modalStyles.footerWrap}>
                        {
                            footerType === 'one'?
                                <TouchableOpacity style={[modalStyles.footerOne,cancelBtnStyle]} activeOpacity={0.8} onPress={onClose}>
                                    <Text style={[modalStyles.closeText,cancelBtnStyle]}>{cancelText || '关闭'}</Text>
                                </TouchableOpacity>
                                :footerType === 'two'?
                                    <View style={modalStyles.row}>
                                        <TouchableOpacity style={modalStyles.footerCancel} activeOpacity={0.8} onPress={onClose}>
                                            <Text style={modalStyles.cancelText}>{cancelText || '取消'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[modalStyles.footerCancel,modalStyles.confirmBtn]}
                                            activeOpacity={0.8}
                                            onPress={onOk}
                                        >
                                            <Text style={modalStyles.closeText}>{confirmText || '确认'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :null
                        }
                    </View>


                </View>
            </View>
        )
    }

    confirmContent = () =>{
        let {title,onClose,width,height,cancelText,confirmText,onOk,contentStyle,closable,onClosable} = this.props
        return(
            <View style={modalStyles.modalBg}>
                <View
                    style={[modalStyles.modalContent,{
                        height:scaleSize(height),
                        width:scaleSize(width),
                        borderRadius:scaleSize(8)}]}
                >
                    {
                        title?
                            <View style={[modalStyles.row,modalStyles.titleBox,{paddingTop:closable?scaleSize(20):scaleSize(0)}]}>
                                <Text style={modalStyles.title} numberOfLines={2}>{title}</Text>
                            </View>
                            :null
                    }
                    {
                        closable
                            ?
                            <TouchableOpacity style={modalStyles.closable} onPress={onClosable || onClose}>
                                <Image style={modalStyles.closeImage} source={require('../../images/icons/close.png')}/>
                            </TouchableOpacity>
                            :
                            null
                    }
                    <View style={[{
                        paddingLeft:scaleSize(32),
                        paddingRight:scaleSize(32),
                        height:scaleSize(title?height-160:height-100),
                        flex: 1},contentStyle]}
                    >
                        {this._renderContent()}
                    </View>

                    <View style={[modalStyles.footerWrap,modalStyles.row,modalStyles.confirmFooter]}>
                        <TouchableOpacity style={modalStyles.confirmCancel} activeOpacity={0.8} onPress={onClose}>
                            <Text style={{color:'#4D4D4D',fontSize:scaleSize(28)}}>{cancelText || '取消'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[modalStyles.confirmCancel,{borderLeftWidth:scaleSize(1)}]}
                            activeOpacity={0.8}
                            onPress={onOk}
                        >
                            <Text style={{color:'#4B6AC5',fontSize:scaleSize(28)}}>{confirmText || '确认'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    selectContent = () =>{
        let {onClose,data,selectCode,contentStyle, title} = this.props
        let height = (data || []).length *109 + 132
        data = data.map((item)=>{
            if(selectCode === item.code){
                item.isSelet = true
            } else {
                item.isSelet = false
            }
            return item
        })
        return(
            <View style={[modalStyles.modalBg, {
                justifyContent: 'flex-end'
            }]}>
                <View style={[modalStyles.selectWrap,{height:scaleSize(height)},contentStyle]}>
                    {
                        title 
                        ?
                        (typeof title === 'string' 
                        ?
                        <View
                            style={[modalStyles.selectOne, modalStyles.bottomLine]}
                            activeOpacity={0.8}
                        >
                            <Text style={modalStyles.selectOneText}>{title}</Text>
                        </View>
                        :
                        <View
                            style={[modalStyles.selectOne, modalStyles.bottomLine]}
                            activeOpacity={0.8}
                        >
                            {title}
                        </View>
                        )
                        :
                        null

                    }
                    {
                        data && data.map((item,key)=>{
                            return(
                                <TouchableOpacity
                                    key={key}
                                    style={[modalStyles.selectOne,item.isSelet?modalStyles.selectedOne:'']}
                                    activeOpacity={0.8}
                                    onPress={()=>this.handleSelectOne(item)}
                                >
                                    <Text style={[modalStyles.selectOneText,item.isSelet?modalStyles.selectedOneText:'']}>{item.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <View style={{backgroundColor:'#F8F8F8',height:scaleSize(32)}}/>
                    <TouchableOpacity
                        style={modalStyles.selectFooter}
                        activeOpacity={0.8}
                        onPress={onClose}
                    >
                        <Text style={{color:'#000000',fontSize:scaleSize(28)}}>取消</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    multiSelectContent = () =>{
        let {onClose,contentStyle} = this.props
        let {multiData} = this.state
        let height = Math.ceil((multiData || []).length/4) *84 + 215
        return(
            <View style={[modalStyles.modalBg, {
                justifyContent: 'flex-end'
            }]}>
                <View style={[modalStyles.selectWrap,{height:scaleSize(height),justifyContent: 'flex-end'},contentStyle]}>
                    <View style={[modalStyles.row,{flexWrap:'wrap',marginBottom:scaleSize(73)}]}>
                        {
                            multiData.map((item,key)=>{
                                return(
                                    <TouchableOpacity
                                        key={key}
                                        style={[modalStyles.multiBox,item.isSelet?modalStyles.multiSelected:'']}
                                        activeOpacity={0.8}
                                        onPress={()=>this.handleMulti(item)}
                                    >
                                        <Text style={{fontSize:scaleSize(24),color:item.isSelet?'#1F3070':'#868686'}}>{item.label}</Text>
                                        <View style={modalStyles.multiIconBox}>
                                            {
                                                item.isSelet?
                                                    <Image style={modalStyles.multiIcon} source={require('../../images/icons/checked.png')}/>
                                                    :null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={{backgroundColor:'#F8F8F8',height:scaleSize(32)}}/>
                    <View style={[modalStyles.row]}>
                        <TouchableOpacity
                            style={[modalStyles.selectFooter,{width:'50%'}]}
                            activeOpacity={0.8}
                            onPress={onClose}
                        >
                            <Text style={{color:'#000000',fontSize:scaleSize(28)}}>取消</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[modalStyles.selectFooter,{width:'50%',backgroundColor:'#1F3070'}]}
                            activeOpacity={0.8}
                            onPress={this.handleMultiOk}
                        >
                            <Text style={{color:'#FFFFFF',fontSize:scaleSize(28)}}>确定</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }


    render(){
        let {type = 'basic',visible,onClose,onRequestClose,transparent} = this.props;
        let renderContent = null;
        if(type === 'fullScreen'){
            renderContent =this._renderContent();
        }else if(type === 'basic'){
            renderContent = this.basicContent()
        }else if(type === 'conform'){
            renderContent = this.confirmContent()
        }else if(type === 'select'){
            renderContent = this.selectContent()
        }else if(type === 'multiSelect'){
            renderContent = this.multiSelectContent()
        }

        return(
            <Modal
                visible={Boolean(visible)}
                transparent={transparent || true}
                onRequestClose={onRequestClose? onRequestClose: onClose}
                onClose={onClose}
            >
                {renderContent}
            </Modal>
        )
    }
}
