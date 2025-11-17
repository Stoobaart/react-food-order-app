import React from "react";
import LOGO from "../assets/logo.jpg";

const Header = ({ cartQuantity, setCartIsOpen }) => {
  function handleOpenCart() {
    setCartIsOpen(true);
  }

  return (
    <header id="main-header">
      <div id="title">
        <img
          src={LOGO}
          alt="Food order app icon"
        />
        <h1>Food order app</h1>
      </div>
      <button
        className="text-button"
        onClick={handleOpenCart}
      >
        Cart ({cartQuantity})
      </button>
    </header>
  );
};

export default Header;
