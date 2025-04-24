import {
    FETCH_ADDRESS_REQUEST,
    FETCH_ADDRESS_SUCCESS,
    FETCH_ADDRESS_FAILURE,
    FETCH_ADD_ADDRESS_REQUEST,
    FETCH_ADD_ADDRESS_SUCCESS,
    FETCH_ADD_ADDRESS_FAILURE,
    FETCH_UPDATE_ADDRESS_REQUEST,
    FETCH_UPDATE_ADDRESS_SUCCESS,
    FETCH_UPDATE_ADDRESS_FAILURE,
    FETCH_DELETE_ADDRESS_REQUEST,
    FETCH_DELETE_ADDRESS_SUCCESS,
    FETCH_DELETE_ADDRESS_FAILURE,
} from "../actions/addressListActions";

const initialState = {
    addresses: localStorage.getItem("addresses") || [],
    loading: false,
    error: null,
};

export const addressListReducer = (state = initialState, action) => {
    let updatedAddress;

    switch (action.type) {
        case FETCH_ADDRESS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ADDRESS_SUCCESS:
            updatedAddress = action.payload;
            localStorage.setItem("addresses", JSON.stringify(updatedAddress));
            return { ...state, loading: false, addresses: updatedAddress };
        case FETCH_ADDRESS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_ADD_ADDRESS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ADD_ADDRESS_SUCCESS:
            updatedAddress = [...state.addresses, action.payload.data];
            return { ...state, loading: false, addresses: updatedAddress };
        case FETCH_ADD_ADDRESS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_UPDATE_ADDRESS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_UPDATE_ADDRESS_SUCCESS:
            updatedAddress = state.addresses.map((addr) =>
                addr._id === action.payload.address._id ? action.payload.address : addr
            );
            return { ...state, loading: false, addresses: updatedAddress };
        case FETCH_UPDATE_ADDRESS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_DELETE_ADDRESS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DELETE_ADDRESS_SUCCESS:
            updatedAddress = state.addresses.filter((item) => item._id !== action.payload.address._id);
            return { ...state, loading: false, addresses: updatedAddress };
        case FETCH_DELETE_ADDRESS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};