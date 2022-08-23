import PropTypes from 'prop-types';
import styles from './header-link.module.css';
import { NavLink } from 'react-router-dom';

export const HeaderLink = ({ to, renderIcon, children, routeMatch, ...props }) => {
  return (
    <NavLink
      to={to}
      className={`${styles.nav__link} ${routeMatch ? styles.nav__link_active : null}`}
      {...props}>
      {renderIcon()}
      <p className={`${styles.nav__text} ml-2 text text_type_main-default`}>{children}</p>
    </NavLink>
  );
};

// * дополнить пропсом to
HeaderLink.propTypes = {
  renderIcon: PropTypes.func,
  routeMatch: PropTypes.bool,
};