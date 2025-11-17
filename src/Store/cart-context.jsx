import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  subtractItemFromCart: () => {},
});

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    getCartItems();
  }, []);

  function getCartItems() {
    const items = JSON.parse(localStorage.getItem("cart-items")) ?? [];
    const quantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
    const total = items
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      .toFixed(2);
    setCartItems(items);
    setCartQuantity(quantity);
    setCartTotal(total);
    return { updatedItems: items, quantity };
  }

  function handleAddItemToCart(item) {
    const { updatedItems } = getCartItems();
    if (
      !updatedItems.find((meal) => meal.id === item.id) ||
      updatedItems.length === 0
    ) {
      item.quantity = 1;
      updatedItems.push(item);
    } else {
      const mealToAdjustQuantityOf = updatedItems.find(
        (meal) => meal.id === item.id
      );
      if (mealToAdjustQuantityOf) {
        mealToAdjustQuantityOf.quantity++;
      }
    }
    localStorage.setItem("cart-items", JSON.stringify(updatedItems));
    const quantity = updatedItems.reduce((acc, curr) => acc + curr.quantity, 0);
    const total = updatedItems
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      .toFixed(2);
    setCartItems(updatedItems);
    setCartQuantity(quantity);
    setCartTotal(total);
  }

  function handleSubtractItemFromCart(item) {
    let { updatedItems } = getCartItems();
    const mealToAdjustQuantityOf = updatedItems.find(
      (meal) => meal.id === item.id
    );

    if (mealToAdjustQuantityOf.quantity === 1) {
      updatedItems = updatedItems.filter((meal) => meal.id !== item.id);
    } else {
      mealToAdjustQuantityOf.quantity--;
    }
    localStorage.setItem("cart-items", JSON.stringify(updatedItems));
    const quantity = updatedItems.reduce((acc, curr) => acc + curr.quantity, 0);
    const total = updatedItems
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      .toFixed(2);
    setCartItems(updatedItems);
    setCartQuantity(quantity);
    setCartTotal(total);
  }

  function handleEmptyBasket() {
    localStorage.removeItem("cart-items");
  }

  async function submitOrder(orderData) {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit order");
    }
  }

  const ctxValue = {
    cartItems,
    cartQuantity,
    cartTotal,
    addItemToCart: handleAddItemToCart,
    subtractItemFromCart: handleSubtractItemFromCart,
    emptyBasket: handleEmptyBasket,
    submitOrder,
  };
  // CartContext.Provider would be needed for React version <19
  return <CartContext value={ctxValue}>{children}</CartContext>;
}
