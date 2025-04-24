import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FILTER_PRODUCTS,
} from "../actions/productActions";

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload, filteredProducts: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FILTER_PRODUCTS:
      const query = action.payload.toLowerCase();
      return {
        ...state,
        filteredProducts: state.products.filter((product) =>
          product.title.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query)
        ),
      };
    default:
      return state;
  }
};