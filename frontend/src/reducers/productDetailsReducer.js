import {
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
} from "../actions/productActions";

const initialState = {
  selectedProduct: [],
  loading: false,
  error: null,
};

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, selectedProduct: { ...action.payload } };
    case FETCH_PRODUCT_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};