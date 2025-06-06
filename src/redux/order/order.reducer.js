// order.reducer.js
import { PLACED_ORDER, UPDATE_ORDER_STATUS } from "./order.types";

const orderInitialState = {
  loading: false,
  error: false,
  order: [],
};

export const orderReducer = (state = orderInitialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case PLACED_ORDER: {
      // For each item in the cart, create an order entry
      const newOrders = Array.isArray(payload) 
        ? payload
        : [payload];
          
      return {
        ...state,
        order: [...state.order, ...newOrders],
      };
    }
    
    case UPDATE_ORDER_STATUS: {
      const updatedOrders = state.order.map(order => 
        order.orderId === payload.orderId 
          ? { ...order, status: payload.status }
          : order
      );
      
      return {
        ...state,
        order: updatedOrders,
      };
    }
    default: {
      return state;
    }
  }
};