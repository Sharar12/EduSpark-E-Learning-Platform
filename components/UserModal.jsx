import React, { useState, useEffect } from 'react';

import './UserModal.css';



const UserModal = ({ user, onClose, onSave }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    const isEditing = user !== null;

    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setEmail(user.email);
            setRole(user.role);
            setPassword(''); // Clear password field for security
        } else {
            // Reset form for new user
            setFullName('');
            setEmail('');
            setPassword('');
            setRole('student');
        }
    }, [user]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            fullName,
            email,
            role,
            // FIX: Add `joinDate` to satisfy the type. For new users this is a placeholder,
            // for existing users it preserves the original value.
            joinDate: user?.joinDate || '',
        };
        if (isEditing) {
            userData.id = user.id;
        }
        if (password) {
            userData.password = password;
        } else if (!isEditing) {
            alert('Password is required for new users.');
            return;
        }
        onSave(userData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <header className="modal-header">
                    <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="modalFullName">Full Name</label>
                            <input id="modalFullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="modalEmail">Email</label>
                            <input id="modalEmail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="modalPassword">Password</label>
                            <input id="modalPassword" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={isEditing ? 'Leave blank to keep current' : 'Enter a password'} required={!isEditing} />
                        </div>
                         <div className="form-group">
                            <label htmlFor="modalRole">Role</label>
                            <select id="modalRole" value={role} onChange={e => setRole(e.target.value)} required>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <footer className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-save">Save Changes</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default UserModal;