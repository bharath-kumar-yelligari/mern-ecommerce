import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/authActions";

const initialState = {
  user: localStorage.getItem("user") || null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload.name, isLoggedIn: action.payload.isLoggedIn };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGOUT_SUCCESS:
      return { ...state, loading: false, user: null, cart: null, token: null, isLoggedIn: false };
    case LOGOUT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};