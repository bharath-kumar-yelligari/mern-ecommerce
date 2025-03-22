import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchOrdersSuccess, fetchOrdersFailure} from "../actions/ordersActions";

const fetchOrdersApi = async () => {
  const response = await axios.get("http://localhost:4000/api/orders"); // Replace with your API
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

export function* watchOrders() {
  yield takeLatest("FETCH_ORDERS_REQUEST", fetchOrders);
}
