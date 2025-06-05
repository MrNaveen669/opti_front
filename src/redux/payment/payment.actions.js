import * as paymentService from '../../services/paymentService';
import * as types from './payment.types';

export const initiatePaymentAction = (orderData) => async (dispatch) => {
  dispatch({ type: types.PAYMENT_REQUEST });
  try {
    const response = await paymentService.initiatePayment(orderData);
    dispatch({ type: types.PAYMENT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: types.PAYMENT_FAILURE, payload: error.message });
    throw error;
  }
};

export const verifyPaymentAction = (paymentData) => async (dispatch) => {
  dispatch({ type: types.PAYMENT_REQUEST });
  try {
    const response = await paymentService.verifyPayment(paymentData);
    dispatch({ type: types.PAYMENT_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: types.PAYMENT_FAILURE, payload: error.message });
    throw error;
  }
};

export const resetPayment = () => ({
  type: types.PAYMENT_RESET
});