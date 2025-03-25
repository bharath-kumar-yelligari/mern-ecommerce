import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { loginSuccess, loginFailure } from "../actions/authActions";
import { fetchProductsRequest } from "../actions/productActions";

const loginUserAPI = async (action) => {
    const { email, password } = action.payload;
    const response = await axios.post("http://localhost:4000/api/users/login" , { email, password }); 
    //const response = yield call(axios.post, "http://localhost:4000/api/users/login", { email, password });
    return response.data;
}

function* loginUser(action) {
    try {
        const response = yield call(loginUserAPI, action);
        yield put(loginSuccess(response));
        localStorage.setItem("user", response.name);
        localStorage.setItem("token", response.token);
        yield put(fetchProductsRequest()); // Fetch dashboard after login
        action.payload.navigate("/");
    } catch (error) {
        yield put(loginFailure(error.response?.data?.error || "Login failed"));
    }
}

export function* watchAuth() {
    yield takeLatest("LOGIN_REQUEST", loginUser);
}
