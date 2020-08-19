import { SELECTED_DATE, GET_ORDER_LIST, NEXT_ORDER_LIST, CLEAR_ORDER_LIST } from "../actions/order_list_action";

const ORDER_LIST_STATE = {
    dateSelectList: [
        {name: '今天', value: 0},
        {name: '昨天', value: 1},
        {name: '最近7天', value: 7},
        {name: '最近30天', value: 30}
    ],
    selectedDate: {name: '今天', value: 0},
    page: 1,
    orderListData: []
};

export default function OrderListReducer(state = ORDER_LIST_STATE, action) {
    const payload = action.payload
	switch (action.type) {
		case SELECTED_DATE:
			return {
                ...state,
                ...payload
            }
        case GET_ORDER_LIST: 
            return {
                ...state,
                orderListData: payload.orderListData,
                page: 1
            }
        case NEXT_ORDER_LIST: 
            return {
                ...state,
                orderListData: state.orderListData.concat(payload.orderListData),
                page: payload.page
            }
        case CLEAR_ORDER_LIST: 
            return {
                ...state,
                orderListData: payload.orderListData
            }
		default:
			return state;
	}
};