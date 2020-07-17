微信推广组件

【组件】
index           ui组件，其中引入weChatButton
weChatButton    业务组件，微信推广按钮

【参考例子】
index           房源-房源列表-每个房源item下最后一排
weChatButton    同上，右边独立按钮

【参数】
weChatButton
    onPress?: (event: GestureResponderEvent) => void        可不传，自带微信推广逻辑
    projectInfo: any                                        楼盘信息
    style?: StyleProp<ViewStyle>                            button样式
    textStyle?: StyleProp<TextStyle>                        文字样式（微信推广）
    imageStyle?: StyleProp<ImageStyle>                      图片样式（微信icon）

index
    style?: StyleProp<ViewStyle>                            wrap样式
    number?: Number                                         推广人数
    avatorSourceList?: string[]                             头像，[].length>=2时生效
    projectInfo: any                                        楼盘信息（用于下传button）
    pageFrom:string                                         由xx页面跳转而来(埋点用)