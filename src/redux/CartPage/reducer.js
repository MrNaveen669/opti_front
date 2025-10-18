// import {
//   ADD_TO_CART,
//   REMOVE_FROM_CART,
//   INCREMENT,
//   DECREMENT,
//   RESET,
//   applyCoupon
// } from "./actionType";

// let initialState = {
//   loading: false,
//   error: false,
//   cart: [],
//   coupon: 0
// };

// export const CartReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case applyCoupon: {
//       return {
//         ...state,
//         coupon: payload
//       };
//     }

//     case ADD_TO_CART: {
//       const { cart } = state;
//       const product = payload;
//       const existingItem = cart.findIndex((item) => item._id === product._id);
//       if (existingItem === -1) {
//         const newItem = {
//           ...product
//         };
//         return {
//           ...state,
//           cart: [...cart, newItem]
//         };
//       }
//       return alert("Product Already Add");
//     }
//     case REMOVE_FROM_CART: {
//       return {
//         cart: state.cart.filter((item) => item._id !== payload)
//       };
//     }

//     case INCREMENT: {
//       return {
//         cart: state.cart.filter((item) => {
//           if (item.id === payload) {
//             return (item.quantity = +item.quantity + 1);
//           }
//           return item;
//         })
//       };
//     }
//     case DECREMENT: {
//       return {
//         cart: state.cart.filter((item) => {
//           if (item.id === payload) {
//             return (item.quantity = +item.quantity - 1);
//           }
//           return item;
//         })
//       };
//     }

//     case RESET: {
//       return {
//         cart: []
//       };
//     }

//     default:
//       return state;
//   }
// };
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
  cart: [], // Always initialize as empty array
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
        cart: Array.isArray(payload) ? payload : [] // Ensure payload is array
      };
    }

    case ADD_TO_CART: {
      const { cart } = state;
      const product = payload;
      
      // Ensure cart is array before operations
      const safeCart = Array.isArray(cart) ? cart : [];
      
      // Check if product is already in cart by productId & userId, not just by _id
      const existingItem = safeCart.findIndex(
        (item) => item.productId === product.productId && item.userId === product.userId
      );
      
      if (existingItem === -1) {
        const newItem = {
          ...product
        };
        return {
          ...state,
          cart: [...safeCart, newItem]
        };
      }
      return state;
    }
    
    case REMOVE_FROM_CART: {
      const safeCart = Array.isArray(state.cart) ? state.cart : [];
      return {
        ...state,
        cart: safeCart.filter((item) => item._id !== payload)
      };
    }

    case INCREMENT: {
      const safeCart = Array.isArray(state.cart) ? state.cart : [];
      return {
        ...state,
        cart: safeCart.map((item) => {
          if (item._id === payload) {
            return { ...item, quantity: +item.quantity + 1 };
          }
          return item;
        })
      };
    }
    
    case DECREMENT: {
      const safeCart = Array.isArray(state.cart) ? state.cart : [];
      return {
        ...state,
        cart: safeCart.map((item) => {
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
        cart: [] // Always reset to empty array
      };
    }

    default:
      return state;
  }
};