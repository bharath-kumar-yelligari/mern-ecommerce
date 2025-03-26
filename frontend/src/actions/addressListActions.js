export const FETCH_ADDRESS_REQUEST = "FETCH_ADDRESS_REQUEST"
export const FETCH_ADDRESS_SUCCESS = "FETCH_ADDRESS_SUCCESS"
export const FETCH_ADDRESS_FAILURE = "FETCH_ADDRESS_FAILURE"
export const FETCH_ADD_ADDRESS_REQUEST = "FETCH_ADD_ADDRESS_REQUEST"
export const FETCH_ADD_ADDRESS_SUCCESS = "FETCH_ADD_ADDRESS_SUCCESS"
export const FETCH_ADD_ADDRESS_FAILURE = "FETCH_ADD_ADDRESS_FAILURE"
export const FETCH_UPDATE_ADDRESS_REQUEST = "FETCH_UPDATE_ADDRESS_REQUEST"
export const FETCH_UPDATE_ADDRESS_SUCCESS = "FETCH_UPDATE_ADDRESS_SUCCESS"
export const FETCH_UPDATE_ADDRESS_FAILURE = "FETCH_UPDATE_ADDRESS_FAILURE"
export const FETCH_DELETE_ADDRESS_REQUEST = "FETCH_DELETE_ADDRESS_REQUEST"
export const FETCH_DELETE_ADDRESS_SUCCESS = "FETCH_DELETE_ADDRESS_SUCCESS"
export const FETCH_DELETE_ADDRESS_FAILURE = "FETCH_DELETE_ADDRESS_FAILURE"


export const fetchAddressRequest = () => ({
    type: FETCH_ADDRESS_REQUEST,
});

export const fetchAddressSuccess = (action) => ({
    type: FETCH_ADDRESS_SUCCESS,
    payload: action
});

export const fetchAddressFailure = (error) => ({
    type: FETCH_ADDRESS_FAILURE,
    payload: error
});

export const fetchAddAddressRequest = (action) => ({
    type: FETCH_ADD_ADDRESS_REQUEST,
    payload: action
});

export const fetchAddAddressSuccess = (action) => ({
    type: FETCH_ADD_ADDRESS_SUCCESS,
    payload: action
});

export const fetchAddAddressFailure = (error) => ({
    type: FETCH_ADD_ADDRESS_FAILURE,
    payload: error
});

export const fetchUpdateAddressRequest = (action) => ({
    type: FETCH_UPDATE_ADDRESS_REQUEST,
    payload: action
});

export const fetchUpdateAddressSuccess = (action) => ({
    type: FETCH_UPDATE_ADDRESS_SUCCESS,
    payload: action
});

export const fetchUpdateAddressFailure = (error) => ({
    type: FETCH_UPDATE_ADDRESS_FAILURE,
    payload: error
});


export const fetchDeleteAddressRequest = (action) => ({
    type: FETCH_DELETE_ADDRESS_REQUEST,
    payload: action
});

export const fetchDeleteAddressSuccess = (action) => ({
    type: FETCH_DELETE_ADDRESS_SUCCESS,
    payload: action
});

export const fetchDeleteAddressFailure = (error) => ({
    type: FETCH_DELETE_ADDRESS_FAILURE,
    payload: error
});



