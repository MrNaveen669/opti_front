// src/config/api.js

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://opticlair.in:443";

export const USERS_URL = `${BASE_URL}/user`;             // Base endpoint for user operations
export const LOGIN_URL = `${USERS_URL}/login`;             // For logging in
export const REGISTER_URL = `${USERS_URL}/register`;       // For registering new users
export const CART_URL = `${BASE_URL}/cart`;                // For cart operations
export const PRODUCT_URL = `${BASE_URL}/sampleproduct`; // For product operations
export const WISHLIST_URL = `${BASE_URL}/wishlist`; 
export const PRODUCT_ALL_URL = `${PRODUCT_URL}/all`; 
export const PAYMENT_URL = `${BASE_URL}/payment`; 