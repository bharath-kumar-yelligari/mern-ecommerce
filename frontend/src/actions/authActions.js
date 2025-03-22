export const loginRequest = (email, password, navigate) => ({
    type: "LOGIN_REQUEST",
    payload: { email, password,navigate }
});

export const loginSuccess = (token) => ({
    type: "LOGIN_SUCCESS",
    payload: token
});

export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const logout = () => ({
    type: "LOGOUT",
});
