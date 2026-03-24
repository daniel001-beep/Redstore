import { useState } from "react";
import Footer from "./Footer";

export default function Contact() {
  const [formMessage, setFormMessage] = useState({
    show: false,
    text: "",
    type: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setFormMessage({ show: true, text: "Sending...", type: "info" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setFormMessage({
          show: true,
          text: "✅ Message sent successfully!",
          type: "success",
        });
        form.reset();
        setTimeout(
          () => setFormMessage({ show: false, text: "", type: "" }),
          5000,
        );
      } else {
        setFormMessage({
          show: true,
          text: "❌ Error sending message. Try again.",
          type: "error",
        });
      }
    } catch (error) {
      setFormMessage({
        show: true,
        text: "❌ Network error. Check your connection.",
        type: "error",
      });
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
        <div className="row" style={{ display: "flex", gap: "4rem" }}>
          <div className="col-2" style={{ flex: 1 }}>
            <h1>Let's Chat!</h1>
            <p>
              Got questions? We've got answers. Whether you need help with an
              order, want to suggest a new product, or just want to say hi -
              we're all ears.
            </p>

            <div className="contact-info" style={{ marginTop: "2rem" }}>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Visit Us</h3>
                  <p>Gwagwalada, Abuja, Nigeria</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+234 701 175 5321</p>
                  <p>Mon-Fri, 9AM-6PM</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>support@redstore.com</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9AM - 6PM</p>
                  <p>Saturday: 10AM - 4PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-2" style={{ flex: 1 }}>
            {formMessage.show && (
              <div
                className={`message ${formMessage.type}`}
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  background:
                    formMessage.type === "success"
                      ? "#d1fae5"
                      : formMessage.type === "error"
                        ? "#fee2e2"
                        : "#e0e7ff",
                  color:
                    formMessage.type === "success"
                      ? "#065f46"
                      : formMessage.type === "error"
                        ? "#991b1b"
                        : "#1e40af",
                }}
              >
                {formMessage.text}
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="access_key"
                value="b403125a-6b32-47b4-9028-3954d4ebc00f"
              />
              <input
                type="hidden"
                name="subject"
                value="New Message from RedStore Website"
              />
              <input
                type="hidden"
                name="from_name"
                value="RedStore Contact Form"
              />
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
              />

              <h2>Send Us a Message</h2>

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="subject_custom"
                  placeholder="Subject (Optional)"
                />
              </div>
              <div className="input-group">
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="small-container">
        <h2 className="title">Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <div className="faq-question">
              <h3>What if my gear doesn't fit right?</h3>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              <p>
                No worries! We've got a 30-day return policy. If it doesn't fit
                or you just don't love it, send it back. We only ask that items
                are unworn with tags still on.
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <h3>How long until I get my order?</h3>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              <p>
                Usually 3-5 days for standard shipping. Need it faster? We offer
                express shipping that gets there in 1-2 days. International
                orders take a bit longer - around 7-14 days.
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <h3>Do you ship worldwide?</h3>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              <p>
                Yep! We ship to over 50 countries. Shipping costs and times vary
                by location, but you'll see all the details when you check out.
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <h3>How can I track my package?</h3>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              <p>
                We'll email you a tracking number as soon as your order ships.
                You can also log into your account on our site to see where your
                gear is at.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
