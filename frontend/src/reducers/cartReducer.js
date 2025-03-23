const initialState = {
  cart: localStorage.getItem("cart") || [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  let updatedCart;

  switch (action.type) {
    case "FETCH_CART_PRODUCTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_CART_PRODUCTS_SUCCESS":
      // return { ...state, loading: false, cart: action.payload };
      updatedCart = action.payload;
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage

      return { ...state, loading: false, cart: updatedCart };
    case "FETCH_CART_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_ADD_CART_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ADD_CART_SUCCESS":
      // updatedCart = [...state.cart, action.payload.data];

      if (action.payload.cart.action === "remove") {
        updatedCart = state.cart.filter((item) => item._id !== action.payload.cart._id);
      } else {
        updatedCart = state.cart.map((item) =>
          item.productId === action.payload.cart.productId
            ? { ...item, quantity: action.payload.cart.quantity } // ✅ Update quantity
            : item
        );

        // If the item is not found, add it as a new one
        if (!updatedCart.some((item) => item.productId === action.payload.cart.productId)) {
          updatedCart.push(action.payload.cart);
        }
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage

      return { ...state, loading: false, cart: updatedCart };
    case "FETCH_ADD_CARTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_REMOVE_CART_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_REMOVE_CART_SUCCESS":
      //return { ...state, loading: false, cart: state.cart.filter((item) => item._id !== action.payload.cart._id) };
      updatedCart = state.cart.filter((item) => item._id !== action.payload.cart._id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return { ...state, loading: false, cart: updatedCart };

    case "FETCH_REMOVE_CARTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
