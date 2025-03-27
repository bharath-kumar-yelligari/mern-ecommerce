const initialState = {
  user: localStorage.getItem("user") || null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload.name, isLoggedIn: action.payload.isLoggedIn };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGOUT_SUCCESS":
      return { ...state, loading: false, user: null, cart: null, token: null, isLoggedIn: false };
    case "LOGOUT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    // case "LOGOUT":
    //   return { ...state, loading: false , user: null,cart:null, token:null };
    default:
      return state;
  }
};
