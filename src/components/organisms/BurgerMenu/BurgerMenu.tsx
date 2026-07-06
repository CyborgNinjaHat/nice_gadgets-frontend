import { useEffect, type FC, type Ref } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import { useCartStore } from '../../../store/useCartStore';
import { Icon } from '../../atoms/Icon/Icon';
import { Badge } from '../../atoms/Badge/Badge';
import { NAV_ITEMS } from '../../../constants/navigation';
import './BurgerMenu.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  containerRef?: Ref<HTMLElement>;
}

export const BurgerMenu: FC<Props> = ({ isOpen, onClose, containerRef }) => {
  const fav = useFavoritesStore((state) => state.fav);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <aside
      ref={containerRef}
      id="burger-menu"
      tabIndex={-1}
      inert={!isOpen}
      className={clsx('burger-menu', { 'burger-menu--open': isOpen })}
    >
      <nav className="burger-menu__nav">
        <ul className="burger-menu__nav-list">
          {NAV_ITEMS.map(({ to, label }) => (
            <li key={to} className="burger-menu__nav-item">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  clsx('burger-menu__nav-link', {
                    'burger-menu__nav-link--active': isActive,
                  })
                }
                onClick={onClose}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="burger-menu__actions">
        <ul className="burger-menu__actions-list">
          <li className="burger-menu__actions-item">
            <NavLink
              to="/favorites"
              aria-label="Favorites"
              className={({ isActive }) =>
                clsx('burger-menu__actions-link', 'burger-menu__actions-link--fav', {
                  'burger-menu__actions-link--active': isActive,
                })
              }
              onClick={onClose}
            >
              <Badge value={fav.length}>
                <Icon type="favorites" />
              </Badge>
            </NavLink>
          </li>

          <li className="burger-menu__actions-item">
            <NavLink
              to="/cart"
              aria-label="Cart"
              className={({ isActive }) =>
                clsx('burger-menu__actions-link', 'burger-menu__actions-link--cart', {
                  'burger-menu__actions-link--active': isActive,
                })
              }
              onClick={onClose}
            >
              <Badge value={cart.length}>
                <Icon type="cart" />
              </Badge>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
