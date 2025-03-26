const initialState = {
    orders: localStorage.getItem("orders") || [],
    loading: false,
    success: false,
    latestOrder: [],
    error: null,
};

export const ordersReducer = (state = initialState, action) => {
    let updatedOrders;

    switch (action.type) {
        case "FETCH_ORDERS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_ORDERS_SUCCESS":
            updatedOrders = action.payload;
            localStorage.setItem("orders", JSON.stringify(updatedOrders));
            return { ...state, loading: false, orders: updatedOrders };
        case "FETCH_ORDERS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "FETCH_ADD_ORDER_REQUEST":
            return { ...state, loading: true, error: null, success: false };
        case "FETCH_ADD_ORDER_SUCCESS":
            updatedOrders = [...state.orders, action.payload.data];
            localStorage.setItem("orders", JSON.stringify(updatedOrders));
            return { ...state, loading: false, orders: updatedOrders, success: true, latestOrder: action.payload.data };
        case "FETCH_ADD_ORDER_FAILURE":
            return { ...state, loading: false, error: action.payload, success: false };
        case "RESET_ORDER_STATE":
            return { ...state, success: false };
        default:
            return state;
    }
};
