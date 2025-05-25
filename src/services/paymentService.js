import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const initiatePayment = (orderData) => {
  return axios.post(`${API_URL}/api/payments/create-session`, orderData);
};

export const verifyPayment = (paymentData) => {
  return axios.post(`${API_URL}/api/payments/verify`, paymentData);
};

export const getPaymentStatus = (paymentId) => {
  return axios.get(`${API_URL}/api/payments/${paymentId}`);
};