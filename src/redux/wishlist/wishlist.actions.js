// import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, RESET } from "./wishlist.types";

// export const addToWishlist = (product) => {
//   return {
//     type: ADD_TO_WISHLIST,
//     payload: product
//   };
// };

// export const removeFromWishlist = (item) => {
//   return {
//     type: REMOVE_FROM_WISHLIST,
//     payload: item
//   };
// };

// export const WishlistReset = (id) => {
//   return {
//     type: RESET
//   };
// };
// Updated wishlist actions
import axios from "axios";
import { WISHLIST_URL } from "../../config/api"; // Add this import at the top
import { 
  ADD_TO_WISHLIST, 
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST_ITEMS 
} from "./wishlist.types";

// Action creator to add item to wishlist
export const addToWishlist = (product) => async (dispatch, getState) => {
  try {
    // Get user from localStorage (same as in cart)
    const user = JSON.parse(localStorage.getItem("user")) || {};
    
    if (!user._id) {
      throw new Error("User not logged in");
    }
    
    // Check if item already exists in Redux store first
    const { wishlistManager } = getState();
    const existingItem = wishlistManager.wishlist.find(
      item => item.productId === product._id && item.userId === user._id
    );
    
    if (existingItem) {
      console.log("Item already exists in wishlist");
      return false; // Item already exists
    }
    
    // Create a wishlist item with user association
    const wishlistItem = {
      userId: user._id,
      imageTsrc: product.image || product.imageTsrc,
      productRefLink: product.name || product.productRefLink || `Product ${product._id}`,
      rating: product.rating || "0",
      colors: product.colors || "",
      price: product.price?.toString() || "0",
      mPrice: product.mPrice || product.price?.toString() || "0",
      name: product.name || product.productRefLink,
      shape: product.shape || "",
      gender: product.gender || "",
      style: product.style || "",
      dimension: product.dimension || "",
      productType: product.category || product.productType || "",
      productId: product._id, // Important for the compound index
      userRated: "0"
    };
    
    // Add to database
    // const response = await axios.post('http://localhost:5000/wishlist', wishlistItem);
  const response = await axios.post(WISHLIST_URL, wishlistItem);
    
    // If successful, update Redux store with the database ID
    if (response.status === 201 || response.status === 200) {
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: {
          ...wishlistItem,
          _id: response.data._id // Use the MongoDB-generated _id
        }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    
    // Check if it's a duplicate error from the database
    if (error.response && error.response.status === 400 && 
        (error.response.data.msg === "Item already in wishlist" || error.code === 11000)) {
      console.log("Item already exists in database");
      return false;
    }
    
    return false;
  }
};

// Action creator to remove item from wishlist
export const removeFromWishlist = (itemId) => async (dispatch) => {
  try {
    // First remove from database
    // await axios.delete(`http://localhost:5000/wishlist/${itemId}`);
await axios.delete(`${WISHLIST_URL}/${itemId}`);
    
    // Then update Redux store
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: itemId
    });
    return true;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    // Still update Redux for optimistic UI
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: itemId
    });
    return false;
  }
};

// Action creator to load wishlist items from database
export const loadWishlistItems = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    
    if (!user._id) {
      // If no user, clear wishlist
      dispatch({
        type: SET_WISHLIST_ITEMS,
        payload: []
      });
      return;
    }
    
    // Get wishlist items for current user
    // const response = await axios.get(`http://localhost:5000/wishlist/user/${user._id}`);
    const response = await axios.get(`${WISHLIST_URL}/user/${user._id}`);
    
    if (response.status === 200) {
      dispatch({
        type: SET_WISHLIST_ITEMS,
        payload: response.data
      });
    }
  } catch (error) {
    console.error("Error loading wishlist items:", error);
    // Set empty array on error
    dispatch({
      type: SET_WISHLIST_ITEMS,
      payload: []
    });
  }
};