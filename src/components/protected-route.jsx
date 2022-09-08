import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getClientAccessState, getClientTokenState, getCookie } from '../services/utils';
import { TOKEN, USER_ACCESS_FAILED, USER_ACCESS_SUCCESS } from '../utils/constants';
import { getUserAccess } from '../services/actions/profile';
import PropTypes from 'prop-types';
import { Loader } from './loader/loader';

export const ProtectedRoute = ({ children, ...props }) => {
  const { userAccess, getUserAccessRequest, getUserAccessFailed } = useSelector(
    (store) => store.profile
  );
  const dispatch = useDispatch();

  const hasAccessToken = getClientAccessState();
  const hasToken = getClientTokenState();

  useEffect(() => {
    if (!getUserAccessRequest) {
      if (hasAccessToken) {
        dispatch({ type: USER_ACCESS_SUCCESS });
      } else if (hasToken) {
        console.log('protected route - getUserAccess (get Access and new Refresh token');
        dispatch(getUserAccess(getCookie(TOKEN)));
      } else {
        dispatch({ type: USER_ACCESS_FAILED });
      }
    }
  }, [dispatch, getUserAccessRequest, hasAccessToken, hasToken]);

  // useEffect(() => {
  //   if (hasAccess) {
  //     debugger;
  //     dispatch({ type: USER_ACCESS_SUCCESS });
  //   } else if (hasToken) {
  //     debugger;
  //     console.log('dispatch get UserAccess'); //иногда срабатывает два раза подряд при вызове страницы через адрес и дублирует токен
  //     dispatch(getUserAccess(getCookie(TOKEN)));
  //   } else {
  //     dispatch({ type: USER_ACCESS_FAILED });
  //   }
  // }, [dispatch, userAccess, hasAccessToken, hasToken]);

  if ((!hasAccessToken && !getUserAccessFailed) || getUserAccessRequest) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // if (getUserAccessRequest) {
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <Route
      {...props}
      render={({ location }) =>
        getUserAccessFailed ? (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
};
