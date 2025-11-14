const Cart = ({ items, cartTotal, onAddItem, onSubtractItem, onClose }) => {
  return (
    <>
      <div className="cart">
        <h2>Your cart</h2>
        <ul>
          {items.length === 0 && <p>Your cart is empty</p>}
          {items.map((item) => (
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
            onClick={() => {}}
          >
            Go to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
