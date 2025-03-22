const initialState = {
  user: localStorage.getItem("user") ||null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload.name, token: action.payload.token };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, loading: false , user: null,cart:null, token:null };
    default:
      return state;
  }
};
