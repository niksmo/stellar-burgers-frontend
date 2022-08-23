import {
  LOGIN_FORM_FAILED,
  LOGIN_FORM_RESET_VALUES,
  LOGIN_FORM_SET_VALUE,
  LOGIN_FORM_SUBMIT,
  LOGIN_FORM_SUCCESS,
} from '../../utils/constants';
import { requireLogin } from '../api';
import { setCookie } from '../utils';

export const setLoginFormValue = (filed, value) => ({
  type: LOGIN_FORM_SET_VALUE,
  payload: { [filed]: value },
});

export const resetLoginFormValues = () => ({
  type: LOGIN_FORM_RESET_VALUES,
});

export const signIn = form => dispatch => {
  dispatch({ type: LOGIN_FORM_SUBMIT });

  requireLogin(form)
    .then(data => {
      const accessToken = data.accessToken.split('Bearer ')[1];
      const token = data.refreshToken;

      setCookie('accessToken', accessToken, { 'max-age': 1200 });
      setCookie('token', token);
      dispatch({ type: LOGIN_FORM_SUCCESS });
    })
    .catch(() => dispatch({ type: LOGIN_FORM_FAILED }));
};