import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    const menu = document.getElementById("MenuItems");
    if (menu) {
      if (menu.style.maxHeight === "0px" || !menu.style.maxHeight) {
        menu.style.maxHeight = "200px";
      } else {
        menu.style.maxHeight = "0px";
      }
    }
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const menu = document.getElementById("MenuItems");
    if (menu) {
      menu.style.maxHeight = "0px";
    }
  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" width="125px" alt="Logo" />
        </Link>
      </div>
      <nav>
        <ul id="MenuItems">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Link to="/cart" className="cart-icon">
        <img src="/images/cart.png" width="30px" height="30px" alt="Cart" />
        <span className="cart-count">{cartCount}</span>
      </Link>
      <Link to="/account">
        <i
          className="fas fa-user-circle"
          style={{ fontSize: "30px", color: "#3b82f6", marginLeft: "15px" }}
        ></i>
      </Link>
      <img
        src="/images/menu.png"
        className="menu-icon"
        onClick={toggleMenu}
        alt="Menu"
      />
    </div>
  );
};

export default Navbar;
