import React, { useState, useMemo } from 'react';

import { courses } from '../../lib/courses.js';
import './TeacherDashboard.css';



const TeacherDashboard = ({ user, onCreateCourse, onEditCourse, onDeleteCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('releasedDate');
  
  const teacherCourses = useMemo(() => Object.values(courses).filter(c => c.authorId === user.id), [user.id]);
  
  // Calculate aggregate stats
  const totalRevenue = useMemo(() => teacherCourses.reduce((sum, course) => sum + course.revenue, 0), [teacherCourses]);
  const totalVideos = useMemo(() => teacherCourses.reduce((sum, course) => sum + course.videos.length, 0), [teacherCourses]);
  const totalViews = useMemo(() => teacherCourses.reduce((sum, course) => sum + course.views, 0), [teacherCourses]);


  const filteredAndSortedCourses = useMemo(() => {
    const filtered = teacherCourses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'views':
          return b.views - a.views;
        case 'price':
            return b.price - a.price;
        case 'enrolled':
          return b.enrolledCount - a.enrolledCount;
        case 'releasedDate':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [teacherCourses, searchTerm, sortBy]);


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p>Manage your courses and engage with your students.</p>
      </header>

      <div className="teacher-dashboard-grid">
        <div className="teacher-details-card">
          <h2>Teacher Information</h2>
           <dl className="details-list">
            <dt>Teacher Name</dt>
            <dd>{user.fullName}</dd>
            <dt>Teacher ID</dt>
            <dd>{user.id}</dd>
            <dt>Join Date</dt>
            <dd>{user.joinDate}</dd>
            <dt>Total Revenue</dt>
            <dd>{totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</dd>
            <dt>Total Courses</dt>
            <dd>{teacherCourses.length}</dd>
            <dt>Total Videos</dt>
            <dd>{totalVideos}</dd>
            <dt>Total Views</dt>
            <dd>{totalViews.toLocaleString()}</dd>
          </dl>
        </div>
      
        <section className="dashboard-section">
          <div className="section-header-actions">
            <h2>My Courses</h2>
            <button className="create-course-btn" onClick={onCreateCourse}>
              + Create New Course
            </button>
          </div>

          {teacherCourses.length > 0 && (
            <div className="filter-controls">
              <input
                type="text"
                placeholder="Search by title or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="sort-control">
                <label htmlFor="sort-by-teacher">Sort by:</label>
                <select
                  id="sort-by-teacher"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="releasedDate">Released Date</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="views">Views</option>
                  <option value="enrolled">Enrolled</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="teacher-course-list-wrapper">
            {teacherCourses.length > 0 ? (
              filteredAndSortedCourses.length > 0 ? (
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th>Course Title</th>
                      <th>Released Date</th>
                      <th>Videos</th>
                      <th>Views</th>
                      <th>Price</th>
                      <th>Enrolled</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedCourses.map(course => (
                      <tr key={course.id}>
                        <td>
                          <img src={course.thumbnailUrl} alt={course.title} className="course-thumbnail" />
                        </td>
                        <td>{course.title}</td>
                        <td>{course.createdAt}</td>
                        <td>{course.videos.length}</td>
                        <td>{course.views.toLocaleString()}</td>
                        <td>{course.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td>{course.enrolledCount.toLocaleString()}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-action btn-edit" onClick={() => onEditCourse(course.id)}>
                              Edit
                            </button>
                            <button className="btn-action btn-remove" onClick={() => onDeleteCourse(course.id)}>
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-courses-message">
                  <p>No courses found matching your search criteria.</p>
                </div>
              )
            ) : (
              <div className="no-courses-message">
                <p>You haven't created any courses yet.</p>
                <button className="create-course-btn" onClick={onCreateCourse}>
                  Create Your First Course
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;