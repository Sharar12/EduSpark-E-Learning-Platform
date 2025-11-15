import React from 'react';
import './Testimonials.css';



const testimonialsData = [
    {
        quote: "EduSpark completely transformed my career. The Web Development Bootcamp was practical, up-to-date, and the instructor was amazing!",
        name: "Sarah Johnson",
        course: "Web Development Student",
        avatar: "https://i.pravatar.cc/80?img=45"
    },
    {
        quote: "I never thought I could learn Data Science online, but the structured curriculum and community support made it possible. Highly recommended!",
        name: "Michael Chen",
        course: "Data Science Student",
        avatar: "https://i.pravatar.cc/80?img=50"
    },
    {
        quote: "The UI/UX design course was a game-changer. I landed my dream job just weeks after completing it. The portfolio projects were invaluable.",
        name: "Emily Rodriguez",
        course: "UI/UX Design Student",
        avatar: "https://i.pravatar.cc/80?img=47"
    }
];

const TestimonialCard = ({ quote, name, course, avatar }) => (
    <div className="testimonial-card">
        <p className="testimonial-quote">"{quote}"</p>
        <div className="testimonial-author">
            <img src={avatar} alt={name} className="author-avatar" />
            <div className="author-info">
                <p className="author-name">{name}</p>
                <p className="author-course">{course}</p>
            </div>
        </div>
    </div>
);


const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">What Our Students Say</h2>
                    <p className="section-subtitle">Real stories from learners who have achieved their goals with EduSpark.</p>
                </div>
                <div className="testimonials-grid">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;