import React from 'react';

import { getCourse } from '../lib/courses.js';
import './CheckoutPage.css';



const CheckoutPage = ({ user, onCheckout, onBack }) => {
    const cartCourses = (user.cart || []).map(id => getCourse(id)).filter(Boolean);
    const total = cartCourses.reduce((sum, course) => sum + (course?.price || 0), 0);

    return (
        <div className="checkout-page-container">
            <header className="checkout-page-header">
                 <button className="back-button" onClick={onBack}>&larr; Back to Cart</button>
                <h1>Checkout</h1>
            </header>
            <div className="checkout-content">
                <div className="payment-form-section">
                    <h2>Payment Information</h2>
                    <form className="payment-form">
                        <div className="form-group">
                            <label htmlFor="cardName">Name on Card</label>
                            <input type="text" id="cardName" defaultValue={user.fullName} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="payment-form-grid">
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input type="text" id="expiryDate" placeholder="MM / YY" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvc">CVC</label>
                                <input type="text" id="cvc" placeholder="123" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                     {cartCourses.map(course => course && (
                        <div key={course.id} className="summary-item">
                            <span>{course.title}</span>
                            <span>${course.price.toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="checkout-button" onClick={onCheckout}>
                        Complete Purchase
                    </button>
                    <p className="secure-checkout-text">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                        Secure Checkout
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
