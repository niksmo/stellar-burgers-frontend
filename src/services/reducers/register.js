import {
  REGISTER_FORM_FAILED,
  REGISTER_FORM_RESET_VALUES,
  REGISTER_FORM_SET_VALUE,
  REGISTER_FORM_SUBMIT,
  REGISTER_FORM_SUCCESS,
} from '../../utils/constants';

const initialState = {
  form: {
    name: '',
    email: '',
    password: '',
  },
  registerRequest: false,
  registerFailed: false,
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_FORM_SET_VALUE:
      return { ...state, form: { ...state.form, ...action.payload } };
    case REGISTER_FORM_RESET_VALUES:
      return { ...initialState };
    case REGISTER_FORM_SUBMIT:
      return { ...state, registerRequest: true };
    case REGISTER_FORM_SUCCESS:
      return { ...state, registerRequest: false };
    case REGISTER_FORM_FAILED:
      return { ...state, registerRequest: false, registerFailed: true };
    default:
      return state;
  }
};