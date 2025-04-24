import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { loginSuccess, loginFailure, LOGIN_REQUEST, logoutSuccess, logoutFailure, LOGOUT_REQUEST } from "../actions/authActions";
import { fetchProductsRequest } from "../actions/productActions";
import api from "../auth/axiosInstance";

const loginUserAPI = async (action) => {
    const { email, password } = action.payload;
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, { email, password });
    return response.data;
}

const logoutUserAPI = async () => {
    const response = await api.post(`/users/logout`);
    return response.data;
}

function* loginUser(action) {
    try {
        const response = yield call(loginUserAPI, action);
        yield put(loginSuccess(response));
        localStorage.setItem("user", response.name);
        yield put(fetchProductsRequest()); // Fetch dashboard after login
        action.meta.navigate("/");
    } catch (error) {
        yield put(loginFailure(error.response?.data?.error || "Login failed"));
    }
}

function* logoutUser(action) {
    try {
        const response = yield call(logoutUserAPI);
        yield put(logoutSuccess(response));
        console.log("logoutsuccess")
    } catch (error) {
        yield put(logoutFailure(error.response?.data?.error || "Login failed"));
    }
}


export function* watchAuth() {
    yield takeLatest(LOGIN_REQUEST, loginUser);
    yield takeLatest(LOGOUT_REQUEST, logoutUser);
}
