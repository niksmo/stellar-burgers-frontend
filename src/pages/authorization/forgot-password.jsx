import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { AdditionalAction } from '../../components/additional-action/additional-action';
import { Form } from '../../components/form/form';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getResetCode,
  resetForgotPasswordFormValues,
  setForgotPasswordFormValue,
} from '../../services/actions/forgot-password';
import { getCookie } from '../../services/utils';
import { TOKEN } from '../../utils/constants';

export const ForgotPasswordPage = () => {
  const { form, getCodeRequest, getCodeFailed, resetStep } = useSelector(
    store => store.forgotPassword
  );

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const handleChangeEmail = evt => {
    const field = evt.currentTarget;
    dispatch(setForgotPasswordFormValue(field.name, field.value));
  };

  const handleRestorePassword = event => {
    event.preventDefault();

    dispatch(getResetCode(form));
  };

  const handleRouteSignIn = () => {
    history.push({ pathname: '/login' });
  };

  if (getCookie(TOKEN)) {
    return <Redirect to={location.state?.from || '/'} />;
  } else if (resetStep) {
    return <Redirect push to={{ pathname: '/reset-password', state: location.state }} />;
  }

  return (
    <main className={'authentication'}>
      <section className={'authentication__content'}>
        <h1 className={'authentication__title text text_type_main-medium mb-6'}>
          Восстановление пароля
        </h1>
        <Form formName={'forgotPassword'}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            name={'email'}
            value={form.email}
            onChange={handleChangeEmail}
            errorText={'Ошибка'}
          />
          <Button htmlType={'submit'} onClick={handleRestorePassword}>
            Восстановить
          </Button>
        </Form>
        <div className={'authentication__additional-actions mt-20'}>
          <AdditionalAction
            text={'Вспомнили пароль?'}
            buttonText={'Войти'}
            onClick={handleRouteSignIn}
          />
        </div>
      </section>
    </main>
  );
};