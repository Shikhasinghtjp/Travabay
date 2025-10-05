"use client";
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaCheckCircle, FaBan } from 'react-icons/fa'; // Added icons for actions and status

// Define the structure for the fetched user data, aligning with your database fields
/**
 * @typedef {object} User
 * @property {string} id - The user ID.
 * @property {string} username - The user's chosen username.
 * @property {string} fullName - The user's full name.
 * @property {string} email - The user's email.
 * @property {string} phone - The user's phone number.
 * @property {string} gender - The user's gender.
 * @property {string} address - The user's address.
 * @property {string} status - The current account status (e.g., 'Active', 'Suspended').
 */

const UserListPage = () => {
    /** @type {[User[], React.Dispatch<React.SetStateAction<User[]>>]} */
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Placeholder functions for CRUD actions
    const handleAddUser = () => console.log('Opening Add User Modal...');
    const handleUpdateUser = (userId) => console.log(`Opening Update Modal for ID: ${userId}`);
    const handleDeleteUser = (userId) => {
        if (window.confirm(`Are you sure you want to delete user ID ${userId}?`)) {
            console.log(`Deleting user ID: ${userId}... (Implement API call)`);
        }
    };
    const handleToggleStatus = (userId, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
        console.log(`Toggling status for user ID: ${userId} to ${newStatus}... (Implement API call)`);
    };

    // Fetch data from the backend API when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // UPDATED FETCH URL: Changed the path to /api/admin/users/admin
                const response = await fetch('http://localhost:5000/api/admin/users/admin');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                /** @type {User[]} */
                const data = await response.json();
                setUsers(data);
                
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                // @ts-ignore
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                <p className="ml-3 text-lg text-gray-600">Loading admin data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-xl">
                <p className="font-bold">Data Fetch Error</p>
                <p>Could not load admin: {error}. Please ensure your backend server is running on port 5000 and the endpoint /api/admin/users/admin is correctly defined.</p>
            </div>
        );
    }


    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center border-b-2 pb-2">
                <h2 className="text-4xl font-extrabold text-indigo-700">Registered Users Admin Panel</h2>
                <button
                    onClick={handleAddUser}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                    title="Add New User"
                >
                    <FaPlus />
                    <span className="hidden sm:inline">Add User</span>
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider rounded-tl-xl">ID</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Username</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Name</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Email</th>
                            {/* <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Phone</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Gender</th> */}
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Status</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-indigo-50 transition duration-150 ease-in-out">
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.id}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                                        {user.username}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {user.fullName}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 truncate">
                                        {user.email}
                                    </td>
                                    {/* <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                                        {user.phone}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {user.gender}
                                    </td> */}
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            <div className="flex items-center">
                                                {user.status === 'Active' ? <FaCheckCircle className="mr-1" /> : <FaBan className="mr-1" />}
                                                {user.status}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                        <button 
                                            onClick={() => handleUpdateUser(user.id)}
                                            className="text-blue-600 hover:text-blue-900 transition" 
                                            title="Edit User"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            onClick={() => handleToggleStatus(user.id, user.status)}
                                            className={`transition ${user.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`} 
                                            title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                                        >
                                            {user.status === 'Active' ? <FaBan /> : <FaCheckCircle />}
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-gray-400 hover:text-gray-700 transition" 
                                            title="Delete User"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                    No user records found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserListPage;
