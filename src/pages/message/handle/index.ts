/**
 * Created by Kary on 2020/05/09 15:16.
 */

export const customerDynamics = function (simpleContent: any) {
    try {
        let item = (typeof simpleContent === 'string') ? JSON.parse(simpleContent) : simpleContent;
        let str = '';
        if (item.trackType == 1) {
            str = `${item.userName}第${item.viewCount}次浏览了${item.buildingName}${item.shopName ? `的${item.shopName}` : ''}`
        } else if (item.trackType == 2) {
            str = `${item.userName}关注了${item.buildingName}${item.shopName ? `的${item.shopName}` : ''}`
        } else if (item.trackType == 3) {
            str = `${item.userName}取消关注了${item.buildingName}${item.shopName ? `的${item.shopName}` : ''}`
        } else if (item.trackType == 4) {
            str = `${item.userName}搜索了${item.word}`
        } else if (item.trackType == 5 && item.dataType == 1) {
            str = `${item.userName}筛选了${item.wordType == 1 ? '价格' : item.wordType == 2 ? '面积' : ''}${item.word}的楼盘`
        } else if (item.trackType == 5 && item.dataType == 2) {
            str = `${item.userName}在${item.buildingName}筛选了${item.wordType == 1 ? '价格' : item.wordType == 2 ? '面积' : ''}${item.word}的商铺`
        }
        return str;
    } catch (e) {

    }
};