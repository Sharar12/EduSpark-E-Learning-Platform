import React from 'react';

import { getCourse } from '../lib/courses.js';
import './CartPage.css';



const CartPage = ({ user, onRemoveFromCart, onNavigate }) => {
    const cartCourses = (user.cart || []).map(id => getCourse(id)).filter(Boolean);
    const total = cartCourses.reduce((sum, course) => sum + (course?.price || 0), 0);

    return (
        <div className="cart-page-container">
            <header className="cart-page-header">
                <h1>Shopping Cart</h1>
            </header>
            <div className="cart-content">
                <div className="cart-items-list">
                    {cartCourses.length > 0 ? (
                        cartCourses.map(course => course && (
                            <div key={course.id} className="cart-item">
                                <img src={course.thumbnailUrl} alt={course.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{course.title}</h3>
                                    <p className="cart-item-author">By {course.authorId === 'system' ? 'EduSpark Staff' : 'A Teacher'}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <p className="cart-item-price">${course.price.toFixed(2)}</p>
                                    <button onClick={() => onRemoveFromCart(course.id)} className="cart-item-remove">Remove</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-cart-message">Your cart is empty.</p>
                    )}
                </div>

                {cartCourses.length > 0 && (
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button className="checkout-button" onClick={() => onNavigate('checkout')}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;