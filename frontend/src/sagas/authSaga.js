import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { loginSuccess, loginFailure } from "../actions/authActions";
import { fetchProductsRequest } from "../actions/productActions";

function* loginUser(action) {
    try {
        const { email, password} = action.payload;
        const response = yield call(axios.post, "http://localhost:4000/api/users/login", { email, password });
        yield put(loginSuccess(response.data));
        console.log("response.data.token",response.data.token)
        localStorage.setItem("user", response.data.name);
        localStorage.setItem("token", response.data.token);
        yield put(fetchProductsRequest()); // Fetch products after login
        action.payload.navigate("/home");
    } catch (error) {
        yield put(loginFailure(error.response?.data?.error || "Login failed"));
    }
}

export function* watchAuth() {
    yield takeLatest("LOGIN_REQUEST", loginUser);
}
