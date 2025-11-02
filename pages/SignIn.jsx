import React, { useState } from 'react';
import './SignIn.css';
import { signIn } from '../lib/auth.js';
import { initialUsers } from '../lib/db.js';





const SignIn = ({ onNavigate, onSignIn }) => {
    const [selectedRole, setSelectedRole] = useState('student');
    const [error, setError] = useState('');

    const handleFakeSignIn = (e) => {
        e.preventDefault();
        setError('');
        try {
            // Find the pre-defined user for the selected role
            const userToSignIn = initialUsers.find(u => u.role === selectedRole);
            if (!userToSignIn) {
                throw new Error(`No mock user found for role: ${selectedRole}`);
            }
            // Use the mock user's credentials to sign in
            // FIX: The User object does not have a 'password' property. The mock signIn function accepts an optional password which is not used in this demo, so it can be omitted.
            const user = signIn(userToSignIn.email);
            onSignIn(user);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-card">
                <h1 className="signin-title">Welcome Back!</h1>
                <p className="signin-subtitle">Sign in to access your account.</p>

                <form className="signin-form">
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="role">I am a</label>
                        <select 
                            id="role" 
                            className="role-select"
                            value={selectedRole} 
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="you@example.com (not needed for demo)" />
                    </div>
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="•••••••• (not needed for demo)" />
                    </div>
                     <div className="form-group-extra">
                        <a href="#" className="forgot-password-link">Forgot Password?</a>
                    </div>
                    <button type="submit" className="submit-button" onClick={handleFakeSignIn}>
                        Sign In
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('signup') }}>Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
