import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchOrdersSuccess, fetchOrdersFailure, fetchAddOrderSuccess, fetchAddOrderFailure, FETCH_ADD_ORDER_REQUEST, FETCH_ORDERS_REQUEST } from "../actions/ordersActions";
import { fetchClearCartRequest } from "../actions/cartActions";
import api from "../auth/axiosInstance";

const fetchOrdersApi = async () => {
  const response = await api.get(`/orders`); // Replace with your API
  return response.data;
};

const fetchAddOrdersApi = async (payload) => {
  const response = await api.post(`/orders`, payload); // Replace with your API
  return response.data;
};

function* fetchOrders() {
  try {
    const data = yield call(fetchOrdersApi);
    yield put(fetchOrdersSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchOrdersFailure(error.message || "Failed to load orders"));
  }
}

function* fetchAddOrders(payload) {
  try {
    const data = yield call(fetchAddOrdersApi, payload);
    yield put(fetchAddOrderSuccess(data)); // Store products in Redux
    yield put(fetchClearCartRequest());
  } catch (error) {
    yield put(fetchAddOrderFailure(error.message || "Failed to load orders"));
  }
}

export function* watchOrders() {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrders);
  yield takeLatest(FETCH_ADD_ORDER_REQUEST, fetchAddOrders);

}
