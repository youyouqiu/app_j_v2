import {ImageSourcePropType} from "react-native";

/**
 * @author: zxs
 * @date: 2020/5/13
 */
export interface IProjectManagerPropsType {
    buildingTreeId:string
}

export interface IProjectManagerStateType {
    userList:Array<IUserInfo>,
    showMore:boolean,
}

export interface IUserInfo {
    id:string,
    avatar: string,
    phone: string,
    trueName: string,
    viewCount: number,
}
