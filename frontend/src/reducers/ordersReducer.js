const initialState = {
    orders: localStorage.getItem("orders") || [],
    loading: false,
    error: null,
};

export const ordersReducer = (state = initialState, action) => {
    let updatedOrders;

    switch (action.type) {
        case "FETCH_ORDERS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_ORDERS_SUCCESS":
            updatedOrders = action.payload;
            localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Save to localStorage

            return { ...state, loading: false, orders: updatedOrders };
        case "FETCH_ORDERS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "FETCH_ADD_ORDER_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_ADD_ORDER_SUCCESS":
            updatedOrders = [...state.orders, action.payload.data];
            localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Save to localStorage

            return { ...state, loading: false, orders: updatedOrders };
        case "FETCH_ADD_ORDER_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
