import React, { useState } from 'react';
import { getCourse } from '../lib/courses.js';
import './CoursePage.css';



const CoursePage = ({ course, onTakeQuiz, onBackToDashboard }) => {
  const [currentVideo, setCurrentVideo] = useState(course.videos[0]);

  const handleResourceClick = () => {
    if (currentVideo.resources && currentVideo.resources.length > 0) {
      alert(`Available Resources for this video:\n\n- ${currentVideo.resources.join('\n- ')}`);
    } else {
      alert('No resources available for this video.');
    }
  };

  return (
    <div className="course-page-container">
      <div className="course-page-header">
        <button className="back-button" onClick={onBackToDashboard}>
          &larr; Back to Dashboard
        </button>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>
      <div className="course-page-content">
        <div className="video-player-section">
          <div className="video-player">
            {/* In a real app, this would be a <video> element */}
            <div className="video-placeholder">
              <h2>Playing: {currentVideo.title}</h2>
              <p>Video content would be here.</p>
            </div>
          </div>
          <div className="video-actions">
            <button className="action-button" onClick={handleResourceClick}>
              <span role="img" aria-label="resources">📄</span> Resources
            </button>
            <button className="action-button" onClick={() => onTakeQuiz(currentVideo.quizId)}>
              <span role="img" aria-label="quiz">❓</span> Take Quiz
            </button>
          </div>
        </div>
        <div className="video-playlist-section">
          <h2>Course Playlist</h2>
          <ul className="video-playlist">
            {course.videos.map(video => (
              <li 
                key={video.id} 
                className={`playlist-item ${video.id === currentVideo.id ? 'active' : ''}`}
                onClick={() => setCurrentVideo(video)}
              >
                <div className="playlist-item-title">{video.title}</div>
                <div className="playlist-item-duration">{video.duration}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;