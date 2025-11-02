import React from 'react';
import './FeaturedCourses.css';
import { getAllCourses } from '../lib/courses.js';
import { getAllUsers } from '../lib/db.js';

const allUsers = getAllUsers();
const usersMap = allUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});


const StarIcon = ({ filled = true }) => (
    <svg className={`star-icon ${filled ? 'filled' : 'empty'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);



const CourseCard = ({ course, onAddToCart, onViewCourse, isInCart, isEnrolled }) => {
    const { id, category, title, authorId, price, thumbnailUrl } = course;
    const authorName = authorId === 'system' ? 'EduSpark Staff' : (usersMap[authorId]?.fullName || 'Unknown');
    const rating = 4.8; // placeholder
    
    const getButton = () => {
        if (isEnrolled) {
            return <button className="add-to-cart-btn" disabled>Enrolled</button>;
        }
        if (isInCart) {
            return <button className="add-to-cart-btn" disabled>In Cart</button>;
        }
        return <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(id); }}>Add to Cart</button>;
    };

    return (
        <div className="course-card" onClick={() => onViewCourse(id)}>
            <img src={thumbnailUrl} alt={title} className="course-image" />
            <div className="course-content">
                <span className="course-category">{category}</span>
                <h3 className="course-title">{title}</h3>
                <div className="course-instructor">
                    <span className="instructor-name">{authorName}</span>
                </div>
                <div className="course-meta">
                    <div className="course-rating">
                        <span className="rating-number">{rating}</span>
                        <div className="rating-stars">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(rating)} />)}
                        </div>
                    </div>
                    <span className="course-price">${price.toFixed(2)}</span>
                </div>
            </div>
            <div className="course-card-footer">
                {getButton()}
            </div>
        </div>
    );
};




const FeaturedCourses = ({ currentUser, onAddToCart, onViewCourse }) => {
    // Only show the first 3 courses as "featured"
    const coursesData = getAllCourses().slice(0, 3);
    
    return (
        <section className="courses-section" id="courses">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Explore Our Featured Courses</h2>
                    <p className="section-subtitle">Handpicked courses to help you achieve your career goals and expand your knowledge.</p>
                </div>
                <div className="courses-grid">
                    {coursesData.map(course => {
                         const isInCart = currentUser?.cart?.includes(course.id) ?? false;
                         const isEnrolled = currentUser?.enrolledCourseIds?.includes(course.id) ?? false;
                         return (
                            <CourseCard 
                                key={course.id} 
                                course={course} 
                                onAddToCart={onAddToCart}
                                onViewCourse={onViewCourse}
                                isInCart={isInCart}
                                isEnrolled={isEnrolled}
                            />
                         );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCourses;