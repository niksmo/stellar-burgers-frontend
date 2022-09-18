import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD, ingredientPropTypes } from '../../utils/constants';
import { useDrag } from 'react-dnd';
import { useHistory } from 'react-router-dom';

export const Ingredient = React.memo(props => {
  const history = useHistory();

  const [{ isDrag }, dragRef] = useDrag({
    type: ADD,
    item: { ingredient: props },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleShowDetails = () => {
    history.push({
      pathname: `/ingredients/${props._id}`,
      state: { background: history.location },
    });
  };

  return (
    <article
      className={`${styles.card} ${isDrag ? styles.card_dragged : ''}`}
      onClick={handleShowDetails}
      draggable
      ref={dragRef}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}>
          {props.price.toLocaleString('ru-RU')}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}> {props.name} </p>
      {props.qty ? (
        <div className={styles.counter}>
          <Counter count={props.qty} size="default" />
        </div>
      ) : null}
    </article>
  );
});

Ingredient.propTypes = ingredientPropTypes.isRequired;
