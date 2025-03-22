export const fetchProductsRequest = () => ({
    type: "FETCH_PRODUCTS_REQUEST",
});

export const fetchProductsSuccess = (action) => ({
    type: "FETCH_PRODUCTS_SUCCESS",
    payload: action
});

export const fetchProductsFailure = (error) => ({
    type: "FETCH_PRODUCTS_FAILURE",
    payload: error
});

export const filterProducts = (query) => ({
    type: "FILTER_PRODUCTS",
    payload: query.toLowerCase(), // Convert to lowercase for case-insensitive search
});

export const fetchProductDetailsRequest = (action) => ({
    type: "FETCH_PRODUCT_DETAILS_REQUEST",
    payload: action
});


export const fetchProductDetailsSuccess = (action) => ({
    type: "FETCH_PRODUCT_DETAILS_SUCCESS",
    payload: action
});


export const fetchProductDetailsFailure = (error) => ({
    type: "FETCH_PRODUCT_DETAILS_FAILURE",
    payload: error
});


