import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCartProductsSuccess, fetchCartProductsFailure, fetchAddCartRequestSuccess,
  fetchAddCartRequestFailure, fetchRemoveCartRequestSuccess, fetchRemoveCartRequestFailure
} from "../actions/cartActions";

const fetchCartProductsApi = async () => {
  const response = await axios.get("http://localhost:4000/api/cart"); // Replace with your API
  return response.data;
};

function* fetchCartProducts() {
  try {
    const data = yield call(fetchCartProductsApi);
    yield put(fetchCartProductsSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchCartProductsFailure(error.message || "Failed to load cart"));
  }
}


const fetchAddCartProductsApi = async (product) => {
  const response = await axios.post("http://localhost:4000/api/cart/addOrUpdate", product.payload); // Replace with your API
  return response.data;
};


function* fetchAddCartProducts(product) {
  try {
    const data = yield call(fetchAddCartProductsApi, product);
    yield put(fetchAddCartRequestSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchAddCartRequestFailure(error.message || "Failed to load cart"));
  }
}

const fetchRemoveCartProductsApi = async (id) => {
  const response = await axios.delete("http://localhost:4000/api/cart/delete/" + id.payload); // Replace with your API
  return response.data;
};

function* fetchRemoveCartProducts(id) {
  try {
    const data = yield call(fetchRemoveCartProductsApi, id);
    yield put(fetchRemoveCartRequestSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchRemoveCartRequestFailure(error.message || "Failed to load cart"));
  }
}

export function* watchCartProducts() {
  yield takeLatest("FETCH_CART_PRODUCTS_REQUEST", fetchCartProducts);
  yield takeLatest("FETCH_ADD_CART_REQUEST", fetchAddCartProducts);
  yield takeLatest("FETCH_REMOVE_CART_REQUEST", fetchRemoveCartProducts);
}
