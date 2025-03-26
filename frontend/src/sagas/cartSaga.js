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
import api from "../auth/axiosInstance";

const fetchCartProductsApi = async () => {
  const response = await api.get(`/cart`); // Replace with your API
  return response.data;
};

const fetchAddCartProductsApi = async (product) => {
  const response = await api.post(`/cart/addOrUpdate`, product.payload); // Replace with your API
  return response.data;
};

const fetchRemoveCartProductsApi = async (id) => {
  const response = await api.delete(`/cart/delete/` + id.payload); // Replace with your API
  return response.data;
};

const fetchClearCartApi = async () => {
  const response = await api.delete(`/cart/clear`); // Replace with your API
  return response.data;
}

function* fetchCartProducts() {
  try {
    const data = yield call(fetchCartProductsApi);
    yield put(fetchCartProductsSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchCartProductsFailure(error.message || "Failed to load cart"));
  }
}

function* fetchAddCartProducts(product) {
  try {
    const data = yield call(fetchAddCartProductsApi, product);
    yield put(fetchAddCartRequestSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchAddCartRequestFailure(error.message || "Failed to load cart"));
  }
}

function* fetchRemoveCartProducts(id) {
  try {
    const data = yield call(fetchRemoveCartProductsApi, id);
    yield put(fetchRemoveCartRequestSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchRemoveCartRequestFailure(error.message || "Failed to load cart"));
  }
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
