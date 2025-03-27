export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "LOGOUT_FAILURE"


export const loginRequest = (email, password, navigate) => ({
    type: LOGIN_REQUEST,
    payload: { email, password, navigate }
});

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
});

export const logoutSuccess = (token) => ({
    type: LOGOUT_SUCCESS,
    payload: token
});

export const logoutFailure = (error) => ({
    type: LOGOUT_FAILURE,
    payload: error
});
