import {UserModelState} from './user'
import {IPointState} from './point'
import {BusinessCardModalStateType} from "@/models/businessCard/types";

export { UserModelState };
export { IPointState };

export interface ConnectState {
  user: UserModelState,
  point: IPointState,
  config: any,
  businessCard:BusinessCardModalStateType
}

