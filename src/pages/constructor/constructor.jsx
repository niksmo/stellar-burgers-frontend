import { useEffect } from 'react';
import styles from './constructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import ModalError from '../../components/modal-error/modal-error';
import { getIngredients } from '../../services/actions/burger';

export const ConstructorPage = () => {
  const { ingredientsLoaded, ingredientsRequest, ingredientsFailed } = useSelector(
    store => store.burger
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredientsLoaded) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredientsLoaded]);

  if (!ingredientsLoaded || ingredientsRequest) {
    return null;
  } else if (ingredientsFailed) {
    return <ModalError />;
  }

  return (
    <main className={styles.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};
