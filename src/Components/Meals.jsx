import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Store/cart-context";

const Meals = ({ setErrorFetchingMeals }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { addItemToCart } = useContext(CartContext);

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
        handleOnErrorFetchingMeals(error);
      }
    }
    getMeals();
  }, []);

  function handleOnErrorFetchingMeals(error) {
    setErrorFetchingMeals(error);
  }

  return (
    <div id="meals">
      {isLoading && <p>Fetching meals...</p>}
      {!isLoading &&
        meals.length > 0 &&
        meals.map((meal) => (
          <div
            key={meal.id}
            className="meal-item article"
          >
            <img
              src={"http://localhost:3000/" + meal.image}
              alt={`image for ${meal.name}`}
            />
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{meal.price}</p>
            <p className="meal-item-description">{meal.description}</p>
            <div className="meal-item-actions">
              <button
                className="button"
                onClick={() => addItemToCart(meal)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Meals;
