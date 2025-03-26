import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCartProductsSuccess, fetchCartProductsFailure, fetchAddCartRequestSuccess,
  fetchAddCartRequestFailure, fetchRemoveCartRequestSuccess, fetchRemoveCartRequestFailure,
  fetchClearCartRequestSuccess, fetchClearCartRequestFailure,
  FETCH_CLEAR_CART_REQUEST,
  FETCH_REMOVE_CART_REQUEST,
  FETCH_ADD_CART_REQUEST,
  FETCH_CART_PRODUCTS_REQUEST
} from "../actions/cartActions";

const fetchCartProductsApi = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart`); // Replace with your API
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
  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/addOrUpdate`, product.payload); // Replace with your API
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
  const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/cart/delete/` + id.payload); // Replace with your API
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

const fetchClearCartApi = async () => {
  const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/cart/clear`); // Replace with your API
  return response.data;
}

function* fetchClearCart() {
  try {
    const data = yield call(fetchClearCartApi);
    yield put(fetchClearCartRequestSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchClearCartRequestFailure(error.message || "Failed to load cart"));
  }
}


export function* watchCartProducts() {
  yield takeLatest(FETCH_CART_PRODUCTS_REQUEST, fetchCartProducts);
  yield takeLatest(FETCH_ADD_CART_REQUEST, fetchAddCartProducts);
  yield takeLatest(FETCH_REMOVE_CART_REQUEST, fetchRemoveCartProducts);
  yield takeLatest(FETCH_CLEAR_CART_REQUEST, fetchClearCart);

}
