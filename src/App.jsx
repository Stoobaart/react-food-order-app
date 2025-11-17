import { useContext, useEffect, useState } from "react";
import Meals from "./Components/Meals.jsx";
import Modal from "./Components/Modal.jsx";
import ErrorMessage from "./Components/Error.jsx";
import Cart from "./Components/Cart.jsx";
import { CartContext } from "./Store/cart-context.jsx";
import Header from "./Components/Header.jsx";

function App() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetchingMeals, setErrorFetchingMeals] = useState();
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const {
    cartItems,
    cartQuantity,
    cartTotal,
    subtractItemFromCart,
    addItemToCart,
  } = useContext(CartContext);

  useEffect(() => {
    async function getMeals() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        const meals = await response.json();
        setMeals(meals);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorFetchingMeals(error);
      }
    }
    getMeals();
  }, []);

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
        <Header
          cartQuantity={cartQuantity}
          setCartIsOpen={setCartIsOpen}
        />
        <Meals
          meals={meals}
          hasError={errorFetchingMeals}
          isLoading={isLoading}
          onAddItem={addItemToCart}
        />
      </main>
    </>
  );
}

export default App;
