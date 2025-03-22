export const fetchCartProductsRequest = () => ({
    type: "FETCH_CART_PRODUCTS_REQUEST",
});

export const fetchCartProductsSuccess = (action) => ({
    type: "FETCH_CART_PRODUCTS_SUCCESS",
    payload: action
});

export const fetchCartProductsFailure = (error) => ({
    type: "FETCH_CART_PRODUCTS_FAILURE",
    payload: error
});


export const fetchAddCartRequest = (action) => ({
    type: "FETCH_ADD_CART_REQUEST",
    payload: action
});


export const fetchAddCartRequestSuccess = (action) => ({
    type: "FETCH_ADD_CART_SUCCESS",
    payload: action
});


export const fetchAddCartRequestFailure = (error) => ({
    type: "FETCH_ADD_CARTS_FAILURE",
    payload: error
});


export const fetchRemoveCartRequest = (action) => ({
    type: "FETCH_REMOVE_CART_REQUEST",
    payload: action
});


export const fetchRemoveCartRequestSuccess = (action) => ({
    type: "FETCH_REMOVE_CART_SUCCESS",
    payload: action
});


export const fetchRemoveCartRequestFailure = (error) => ({
    type: "FETCH_REMOVE_CARTS_FAILURE",
    payload: error
});

