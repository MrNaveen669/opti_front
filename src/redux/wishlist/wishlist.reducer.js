// import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, RESET } from "./wishlist.types";

// const wishlistInitalState = {
//   loading: false,
//   error: false,
//   wishlist: []
// };

// export const wishlistReducer = (state = wishlistInitalState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case ADD_TO_WISHLIST: {
//       const { wishlist } = state;
//       const product = payload;

//       const newItem = {
//         ...product
//       };
//       return {
//         ...state,
//         wishlist: [...wishlist, newItem]
//       };
//     }
//     case REMOVE_FROM_WISHLIST: {
//       return {
//         wishlist: state.wishlist.filter((item) => item._id !== payload)
//       };
//     }

//     case RESET: {
//       return {
//         wishlist: []
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// };
// redux/wishlist/wishlist.reducer.js
import { 
  ADD_TO_WISHLIST, 
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST_ITEMS 
} from "./wishlist.types";

const initialState = {
  loading: false,
  error: false,
  wishlist: []
};

export const wishlistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_WISHLIST_ITEMS:
      return {
        ...state,
        wishlist: payload,
        loading: false,
        error: false
      };
      
    case ADD_TO_WISHLIST: {
      const { wishlist } = state;
      const product = payload;
      
      // Check if product is already in wishlist by productId & userId
      const existingItem = wishlist.findIndex(
        (item) => item.productId === product.productId && item.userId === product.userId
      );
      
      if (existingItem === -1) {
        // Add new item if it doesn't exist
        return {
          ...state,
          wishlist: [...wishlist, product]
        };
      }
      return state;
    }
    
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== payload)
      };
      
    default:
      return state;
  }
};

// Make sure to update your store configuration to use this reducer with the name 'wishlistManager'
// Example:
// import { wishlistReducer } from './wishlist/wishlist.reducer';
// 
// const rootReducer = combineReducers({
//   ...otherReducers,
//   wishlistManager: wishlistReducer
// });