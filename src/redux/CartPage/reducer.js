
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT,
  DECREMENT,
  RESET,
  SET_CART_ITEMS,
  applyCoupon
} from "./actionType";

let initialState = {
  loading: false,
  error: false,
  cart: [],
  coupon: 0
};

export const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case applyCoupon: {
      return {
        ...state,
        coupon: payload
      };
    }

    case SET_CART_ITEMS: {
      return {
        ...state,
        cart: payload
      };
    }

   
    case ADD_TO_CART: {
      const { cart } = state;
      const product = payload;
      // Check if product is already in cart by productId & userId, not just by _id
      const existingItem = cart.findIndex(
        (item) => item.productId === product.productId && item.userId === product.userId
      );
      if (existingItem === -1) {
        const newItem = {
          ...product
        };
        return {
          ...state,
          cart: [...cart, newItem]
        };
      }
      return state;
    }
    
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload)
      };
    }

    case INCREMENT: {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === payload) {
            return { ...item, quantity: +item.quantity + 1 };
          }
          return item;
        })
      };
    }
    
    case DECREMENT: {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === payload) {
            return { ...item, quantity: +item.quantity - 1 };
          }
          return item;
        })
      };
    }

    case RESET: {
      return {
        ...state,
        cart: []
      };
    }

    default:
      return state;
  }
};