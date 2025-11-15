import React from 'react';
import './CTASection.css';



const CTASection = ({ onNavigate }) => {
    return (
        <section className="cta-section">
            <div className="container cta-container">
                <h2 className="cta-title">Join Thousands of Learners Today!</h2>
                <p className="cta-subtitle">
                    Take the next step in your career. With a vast library of courses and a supportive community, your path to success starts here.
                </p>
                <div className="cta-action">
                    <button className="cta-button" onClick={() => onNavigate('signup')}>
                        Start Your Learning Journey
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;