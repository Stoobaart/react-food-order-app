import { useContext, useState } from "react";
import { CartContext } from "../Store/CartContext";
import { useActionState } from "react";
import Input from "../UI/Input";

const Checkout = () => {
  const [showSuccessState, setShowSuccessState] = useState(false);

  const { cartItems, submitOrder, emptyBasket } = useContext(CartContext);

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
          items: cartItems,
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
      {showSuccessState ? (
        <p>Order submitted successfully!</p>
      ) : (
        <form
          action={formAction}
          className="cart-form"
        >
          <div className="control-row">
            <Input
              label="name"
              defaultValue={formState.enteredValues?.name}
            />

            <Input
              label="email"
              defaultValue={formState.enteredValues?.email}
            />
          </div>

          <Input
            label="street"
            defaultValue={formState.enteredValues?.street}
          />

          <Input
            label="postal-code"
            defaultValue={formState.enteredValues?.["postal-code"]}
          />

          <Input
            label="city"
            defaultValue={formState.enteredValues?.city}
          />

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
      )}
    </>
  );
};

export default Checkout;
