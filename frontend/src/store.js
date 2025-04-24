import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./reducers/authReducer";
import { productsReducer } from "./reducers/productsReducer";
import { productDetailsReducer } from "./reducers/productDetailsReducer";
import { cartReducer } from "./reducers/cartReducer";
import { ordersReducer } from "./reducers/ordersReducer";

import rootSaga from "./sagas/rootSaga";
import { addressListReducer } from "./reducers/addressListReducer";


const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(
  {
    auth: authReducer,
    products: productsReducer,
    selectedProduct: productDetailsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    addresses: addressListReducer
  }
);

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActionPaths: ['meta.navigate'],
          ignoredPaths: ['some.deep.meta.navigate'], // optional
        }
      }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
  }
);

sagaMiddleware.run(rootSaga);

export default store