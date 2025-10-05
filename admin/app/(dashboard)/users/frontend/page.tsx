"use client";
import React, { useState, useEffect } from 'react';

// Define the structure for the fetched user data
/**
 * @typedef {object} User
 * @property {string} id - The user ID.
 * @property {string} username - The user's chosen username.
 * @property {string} password_hash - The masked or hashed password (for display purposes, showing actual password is not recommended).
 * @property {string} gender - The user's gender.
 * @property {string} address - The user's address.
 * @property {string} phone - The user's phone number.
 */

const UserListPage = () => {
    /** @type {[User[], React.Dispatch<React.SetStateAction<User[]>>]} */
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the backend API when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/users/frontend');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                /** @type {User[]} */
                const data = await response.json();
                setUsers(data);
                
            } catch (err) {
                console.error("Failed to fetch user data:", err);
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
                <p className="ml-3 text-lg text-gray-600">Loading user data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-xl">
                <p className="font-bold">Data Fetch Error</p>
                {/* UPDATED: Reference the new backend port */}
                <p>Could not load users: {error}. Please ensure your backend server is running on port 5000 and the endpoint /api/admin/users is correctly defined.</p>
            </div>
        );
    }


    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-extrabold text-indigo-700 border-b-2 pb-2">Registered Users</h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider rounded-tl-xl">User ID</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Username</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Name</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Gender</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Email</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Phone no</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Address</th>
                           
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
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/* Display masked password/hash for security */}
                                        {user.fullname}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                                            {user.gender}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                                        {user.email}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                                        {user.phone}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                                        {user.address}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
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
