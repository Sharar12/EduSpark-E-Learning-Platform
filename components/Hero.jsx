import React from 'react';
import './Hero.css';




const Hero = ({ onNavigate, currentUser }) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-headline">
              Unlock Your Potential.
              <br />
              <span className="hero-headline-accent">Start Learning Today.</span>
            </h1>
            <p className="hero-subheadline">
              Explore thousands of courses taught by industry experts. Your journey to knowledge and new skills begins here at EduSpark.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => onNavigate('signup')}>
                Get Started for Free
              </button>
              <button className="btn-secondary" onClick={() => onNavigate('browseCourses')}>
                Explore Courses
              </button>
            </div>
          </div>
          <div className="hero-image-container">
            <img 
              src="https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg" 
              alt="E-learning illustration"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;