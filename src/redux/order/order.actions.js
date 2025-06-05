// order.actions.js
import { PLACED_ORDER, UPDATE_ORDER_STATUS } from "./order.types";

export const addToOrder = (items) => {
  const newOrders = Array.isArray(items) ? items : [items];
  return {
    type: PLACED_ORDER,
    payload: newOrders
  };
};

export const updateOrderStatus = (orderId, status) => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: {
      orderId,
      status
    }
  };
};