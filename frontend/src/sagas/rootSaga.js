import { all } from "redux-saga/effects";
import { watchAuth } from "./authSaga";
import { watchFetchProducts } from "./productsSaga";
import { watchCartProducts } from "./cartSaga";
import { watchOrders } from "./ordersSaga";
import { watchAddress } from "./addressListSaga";

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchFetchProducts(),
    watchCartProducts(),
    watchOrders(),
    watchAddress()
  ]);
}
