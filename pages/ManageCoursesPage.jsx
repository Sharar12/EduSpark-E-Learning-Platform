import React, { useState, useEffect, useMemo } from 'react';
import { getAllUsers } from '../lib/db.js';
import { getAllCourses } from '../lib/courses.js';
import './ManageCoursesPage.css';



const ManageCoursesPage = ({ onBack, onDeleteCourse }) => {
    const [users, setUsers] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('revenue');

    useEffect(() => {
        const allUsers = getAllUsers();
        const usersMap = allUsers.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});
        setUsers(usersMap);
    }, []);

    const getAuthorName = (authorId) => {
        if (authorId === 'system') return 'System';
        return users[authorId]?.fullName || 'Unknown';
    };

    const filteredAndSortedCourses = useMemo(() => {
        const allCourses = getAllCourses();
        
        const filtered = allCourses.filter(course => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const authorName = getAuthorName(course.authorId).toLowerCase();
            
            return (
                course.id.toLowerCase().includes(lowerCaseSearchTerm) ||
                course.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                authorName.includes(lowerCaseSearchTerm)
            );
        });

        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'revenue':
                    return b.revenue - a.revenue;
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'videos':
                    return b.videos.length - a.videos.length;
                case 'enrolled':
                    return b.enrolledCount - a.enrolledCount;
                default:
                    return 0;
            }
        });

        return sorted;
    }, [searchTerm, sortBy, users]);

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <div>
                    <button className="back-button" onClick={onBack}>&larr; Back to Dashboard</button>
                    <h1>Manage Courses</h1>
                    <p>An overview of all courses on the platform.</p>
                </div>
            </header>
            <div className="admin-page-content">
                <div className="filter-controls">
                    <input
                        type="text"
                        placeholder="Search by ID, title, author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div className="sort-control">
                        <label htmlFor="sort-by">Sort by:</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="revenue">Revenue</option>
                            <option value="name">Name</option>
                            <option value="videos">Number of Videos</option>
                            <option value="enrolled">Enrolled</option>
                        </select>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="courses-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Course Title</th>
                                <th>Author</th>
                                <th>Videos</th>
                                <th>Enrolled</th>
                                <th>Revenue</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedCourses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.title}</td>
                                    <td>{getAuthorName(course.authorId)}</td>
                                    <td>{course.videos.length}</td>
                                    <td>{course.enrolledCount.toLocaleString()}</td>
                                    <td>{course.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                    <td>{course.createdAt}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-action btn-remove" onClick={() => onDeleteCourse(course.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCoursesPage;