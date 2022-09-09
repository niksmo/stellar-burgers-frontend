import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_RESET_ORDERS,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
} from '../actions/web-socket';

const initialState = {
  connected: false,
  ordersData: [],
  error: null,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return { ...state, connected: true, error: null };
    case WS_CONNECTION_ERROR:
      return { ...state, connected: false, error: action.payload };
    case WS_CONNECTION_CLOSED:
      return { ...state, connected: false, error: null };
    case WS_GET_MESSAGE:
      return { ...state, ordersData: action.payload };
    case WS_RESET_ORDERS:
      return { ...state, ordersData: initialState.ordersData };
    default:
      return state;
  }
};
