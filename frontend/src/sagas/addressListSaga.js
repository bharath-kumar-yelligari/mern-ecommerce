import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchAddressSuccess, fetchAddressFailure, fetchAddAddressSuccess ,fetchAddAddressFailure,
  fetchUpdateAddressSuccess, fetchUpdateAddressFailure, fetchDeleteAddressSuccess, fetchDeleteAddressFailure
} from "../actions/addressListActions";

const fetchAddressApi = async () => {
  const response = await axios.get("http://localhost:4000/api/address"); // Replace with your API
  return response.data;
};

const fetchAddAddressApi = async (address) => {
  const response = await axios.post("http://localhost:4000/api/address" , address.payload); // Replace with your API
  return response.data;
};

const fetchUpdateAddressApi = async (address) => {
  const response = await axios.put("http://localhost:4000/api/address/update/"+ address.payload.id , address.payload); // Replace with your API
  return response.data;
};

const fetchDeleteAddressApi = async (address) => {
  const response = await axios.delete("http://localhost:4000/api/address/delete/" + address.payload); // Replace with your API
  return response.data;
};

function* fetchAddress() {
  try {
    const data = yield call(fetchAddressApi);
    yield put(fetchAddressSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchAddressFailure(error.message || "Failed to load Address"));
  }
}

function* fetchAddAddress(address) {
  try {
    const data = yield call(fetchAddAddressApi, address);
    yield put(fetchAddAddressSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchAddAddressFailure(error.message || "Failed to add Address"));
  }
}

function* fetchUpdateAddress(address) {
  try {
    const data = yield call(fetchUpdateAddressApi, address);
    yield put(fetchUpdateAddressSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchUpdateAddressFailure(error.message || "Failed to update Address"));
  }
}

function* fetchDeleteAddress(address) {
  try {
    const data = yield call(fetchDeleteAddressApi, address);
    yield put(fetchDeleteAddressSuccess(data)); // Store products in Redux
  } catch (error) {
    yield put(fetchDeleteAddressFailure(error.message || "Failed to delete Address"));
  }
}

export function* watchAddress() {
  yield takeLatest("FETCH_ADDRESS_REQUEST", fetchAddress);
  yield takeLatest("FETCH_ADD_ADDRESS_REQUEST", fetchAddAddress);
  yield takeLatest("FETCH_UPDATE_ADDRESS_REQUEST", fetchUpdateAddress);
  yield takeLatest("FETCH_DELETE_ADDRESS_REQUEST", fetchDeleteAddress);
}
