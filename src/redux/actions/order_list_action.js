import { listOrder } from '@/utils/api'

export const SELECTED_DATE = "SELECTED_DATE"
export const GET_ORDER_LIST = "GET_ORDER_LIST"
export const NEXT_ORDER_LIST = "NEXT_ORDER_LIST"
export const CLEAR_ORDER_LIST = "CLEAR_ORDER_LIST"

// 更改选中日期
export const updateSelectDate = (params) => {
    return async dispatch => {
        dispatch({
            type: SELECTED_DATE,
            payload: params   
        })
    }
}

// 获取订单列表数据
export const getOrderListData = params => {
    return async dispatch => {
        const res = await listOrder(params)
        console.log(res)
        dispatch({
            type: GET_ORDER_LIST,
            payload: {orderListData: res.resultList, page: 1}
        })
    }
}

// 获取下一页订单列表数据
export const getNextOrderListData = params => {
    return async dispatch => {
        const res = await listOrder(params)
        dispatch({
            type: NEXT_ORDER_LIST,
            payload: {orderListData: res.resultList, page: params.page}
        })
    }
}

// 获取订单列表数据
export const clearOrderListData = params => {
    return async dispatch => {
        dispatch({
            type: CLEAR_ORDER_LIST,
            payload: {orderListData: []}
        })
    }
}