import styles from './burger-constructor.module.css';
import { ConstructorRow } from '../constructor-row/constructor-row';
import { Ordering } from '../ordering/ordering';
import { ADD } from '../../utils/constants';
import { IIngredient, TConstructorIngredient } from '../../utils/types';
import { useDrop } from 'react-dnd';
import { getConstructorAddAction } from '../../services/actions/constructor';
import { useAppDispatch } from '../../services/hooks';

interface IBurgerConstructor {
  blocked: boolean;
  bun: ReadonlyArray<TConstructorIngredient> | null;
  filling: ReadonlyArray<TConstructorIngredient> | null;
}

export function BurgerConstructor({ bun, filling, blocked }: IBurgerConstructor) {
  const dispatch = useAppDispatch();

  const [, dropRef] = useDrop({
    accept: ADD,
    drop({ ingredient }: { ingredient: IIngredient }) {
      dispatch(getConstructorAddAction(ingredient));
    },
  });

  return (
    <section className={`${styles.constructor} ${blocked ? styles.constructor_blocked : null}`}>
      <div className={styles.elements} ref={dropRef}>
        {bun ? <ConstructorRow isBun={true} type="top" ingredient={bun[0]} position={0} /> : null}
        {filling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {filling.map((item, index) => (
              <ConstructorRow isBun={false} key={item.tempId} ingredient={item} position={index} />
            ))}
          </ul>
        ) : null}
        {bun ? (
          <ConstructorRow isBun={true} type="bottom" ingredient={bun[0]} position={0} />
        ) : null}
      </div>
      <Ordering />
    </section>
  );
}
