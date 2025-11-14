const Meals = ({ meals, isLoading, onAddItem }) => {
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
                onClick={() => onAddItem(meal)}
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
