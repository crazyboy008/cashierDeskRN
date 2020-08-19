import { combineReducers } from 'redux'
import userReducer from './user_reducer'
import settingReducer from './setting_reducer'
import orderListReducer from './order_list_reducer'
import totenReducer from './toten_reducer'

export default combineReducers({
  user: userReducer,
  settings: settingReducer,
  orderList: orderListReducer,
  toten: totenReducer
})
