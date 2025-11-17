import { useContext } from "react";
import { useState } from "react";
import { CartContext } from "../Store/cart-context";
import Checkout from "./Checkout";

const Cart = ({ onClose }) => {
  const [checkoutIsOpen, setCheckoutIsOpen] = useState(false);
  const { cartItems, cartTotal, subtractItemFromCart, addItemToCart } =
    useContext(CartContext);

  function handleOpenCheckout() {
    setCheckoutIsOpen(true);
  }

  function onAddItem(item) {
    addItemToCart(item);
  }

  function onSubtractItem(item) {
    subtractItemFromCart(item);
  }

  return (
    <>
      {!checkoutIsOpen ? (
        <div className="cart">
          <h2>Your cart</h2>
          <ul>
            {cartItems.length === 0 && <p>Your cart is empty</p>}
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="cart-item"
              >
                <p>
                  {item.name} - {item.quantity} x {item.price}
                </p>
                <div className="cart-item-actions">
                  <button onClick={() => onSubtractItem(item)}>-</button>
                  {item.quantity}
                  <button onClick={() => onAddItem(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">${cartTotal}</p>
          <div className="modal-actions">
            <button
              className="text-button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="button"
              onClick={handleOpenCheckout}
            >
              Go to Checkout
            </button>
          </div>
        </div>
      ) : (
        <Checkout />
      )}
    </>
  );
};

export default Cart;
