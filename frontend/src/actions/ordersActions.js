export const fetchOrdersRequest = () => ({
    type: "FETCH_ORDERS_REQUEST",
});

export const fetchOrdersSuccess = (action) => ({
    type: "FETCH_ORDERS_SUCCESS",
    payload: action
});

export const fetchOrdersFailure = (error) => ({
    type: "FETCH_ORDERS_FAILURE",
    payload: error
});


export const fetchAddOrderRequest = (action) => ({
    type: "FETCH_ADD_ORDER_REQUEST",
    payload: action
});


export const fetchAddOrderSuccess = (action) => ({
    type: "FETCH_ADD_ORDER_SUCCESS",
    payload: action
});


export const fetchAddOrderFailure = (error) => ({
    type: "FETCH_ADD_ORDER_FAILURE",
    payload: error
});


