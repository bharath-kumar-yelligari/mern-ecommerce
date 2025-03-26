import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchAddressSuccess, fetchAddressFailure, fetchAddAddressSuccess, fetchAddAddressFailure,
  fetchUpdateAddressSuccess, fetchUpdateAddressFailure, fetchDeleteAddressSuccess, fetchDeleteAddressFailure,
  FETCH_ADDRESS_REQUEST,
  FETCH_ADD_ADDRESS_REQUEST,
  FETCH_DELETE_ADDRESS_REQUEST,
  FETCH_UPDATE_ADDRESS_REQUEST
} from "../actions/addressListActions";
import api from "../auth/axiosInstance";

const fetchAddressApi = async () => {
  const response = await api.get(`/address`);
  return response.data;
};

const fetchAddAddressApi = async (address) => {
  const response = await api.post(`/address`, address.payload);
  return response.data;
};

const fetchUpdateAddressApi = async (address) => {
  const response = await api.put(`/address/update/` + address.payload.id, address.payload);
  return response.data;
};

const fetchDeleteAddressApi = async (address) => {
  const response = await api.delete(`/address/delete/` + address.payload);
  return response.data;
};

function* fetchAddress() {
  try {
    const data = yield call(fetchAddressApi);
    yield put(fetchAddressSuccess(data));
  } catch (error) {
    yield put(fetchAddressFailure(error.message || "Failed to load Address"));
  }
}

function* fetchAddAddress(address) {
  try {
    const data = yield call(fetchAddAddressApi, address);
    yield put(fetchAddAddressSuccess(data));
  } catch (error) {
    yield put(fetchAddAddressFailure(error.message || "Failed to add Address"));
  }
}

function* fetchUpdateAddress(address) {
  try {
    const data = yield call(fetchUpdateAddressApi, address);
    yield put(fetchUpdateAddressSuccess(data));
  } catch (error) {
    yield put(fetchUpdateAddressFailure(error.message || "Failed to update Address"));
  }
}

function* fetchDeleteAddress(address) {
  try {
    const data = yield call(fetchDeleteAddressApi, address);
    yield put(fetchDeleteAddressSuccess(data));
  } catch (error) {
    yield put(fetchDeleteAddressFailure(error.message || "Failed to delete Address"));
  }
}

export function* watchAddress() {
  yield takeLatest(FETCH_ADDRESS_REQUEST, fetchAddress);
  yield takeLatest(FETCH_ADD_ADDRESS_REQUEST, fetchAddAddress);
  yield takeLatest(FETCH_UPDATE_ADDRESS_REQUEST, fetchUpdateAddress);
  yield takeLatest(FETCH_DELETE_ADDRESS_REQUEST, fetchDeleteAddress);
}
