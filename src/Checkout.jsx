import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import Footer from "./Footer";

export default function Checkout() {
  const { cartTotal } = useContext(CartContext);
  const shipping = cartTotal > 100 ? 0 : 10;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

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
            <span className="cart-count" id="cart-count">
              0
            </span>
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

      <div className="small-container">
        <div
          className="checkout-header"
          style={{ textAlign: "center", margin: "3rem 0" }}
        >
          <h1>
            <i className="fas fa-lock"></i> Secure Checkout
          </h1>
          <p style={{ color: "#94a3b8" }}>
            Complete your purchase in just a few steps
          </p>
        </div>

        <div
          className="checkout-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            className="checkout-form"
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "1rem",
              padding: "2rem",
            }}
          >
            <h2 style={{ marginBottom: "1.5rem" }}>
              <i className="fas fa-user"></i> Contact Information
            </h2>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#fff",
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                }}
              />
            </div>

            <h2 style={{ margin: "2rem 0 1.5rem" }}>
              <i className="fas fa-truck"></i> Shipping Address
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#fff",
                  }}
                >
                  First Name *
                </label>
                <input
                  type="text"
                  placeholder="John"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                  }}
                />
              </div>
              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#fff",
                  }}
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#fff",
                }}
              >
                Address *
              </label>
              <input
                type="text"
                placeholder="123 Main St"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#fff",
                  }}
                >
                  City *
                </label>
                <input
                  type="text"
                  placeholder="New York"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                  }}
                />
              </div>
              <div className="form-group">
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#fff",
                  }}
                >
                  ZIP Code *
                </label>
                <input
                  type="text"
                  placeholder="10001"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#fff",
                }}
              >
                Country *
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                }}
              >
                <option>United States</option>
                <option>Nigeria</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Sweden</option>
              </select>
            </div>

            <h2 style={{ margin: "2rem 0 1.5rem" }}>
              <i className="fas fa-credit-card"></i> Payment Method
            </h2>
            <div className="payment-methods" style={{ marginBottom: "1rem" }}>
              <div
                className="payment-option"
                style={{ marginBottom: "0.5rem" }}
              >
                <input type="radio" id="card" name="payment" defaultChecked />{" "}
                <label
                  htmlFor="card"
                  style={{ color: "#fff", marginLeft: "0.5rem" }}
                >
                  <i className="fas fa-credit-card"></i> Credit/Debit Card
                </label>
              </div>
              <div className="payment-option">
                <input type="radio" id="paypal" name="payment" />{" "}
                <label
                  htmlFor="paypal"
                  style={{ color: "#fff", marginLeft: "0.5rem" }}
                >
                  <i className="fab fa-paypal"></i> PayPal
                </label>
              </div>
            </div>

            <div id="card-details">
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#fff",
                  }}
                >
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div className="form-group">
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      color: "#fff",
                    }}
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                    }}
                  />
                </div>
                <div className="form-group">
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      color: "#fff",
                    }}
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="terms"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                margin: "2rem 0",
              }}
            >
              <input type="checkbox" id="terms" required />{" "}
              <label htmlFor="terms" style={{ color: "#94a3b8" }}>
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>

            <button
              className="btn"
              onClick={() => alert("Order placed successfully!")}
              style={{ width: "100%", textAlign: "center", display: "block" }}
            >
              <i className="fas fa-lock"></i> Place Order - ${total.toFixed(2)}
            </button>
          </div>

          <div
            className="order-summary"
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "1rem",
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
                }}
              >
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
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
                <span>$${tax.toFixed(2)}</span>
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
                <span>$${total.toFixed(2)}</span>
              </div>
              <div
                className="security-badge"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: "2rem",
                  padding: "1rem",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "0.5rem",
                }}
              >
                <i
                  className="fas fa-shield-alt"
                  style={{ fontSize: "2rem", color: "#10b981" }}
                ></i>
                <div>
                  <strong>100% Secure Checkout</strong>
                  <br />
                  Your payment information is encrypted and secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
