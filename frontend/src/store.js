import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./reducers/authReducer";
import { productsReducer } from "./reducers/productsReducer";
import { productDetailsReducer } from "./reducers/productDetailsReducer";
import { cartReducer } from "./reducers/cartReducer";
import { ordersReducer } from "./reducers/ordersReducer";

import { composeWithDevTools } from 'redux-devtools-extension';

import  rootSaga  from "./sagas/rootSaga";
import { addressListReducer } from "./reducers/addressListReducer";


const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(
  {
    auth: authReducer,
    products: productsReducer,
    selectedProduct : productDetailsReducer,
    cart:cartReducer,
    orders:ordersReducer,
    addresses : addressListReducer
  }
);

export const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    // other store enhancers if any
  )
);

sagaMiddleware.run(rootSaga);
