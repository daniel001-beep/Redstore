import { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { CartContext } from "./CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useContext(CartContext);

  const toggleMenu = () => {
    const menu = document.getElementById("MenuItems");
    if (menu) {
      if (menu.style.maxHeight === "0px" || !menu.style.maxHeight) {
        menu.style.maxHeight = "200px";
      } else {
        menu.style.maxHeight = "0px";
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <a href="/">
              <img src="/images/logo.png" width="125px" alt="Logo" />
            </a>
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
          <a href="/cart" className="cart-icon">
            <img src="/images/cart.png" width="30px" height="30px" alt="Cart" />
            <span className="cart-count">{cartCount}</span>
          </a>
          <a href="/account">
            <i
              className="fas fa-user-circle"
              style={{ fontSize: "30px", color: "#3b82f6", marginLeft: "15px" }}
            ></i>
          </a>
          <img
            src="/images/menu.png"
            className="menu-icon"
            onClick={toggleMenu}
            alt="Menu"
          />
        </div>
      </div>

      <div
        className="cart-container"
        style={{ maxWidth: "1300px", margin: "2rem auto", padding: "0 2rem" }}
      >
        <div
          className="cart-header"
          style={{
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "white",
            padding: "3rem",
            borderRadius: "1.5rem",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          <h1>
            <i className="fas fa-shopping-cart"></i> Your Shopping Cart
          </h1>
          <p>Review your items and proceed to checkout</p>
        </div>

        {cart.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "1.5rem",
            }}
          >
            <i
              className="fas fa-shopping-cart"
              style={{
                fontSize: "5rem",
                color: "#94a3b8",
                marginBottom: "1rem",
              }}
            ></i>
            <h3
              style={{ color: "#fff", fontSize: "2rem", marginBottom: "1rem" }}
            >
              Your cart is empty
            </h3>
            <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products" className="btn">
              Start Shopping <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        ) : (
          <div
            className="cart-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "2rem",
            }}
          >
            <div
              className="cart-items-container"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "1.5rem",
                padding: "2rem",
              }}
            >
              <div
                className="cart-items-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                  paddingBottom: "1rem",
                  borderBottom: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                <h2 style={{ margin: 0 }}>
                  <i className="fas fa-box"></i> Cart Items{" "}
                  <span
                    style={{
                      background: "#2563eb",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    ({cart.length})
                  </span>
                </h2>
                <button
                  onClick={() => {
                    if (window.confirm("Clear entire cart?")) {
                      cart.forEach((item) =>
                        removeFromCart(item.id, item.size),
                      );
                    }
                  }}
                  style={{
                    background: "none",
                    border: "2px solid #ef4444",
                    color: "#ef4444",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Clear Cart
                </button>
              </div>

              <div
                className="cart-items"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {cart.map((item, index) => {
                  const itemTotal = item.price * item.quantity;
                  return (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="cart-item"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "100px 1fr auto auto auto",
                        gap: "1.5rem",
                        padding: "1.5rem",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "0.75rem",
                        alignItems: "center",
                      }}
                    >
                      <div className="cart-item-image">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "0.5rem",
                            border: "3px solid white",
                          }}
                        />
                      </div>
                      <div className="cart-item-details">
                        <h4 style={{ marginBottom: "0.5rem", color: "#fff" }}>
                          {item.name}
                        </h4>
                        <div
                          className="cart-item-meta"
                          style={{
                            display: "flex",
                            gap: "1rem",
                            fontSize: "0.875rem",
                            color: "#94a3b8",
                          }}
                        >
                          <span>
                            <i className="fas fa-tag"></i> Size: {item.size}
                          </span>
                          <span>
                            <i className="fas fa-dollar-sign"></i> $
                            {item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div
                        className="cart-item-quantity"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "rgba(255,255,255,0.1)",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "none",
                            background: "#2563eb",
                            color: "white",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              item.size,
                              parseInt(e.target.value) || 1,
                            )
                          }
                          style={{
                            width: "50px",
                            textAlign: "center",
                            border: "none",
                            background: "transparent",
                            color: "#fff",
                            fontWeight: "600",
                          }}
                        />
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "none",
                            background: "#2563eb",
                            color: "white",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div
                        className="cart-item-subtotal"
                        style={{
                          fontWeight: "700",
                          color: "#fff",
                          minWidth: "80px",
                          textAlign: "right",
                        }}
                      >
                        ${itemTotal.toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="order-summary"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "1.5rem",
                padding: "2rem",
                position: "sticky",
                top: "100px",
              }}
            >
              <div className="summary-card">
                <h3 style={{ marginBottom: "1.5rem" }}>
                  <i className="fas fa-receipt"></i> Order Summary
                </h3>
                <div
                  className="summary-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    color: "#94a3b8",
                  }}
                >
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div
                  className="summary-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    color: "#10b981",
                    fontWeight: "600",
                  }}
                >
                  <span>Shipping</span>
                  <span>{cartTotal > 100 ? "Free" : "$10.00"}</span>
                </div>
                <div
                  className="summary-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    color: "#f59e0b",
                  }}
                >
                  <span>Tax (10%)</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.2)",
                    margin: "1.5rem 0",
                  }}
                ></div>
                <div
                  className="summary-row total"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#fff",
                  }}
                >
                  <span>Total</span>
                  <span>
                    $
                    {(
                      cartTotal +
                      (cartTotal > 100 ? 0 : 10) +
                      cartTotal * 0.1
                    ).toFixed(2)}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  className="btn"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "1rem",
                    display: "block",
                  }}
                >
                  Proceed to Checkout
                </Link>
                <div
                  className="continue-shopping"
                  style={{ textAlign: "center", marginTop: "1rem" }}
                >
                  <Link to="/products" style={{ color: "#94a3b8" }}>
                    <i className="fas fa-arrow-left"></i> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
