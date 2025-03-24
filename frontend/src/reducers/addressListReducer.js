const initialState = {
    addresses: localStorage.getItem("orders") || [],
    loading: false,
    error: null,
};

export const addressListReducer = (state = initialState, action) => {
    let updatedAddress;

    switch (action.type) {
        case "FETCH_ADDRESS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_ADDRESS_SUCCESS":
            updatedAddress = action.payload;
            localStorage.setItem("addresses", JSON.stringify(updatedAddress)); // Save to localStorage
            return { ...state, loading: false, addresses: updatedAddress };
        case "FETCH_ADDRESS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "FETCH_ADD_ADDRESS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_ADD_ADDRESS_SUCCESS":
            updatedAddress = [...state.addresses, action.payload.data];
            return { ...state, loading: false, addresses: updatedAddress };
        case "FETCH_ADD_ADDRESS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "FETCH_UPDATE_ADDRESS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_UPDATE_ADDRESS_SUCCESS":

            console.log("update address", action.payload)
            // updatedAddress = [...state.addresses, action.payload.address];

            updatedAddress = state.addresses.map((addr) =>
                addr._id === action.payload.address._id ? action.payload.address : addr
            )

            return { ...state, loading: false, addresses: updatedAddress };
        case "FETCH_UPDATE_ADDRESS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "FETCH_DELETE_ADDRESS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_DELETE_ADDRESS_SUCCESS":
            // updatedAddress = [...state.addresses, action.payload.data];
            console.log("action.payload", action.payload)
            updatedAddress = state.addresses.filter((item) => item._id !== action.payload.address._id);
            return { ...state, loading: false, addresses: updatedAddress };
        case "FETCH_DELETE_ADDRESS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
