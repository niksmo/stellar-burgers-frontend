import { useEffect } from 'react';
import { useParams, Redirect, useRouteMatch } from 'react-router-dom';
import { CardOrderDetails } from '../../components/card-order-details/card-order-details';
import { Loader } from '../../components/loader/loader';
import { ModalError } from '../../components/modal-error/modal-error';
import {
  getWSocketConnectionStartAction,
  getWSocketConnectionCloseAction,
} from '../../services/actions/web-socket';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { selectFeedError, selectFeedOrders } from '../../services/selectors/feed';
import { IParamsForId } from '../../services/hooks';
import { getWsProfileEndpoint } from '../../services/utils';
import { WS_ENDPOINT_ALL } from '../../utils/constants';
import style from './card-order-details.module.css';

export const OrderDetailsPage = () => {
  const feedError = useAppSelector(selectFeedError);
  const feedOrders = useAppSelector(selectFeedOrders);

  const dispatch = useAppDispatch();

  const isProfileFeed = useRouteMatch('/profile/orders/');

  const { id: orderId } = useParams<IParamsForId>();

  useEffect(() => {
    if (isProfileFeed) {
      dispatch(getWSocketConnectionStartAction(getWsProfileEndpoint()));
    } else {
      dispatch(getWSocketConnectionStartAction(WS_ENDPOINT_ALL));
    }

    return () => {
      dispatch(getWSocketConnectionCloseAction());
    }; // eslint-disable-next-line
  }, [dispatch]);

  if (feedOrders.length === 0 && !feedError) {
    return <Loader />;
  } else if (feedError) {
    return <ModalError />;
  }

  const hasOrder = feedOrders.some(({ _id }) => _id === orderId);

  if (!hasOrder) {
    return <Redirect to={{ pathname: '/order-not-found' }} />;
  }

  return (
    <main className={style.content}>
      <div className={style.detailsWrapper}>
        <CardOrderDetails />
      </div>
    </main>
  );
};
