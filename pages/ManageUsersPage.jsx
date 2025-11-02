import React, { useState, useEffect, useMemo } from 'react';
import { getAllUsers } from '../lib/db.js';
import './ManageUsersPage.css';



const ManageUsersPage = ({ onAddUser, onEditUser, onDeleteUser, onBack }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        setAllUsers(getAllUsers());
    }, []);

    const filteredAndSortedUsers = useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filtered = allUsers.filter(user => 
            user.id.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.fullName.toLowerCase().includes(lowerCaseSearchTerm) ||
            user.email.toLowerCase().includes(lowerCaseSearchTerm)
        );

        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.fullName.localeCompare(b.fullName);
                case 'role':
                    return a.role.localeCompare(b.role);
                default:
                    return 0;
            }
        });

        return sorted;
    }, [allUsers, searchTerm, sortBy]);

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <div>
                    <button className="back-button" onClick={onBack}>&larr; Back to Dashboard</button>
                    <h1>Manage Users</h1>
                    <p>Create, view, update, and delete user accounts.</p>
                </div>
                <button className="btn-add-user" onClick={onAddUser}>+ Add User</button>
            </header>
            <div className="admin-page-content">
                <div className="filter-controls">
                    <input
                        type="text"
                        placeholder="Search by ID, name, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div className="sort-control">
                        <label htmlFor="sort-by-user">Sort by:</label>
                        <select
                            id="sort-by-user"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="name">Name</option>
                            <option value="role">Role</option>
                        </select>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td><span className={`role-badge role-${user.role}`}>{user.role}</span></td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-action btn-edit" onClick={() => onEditUser(user)}>Edit</button>
                                            <button className="btn-action btn-remove" onClick={() => onDeleteUser(user.id)}>Delete</button>
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

export default ManageUsersPage;