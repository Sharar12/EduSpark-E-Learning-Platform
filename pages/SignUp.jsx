import React, { useState } from 'react';
import './SignUp.css';
import { signUp } from '../lib/auth.js';






const SignUp = ({ onNavigate, onSignUp }) => {
    const [selectedRole, setSelectedRole] = useState('student');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!fullName || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const newUser = signUp({
                fullName,
                email,
                password,
                role: selectedRole,
            });
            onSignUp(newUser);
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1 className="signup-title">Join EduSpark</h1>
                <p className="signup-subtitle">Create an account to start your journey.</p>

                <div className="role-selector">
                    <button
                        className={`role-button ${selectedRole === 'student' ? 'active' : ''}`}
                        onClick={() => setSelectedRole('student')}
                    >
                        I'm a Student
                    </button>
                    <button
                        className={`role-button ${selectedRole === 'teacher' ? 'active' : ''}`}
                        onClick={() => setSelectedRole('teacher')}
                    >
                        I'm a Teacher
                    </button>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="submit-button">
                       Create Account
                    </button>
                </form>

                <p className="signin-link">
                    Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('signin') }}>Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;