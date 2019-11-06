import { Model } from 'dva'
import BuryingPoint from '../utils/BuryPoint'

export default <Model>{
  namespace: 'point',
  state: {
    buryingPoint: BuryingPoint
  }
}
