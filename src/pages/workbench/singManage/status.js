


/**
 * 不同状态下的图标和
 */
// 楼盘状态
const status = [
    {state:2,stateBg:'#FFDDD8',stateColor:'#FE5139',stateText:'待售'},
    {state:3,stateBg:'#F8F8F8',stateColor:'#CBCBCB',stateText:'售罄'},
    {state:4,stateBg:'#FFE3BD',stateColor:'#E58400',stateText:'停售'},
    {state:1,stateBg:'#E4F1FF',stateColor:'#49A1FF',stateText:'在售'}
]

export const setStatus = (state) =>{
    return status.find(item => item.state === Number(state)) || {}
}

export default status