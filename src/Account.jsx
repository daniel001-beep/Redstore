import { useState } from 'react';
import Footer from './Footer';

export default function Account() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ show: false, text: '', type: '' });

    const toggleMenu = () => {
        const menu = document.getElementById('MenuItems');
        if (menu) {
            if (menu.style.maxHeight === '0px' || !menu.style.maxHeight) {
                menu.style.maxHeight = '200px';
            } else {
                menu.style.maxHeight = '0px';
            }
        }
    };

    const handleAuth = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage({ show: true, text: 'Please fill in all fields', type: 'error' });
            return;
        }
        
        setMessage({ show: true, text: isSignIn ? 'Signing in...' : 'Creating account...', type: 'info' });
        
        setTimeout(() => {
            if (isSignIn) {
                setMessage({ show: true, text: 'Signed in successfully! Redirecting...', type: 'success' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                setMessage({ show: true, text: 'Account created successfully! Redirecting...', type: 'success' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        }, 1000);
    };

    return (
        <>
            <div className="container">
                <div className="navbar">
                    <div className="logo">
                        <a href="/"><img src="/images/logo.png" width="125px" alt="Logo" /></a>
                    </div>
                    <nav>
                        <ul id="MenuItems">
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>
                    <a href="/cart" className="cart-icon">
                        <img src="/images/cart.png" width="30px" height="30px" alt="Cart" />
                        <span className="cart-count" id="cart-count">0</span>
                    </a>
                    <a href="/account"><i className="fas fa-user-circle" style={{ fontSize: '30px', color: '#3b82f6', marginLeft: '15px' }}></i></a>
                    <img src="/images/menu.png" className="menu-icon" onClick={toggleMenu} alt="Menu" />
                </div>
            </div>

            <div className="account-page" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div className="account-container" style={{ maxWidth: '450px', width: '100%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', overflow: 'hidden' }}>
                    <div className="account-header" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', padding: '2rem', textAlign: 'center' }}>
                        <img src="/images/logo.png" alt="RedStore Logo" style={{ width: '100px', marginBottom: '1rem', filter: 'brightness(0) invert(1)' }} />
                        <h1 style={{ color: '#fff', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome Back!</h1>
                        <p style={{ color: 'rgba(255,255,255,0.9)' }}>Sign in to your account or create a new one</p>
                    </div>

                    <div className="account-tabs" style={{ display: 'flex', padding: '1rem 1rem 0', gap: '0.5rem' }}>
                        <div className={`account-tab ${isSignIn ? 'active' : ''}`} onClick={() => setIsSignIn(true)} style={{ flex: 1, textAlign: 'center', padding: '1rem', cursor: 'pointer', borderRadius: '10px 10px 0 0', fontWeight: '600', color: isSignIn ? '#2563eb' : '#94a3b8', background: isSignIn ? 'rgba(37,99,235,0.1)' : 'transparent', borderBottom: isSignIn ? '2px solid #2563eb' : 'none' }}>
                            Sign In
                        </div>
                        <div className={`account-tab ${!isSignIn ? 'active' : ''}`} onClick={() => setIsSignIn(false)} style={{ flex: 1, textAlign: 'center', padding: '1rem', cursor: 'pointer', borderRadius: '10px 10px 0 0', fontWeight: '600', color: !isSignIn ? '#2563eb' : '#94a3b8', background: !isSignIn ? 'rgba(37,99,235,0.1)' : 'transparent', borderBottom: !isSignIn ? '2px solid #2563eb' : 'none' }}>
                            Create Account
                        </div>
                    </div>

                    {message.show && (
                        <div className={`message ${message.type}`} style={{ margin: '1rem 2rem', padding: '1rem', borderRadius: '10px', background: message.type === 'success' ? '#d1fae5' : message.type === 'error' ? '#fee2e2' : '#e0e7ff', color: message.type === 'success' ? '#065f46' : message.type === 'error' ? '#991b1b' : '#1e40af' }}>
                            {message.text}
                        </div>
                    )}

                    <div className="account-forms" style={{ padding: '2rem' }}>
                        <form onSubmit={handleAuth}>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}><i className="fas fa-envelope"></i> Email Address</label>
                                <div className="input-wrapper" style={{ position: 'relative' }}>
                                    <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
                                    <i className="fas fa-envelope" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}><i className="fas fa-lock"></i> Password</label>
                                <div className="input-wrapper" style={{ position: 'relative' }}>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
                                    <i className="fas fa-lock" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                                </div>
                            </div>

                            <button type="submit" className="btn" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                                <i className={`fas ${isSignIn ? 'fa-sign-in-alt' : 'fa-user-plus'}`}></i> {isSignIn ? 'Sign In' : 'Create Account'}
                            </button>
                        </form>

                        <div className="demo-hint" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', borderLeft: '4px solid #2563eb' }}>
                            <p><i className="fas fa-info-circle"></i> Demo credentials:</p>
                            <p>Email: test@example.com</p>
                            <p>Password: password123</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}