import { type FC } from 'react';
import { useCartStore } from '../../../store/useCartStore';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { notify } from '../../../utils/notify';
import type { Product } from '../../../types/Products';
import './ProductActions.scss';

interface Props {
  product: Product;
  height?: number;
}

export const ProductActions: FC<Props> = ({ product, height = 40 }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const inCart = useCartStore((state) => state.cart.some((item) => item.itemId === product.itemId));

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const inFavorites = useFavoritesStore((state) =>
    state.fav.some((item) => item.itemId === product.itemId),
  );

  const handleToggleCart = () => {
    if (inCart) {
      notify.removedFromCart(product);
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
      notify.addedToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    if (inFavorites) {
      notify.removedFromFavorites(product);
    } else {
      notify.addedToFavorites(product);
    }
    toggleFavorite(product);
  };

  return (
    <div className="product-actions">
      <Button
        className="product-actions__add"
        variant="primary"
        selected={inCart}
        onClick={handleToggleCart}
        style={{ height }}
      >
        {inCart ? 'Added to cart' : 'Add to cart'}
      </Button>

      <Button
        className="product-actions__like"
        variant="icon"
        selected={inFavorites}
        onClick={handleToggleFavorite}
        style={{ height, width: height }}
        aria-label="Add to favorites"
      >
        <Icon type={inFavorites ? 'favorites-filled' : 'favorites'} width="16px" height="16px" />
      </Button>
    </div>
  );
};
