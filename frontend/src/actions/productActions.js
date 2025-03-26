export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST"
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS"
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE"
export const FILTER_PRODUCTS = "FILTER_PRODUCTS"
export const FETCH_PRODUCT_DETAILS_REQUEST = "FETCH_PRODUCT_DETAILS_REQUEST"
export const FETCH_PRODUCT_DETAILS_SUCCESS = "FETCH_PRODUCT_DETAILS_SUCCESS"
export const FETCH_PRODUCT_DETAILS_FAILURE = "FETCH_PRODUCT_DETAILS_FAILURE"


export const fetchProductsRequest = (sort = "price", order = "asc") => ({
    type: FETCH_PRODUCTS_REQUEST,
    payload: { sort, order },
});

export const fetchProductsSuccess = (action) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: action
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
});

export const filterProducts = (query) => ({
    type: FILTER_PRODUCTS,
    payload: query.toLowerCase(), // Convert to lowercase for case-insensitive search
});

export const fetchProductDetailsRequest = (action) => ({
    type: FETCH_PRODUCT_DETAILS_REQUEST,
    payload: action
});


export const fetchProductDetailsSuccess = (action) => ({
    type: FETCH_PRODUCT_DETAILS_SUCCESS,
    payload: action
});


export const fetchProductDetailsFailure = (error) => ({
    type: FETCH_PRODUCT_DETAILS_FAILURE,
    payload: error
});


