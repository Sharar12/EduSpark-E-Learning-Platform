import React from 'react';
import { getCourse } from '../lib/courses.js';
import { getAllUsers } from '../lib/db.js';
import './CourseDetailPage.css';

const allUsers = getAllUsers();
const usersMap = allUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});



const CourseDetailPage = ({ course, currentUser, onAddToCart, onBack }) => {
    const authorName = course.authorId === 'system' ? 'EduSpark Staff' : (usersMap[course.authorId]?.fullName || 'Unknown');
    const isEnrolled = currentUser?.enrolledCourseIds?.includes(course.id) ?? false;
    const isInCart = currentUser?.cart?.includes(course.id) ?? false;
    
    const getButton = () => {
        if (isEnrolled) {
            return <button className="add-to-cart-button" disabled>Already Enrolled</button>;
        }
        if (isInCart) {
            return <button className="add-to-cart-button" disabled>In Your Cart</button>;
        }
        return <button className="add-to-cart-button" onClick={() => onAddToCart(course.id)}>Add to Cart</button>;
    };

    return (
        <div className="course-detail-page-container">
            <div className="course-detail-header">
                <button className="back-button" onClick={onBack}>&larr; Back to Courses</button>
                <p className="course-category-breadcrumb">{course.category}</p>
                <h1>{course.title}</h1>
                <p className="course-author">Created by {authorName}</p>
            </div>
            <div className="course-detail-content">
                <div className="course-main-content">
                    <img src={course.thumbnailUrl} alt={course.title} className="course-detail-thumbnail" />
                    <h2>Description</h2>
                    <p className="course-description-text">{course.description}</p>
                    <h2>Course Content</h2>
                    <ul className="course-video-list-preview">
                        {course.videos.map(video => (
                            <li key={video.id}>
                                <span>{video.title}</span>
                                <span>{video.duration}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <aside className="course-sidebar">
                    <div className="course-purchase-card">
                        <span className="course-price-detail">${course.price.toFixed(2)}</span>
                        {getButton()}
                        <div className="course-features-preview">
                            <h4>This course includes:</h4>
                            <ul>
                                <li>Lifetime access</li>
                                <li>Certificate of completion</li>
                                <li>Access on mobile and TV</li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CourseDetailPage;