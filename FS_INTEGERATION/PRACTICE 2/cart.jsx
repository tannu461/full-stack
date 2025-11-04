import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map(item => (
        <div key={item.id} style={{ margin: '10px' }}>
          {item.name} (${item.price})
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
            }
            style={{ width: '40px', marginLeft: '10px' }}
          />
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
