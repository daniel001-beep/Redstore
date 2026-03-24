import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-new">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img
              src="/images/logo-white.png"
              alt="RedStore"
              className="footer-logo"
            />
            <p className="footer-about">
              Premium sportswear for the modern athlete. Quality meets comfort
              since 2024.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="footer-social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="footer-social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="footer-social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Customer Service</h3>
            <ul className="footer-links">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Shipping Policy</a>
              </li>
              <li>
                <a href="#">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title">Get In Touch</h3>
            <div className="footer-contact-item">
              <i className="fas fa-map-marker-alt footer-contact-icon"></i>
              <span>Gwagwalada, Abuja, Nigeria</span>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-phone footer-contact-icon"></i>
              <span>+234 701 175 5321</span>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-envelope footer-contact-icon"></i>
              <span>support@redstore.com</span>
            </div>
          </div>
        </div>
        <div className="footer-newsletter">
          <div className="footer-newsletter-content">
            <div>
              <h4 className="footer-newsletter-title">
                Subscribe to Our Newsletter
              </h4>
              <p className="footer-newsletter-text">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <div className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="footer-newsletter-input"
              />
              <button className="footer-newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
