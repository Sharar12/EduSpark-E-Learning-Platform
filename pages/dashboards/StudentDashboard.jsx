import React from 'react';

import { courses } from '../../lib/courses.js';
import './StudentDashboard.css';



const StudentDashboard = ({ user, onNavigateToCourse }) => {
  const studentDetails = {
    studentId: `STU-${user.id.padStart(4, '0')}`,
    transactionId: 'TXN-F8B3K2M9P1',
    transactionType: 'Per-Course Purchase',
    admitDate: '2024-03-15',
    expireDate: 'N/A',
  };

  const enrolledCourses = user.enrolledCourseIds
    ? user.enrolledCourseIds.map(id => courses[id]).filter(Boolean)
    : [];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back, {user.fullName.split(' ')[0]}!</p>
      </header>
      <div className="student-dashboard-grid">
        <div className="student-details-card">
          <h2>Account Information</h2>
          <dl className="details-list">
            <dt>Student Name</dt>
            <dd>{user.fullName}</dd>
            <dt>Student ID</dt>
            <dd>{studentDetails.studentId}</dd>
            <dt>Date of Admit</dt>
            <dd>{studentDetails.admitDate}</dd>
            <dt>Subscription Expires</dt>
            <dd>{studentDetails.expireDate}</dd>
            <dt>Last Transaction</dt>
            <dd>{studentDetails.transactionId}</dd>
            <dt>Account Type</dt>
            <dd>{studentDetails.transactionType}</dd>
          </dl>
        </div>
        <section className="dashboard-section">
          <h2>My Courses</h2>
          <div className="course-list-scrollable">
            <div className="course-list">
              {enrolledCourses.map((course) => (
                <div className="course-item" key={course.id}>
                  <img src={course.thumbnailUrl} alt={course.title} className="student-course-thumbnail" />
                  <div className="course-item-content">
                    <h3>{course.title}</h3>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `45%` }}></div>
                    </div>
                    <span>45% Complete</span>
                  </div>
                  <button className="enter-course-btn" onClick={() => onNavigateToCourse(course.id)}>
                      Enter Course
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;