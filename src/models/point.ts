import { Model } from 'dva'
import instance, {BuryingPoint} from '../utils/BuryPoint'

export interface IPointState {
  buryingPoint: BuryingPoint
}

export interface IPointModel extends Model {
  namespace: 'point'
  state: IPointState
}

export default <IPointModel>{
  namespace: 'point',
  state: {
    buryingPoint: instance
  }
}
