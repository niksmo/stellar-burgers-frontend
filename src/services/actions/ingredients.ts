import { IIngredient } from '../../utils/constants';
import { fetchIngredients } from '../api-refactor';
import { AppDispatch } from '../types';

export const INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST' = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS: 'INGREDIENTS_SUCCESS' = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_FAILED: 'INGREDIENTS_FAILED' = 'INGREDIENTS_FAILED';

interface IGetIngredientsRequestAction {
  readonly type: typeof INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccessAction {
  readonly type: typeof INGREDIENTS_SUCCESS;
  payload: ReadonlyArray<IIngredient>;
}

interface IGetIngredientsFailedAction {
  readonly type: typeof INGREDIENTS_FAILED;
  payload: string;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
  type: INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (
  payload: ReadonlyArray<IIngredient>
): IGetIngredientsSuccessAction => ({
  type: INGREDIENTS_SUCCESS,
  payload,
});

export const getIngredientsFailedAction = (payload: string): IGetIngredientsFailedAction => ({
  type: INGREDIENTS_FAILED,
  payload,
});

export const fetchIngredientsAction = () => async (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequestAction());

  try {
    const res = await fetchIngredients();
    dispatch(getIngredientsSuccessAction(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getIngredientsFailedAction('Что-то пошло не так. Попробуйте обновить страницу'));
  }
};

// const index = 'INGREDIENTS';

// export const ACTION_TYPES = {
//   REQUEST: `${index}/REQUEST`,
//   SUCCESS: `${index}/SUCCESS`,
//   FAILED: `${index}/FAILED`,
// };

// export const fetchIngredients = () => dispatch => {
//   dispatch({ type: ACTION_TYPES.REQUEST });

//   requireIngredients()
//     .then(res => {
//       dispatch({ type: ACTION_TYPES.SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       dispatch({ type: ACTION_TYPES.FAILED });
//       console.log(err);
//     });
// };
