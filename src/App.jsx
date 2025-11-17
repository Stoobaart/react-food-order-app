import { useContext, useState } from "react";
import Meals from "./Components/Meals.jsx";
import Modal from "./Components/Modal.jsx";
import ErrorMessage from "./Components/Error.jsx";
import Cart from "./Components/Cart.jsx";
import { CartContext } from "./Store/cart-context.jsx";
import Header from "./Components/Header.jsx";

function App() {
  const [errorFetchingMeals, setErrorFetchingMeals] = useState();
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const {
    cartItems,
    cartQuantity,
    cartTotal,
    subtractItemFromCart,
    addItemToCart,
  } = useContext(CartContext);

  function handleError() {
    setErrorFetchingMeals(null);
  }

  return (
    <>
      <Modal
        open={errorFetchingMeals}
        onClose={handleError}
      >
        {errorFetchingMeals && (
          <ErrorMessage
            title="An error occurred when fetching your places"
            message={errorFetchingMeals.message}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={cartIsOpen}>
        <Cart
          items={cartItems}
          cartTotal={cartTotal}
          onAddItem={addItemToCart}
          onSubtractItem={subtractItemFromCart}
          onClose={() => setCartIsOpen(false)}
        ></Cart>
      </Modal>
      <main>
        <Header setCartIsOpen={setCartIsOpen} />
        <Meals setErrorFetchingMeals={setErrorFetchingMeals} />
      </main>
    </>
  );
}

export default App;
