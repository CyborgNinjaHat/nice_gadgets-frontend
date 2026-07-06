import { type FC } from 'react';
import { useCartStore } from '../../../store/useCartStore';
import { CartItem } from '../../molecules/CartItem/CartItem';
import './CartList.scss';

export const CartList: FC = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="cart-list">
      {cart.map((item) => (
        <CartItem key={item.itemId} item={item} />
      ))}
    </div>
  );
};
