/**
 * @author: zxs
 * @date: 2020/6/12
 */
import {Model} from "dva";
import {BusinessCardModalStateType, SelectedBuildingsType} from "./types";
import businessCardService from "@/services/businessCardService/businessCardService";
import {OriginalDataType} from "@/pages/personal/businessCard/editComponent/types";
import projectService from "@/services/projectService";

const defaultState: BusinessCardModalStateType = {
  weChatCodeIcon: '',//微信头像
  describe: '',
  labels: [],
  buildingList: [],
  shopList: [],
  editDetail: {} as OriginalDataType,
  selectedBuildings: {} as SelectedBuildingsType
};

const BusinessCardModal: Model = {
  namespace: "businessCard",
  state: defaultState,
  effects: {
    * getWeChatCodeAsync(_, {call, put}) {
      const res = yield call(businessCardService.getWeChatCode);
      yield put({type: 'saveWeChatCode', payload: res.extension})
    },
    * getUserDescribeAsync(_, {call, put}) {
      console.log('getUserDescribeAsync11111');
      const res = yield call(businessCardService.getUserDescribe);
      console.log('getUserDescribeAsync22222',res);
      yield put({type: 'saveUserDescribe', payload: res.extension})
    },
    * getSelectedBuildingAsync(_, {call, put}) {
      const res = yield call(businessCardService.getSelectedBuilding);
      yield put({type: 'saveSelectedBuilding', payload: res.extension})
    },
    * getSelectedShopAsync(_, {call, put}) {
      const res = yield call(businessCardService.getSelectedShop);
      yield put({type: 'saveSelectedShop', payload: res.extension})
    },
    * getEditDetailAsync({payload}, {call, put}) {
      const res = yield call(businessCardService.getEditDetail, payload);
      yield put({type: 'saveEditDetail', payload: res.extension});
    },
    * businessCardSelectedBuildings({payload}, {call, put}) {
      const res = yield call(projectService.getBusinessCardInfo, {buildingTreeId:payload});
      console.log('businessCardSelectedBuildings',res);
      yield put({type: 'saveBusinessCardSelectedBuildings', payload: res.extension})
    }
  },
  reducers: {
    saveWeChatCode(state, {payload}) {
      return {
        ...state,
        weChatCodeIcon: payload
      }
    },
    saveUserDescribe(state, {payload}) {
      return {
        ...state,
        describe: payload.describe,
        labels: payload.labels
      }
    },
    saveSelectedBuilding(state, {payload}) {
      return {
        ...state,
        buildingList: payload || []
      }
    },
    saveSelectedShop(state, {payload}) {
      return {
        ...state,
        shopList: payload || []
      }
    },
    saveEditDetail(state, {payload}) {
      return {
        ...state,
        editDetail: payload || {}
      }
    },
    saveBusinessCardSelectedBuildings(state, {payload}) {
      return {
        ...state,
        selectedBuildings: payload
      }
    }
  },
};

export default BusinessCardModal
