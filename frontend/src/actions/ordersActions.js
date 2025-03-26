export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST"
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS"
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE"
export const FETCH_ADD_ORDER_REQUEST = "FETCH_ADD_ORDER_REQUEST"
export const FETCH_ADD_ORDER_SUCCESS = "FETCH_ADD_ORDER_SUCCESS"
export const FETCH_ADD_ORDER_FAILURE = "FETCH_ADD_ORDER_FAILURE"
export const RESET_ORDER_STATE = "RESET_ORDER_STATE"

export const fetchOrdersRequest = () => ({
    type: FETCH_ORDERS_REQUEST,
});

export const fetchOrdersSuccess = (action) => ({
    type: FETCH_ORDERS_SUCCESS,
    payload: action
});

export const fetchOrdersFailure = (error) => ({
    type: FETCH_ORDERS_FAILURE,
    payload: error
});


export const fetchAddOrderRequest = (action) => ({
    type: FETCH_ADD_ORDER_REQUEST,
    payload: action
});


export const fetchAddOrderSuccess = (action) => ({
    type: FETCH_ADD_ORDER_SUCCESS,
    payload: action
});


export const fetchAddOrderFailure = (error) => ({
    type: FETCH_ADD_ORDER_FAILURE,
    payload: error
});

export const resetOrderState = () => ({
    type: RESET_ORDER_STATE,
});


