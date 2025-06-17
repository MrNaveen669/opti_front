import * as types from './payment.types';

const initialState = {
  loading: false,
  error: null,
  paymentDetails: null
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case types.PAYMENT_SUCCESS:
      return { ...state, loading: false, paymentDetails: action.payload };
    case types.PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.PAYMENT_RESET:
      return initialState;
    default:
      return state;
  }
};

export default paymentReducer;