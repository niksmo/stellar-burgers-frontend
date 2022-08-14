import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './additional-action.module.css';

export const AdditionalAction = ({ text, buttonText, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{text}</p>
      <Button type={'secondary'} onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};