import { useActionState, useContext } from "react";
import { useState } from "react";
import { CartContext } from "../Store/cart-context";

const Cart = ({ items, cartTotal, onAddItem, onSubtractItem, onClose }) => {
  const [checkoutIsOpen, setCheckoutIsOpen] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState(false);
  const { submitOrder, emptyBasket } = useContext(CartContext);

  function handleOpenCheckout() {
    setCheckoutIsOpen(true);
  }

  async function submitOrderAction(prevFormState, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const street = formData.get("street");
    const postcode = formData.get("postal-code");
    const city = formData.get("city");

    let errors = [];

    name.trim() === "" && errors.push("Name cannot be empty");
    email.trim() === "" && errors.push("Email cannot be empty");
    street.trim() === "" && errors.push("Street cannot be empty");
    postcode.trim() === "" && errors.push("Post code cannot be empty");
    city.trim() === "" && errors.push("Please enter your city");

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          name,
          email,
          street,
          "postal-code": postcode,
          city,
        },
      };
    }

    try {
      submitOrder({
        order: {
          customer: {
            name,
            email,
            street,
            "postal-code": postcode,
            city,
          },
          items: items,
        },
      });
      setShowSuccessState(true);
      emptyBasket();
    } catch (error) {
      alert(error.message);
    }

    return {
      errors: null,
    };
  }

  const [formState, formAction] = useActionState(submitOrderAction, {
    errors: null,
  });

  return (
    <>
      {!checkoutIsOpen ? (
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
              onClick={handleOpenCheckout}
            >
              Go to Checkout
            </button>
          </div>
        </div>
      ) : !showSuccessState ? (
        <form
          action={formAction}
          className="cart-form"
        >
          <div className="control-row">
            <p className="control">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required={true}
                defaultValue={formState.enteredValues?.name}
              />
            </p>

            <p className="control">
              <label htmlFor="email">E-mail Address</label>
              <input
                type="text"
                id="email"
                name="email"
                required={true}
                defaultValue={formState.enteredValues?.email}
              />
            </p>
          </div>
          <p className="control">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              required={true}
              defaultValue={formState.enteredValues?.street}
            ></input>
          </p>
          <p className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              required={true}
              defaultValue={formState.enteredValues?.["postal-code"]}
            ></input>
          </p>
          <p className="control">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              required={true}
              defaultValue={formState.enteredValues?.city}
            ></input>
          </p>

          {formState.errors && (
            <ul className="errors">
              {formState.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <p className="actions">
            <button type="submit">Submit Order</button>
          </p>
        </form>
      ) : (
        <p>Order submitted successfully!</p>
      )}
    </>
  );
};

export default Cart;
