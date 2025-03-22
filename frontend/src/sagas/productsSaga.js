import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchProductsSuccess, fetchProductsFailure, fetchProductDetailsSuccess, fetchProductDetailsFailure } from "../actions/productActions";

const fetchProductsApi = async () => {
  const response = await axios.get("http://localhost:4000/api/products"); // Replace with your API
  return response.data;
};

const fetchProductDetailsApi = async (id) => {
  const response = await axios.get("http://localhost:4000/api/products/" + id.payload); // Replace with your API
  return response.data;
};


function* fetchProducts() {
  try {
    const data = yield call(fetchProductsApi);
    yield put(fetchProductsSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchProductsFailure(error.message || "Failed to load products"));
  }
}


function* fetchProductDetails(id) {
  try {
    const data = yield call(fetchProductDetailsApi, id);
    yield put(fetchProductDetailsSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchProductDetailsFailure(error.message || "Failed to load products"));
  }
}

export function* watchFetchProducts() {
  yield takeLatest("FETCH_PRODUCTS_REQUEST", fetchProducts);
  yield takeLatest("FETCH_PRODUCT_DETAILS_REQUEST", fetchProductDetails);
}
