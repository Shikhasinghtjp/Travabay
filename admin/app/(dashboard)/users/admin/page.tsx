"use client";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaCheckCircle, FaBan } from "react-icons/fa";

// 🏆 Interface for Admin Data
interface Admin {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Suspended"; // Assuming admins might have 'Inactive' status too
}

const AdminListPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form and Editing State
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingAdminId, setEditingAdminId] = useState<number | null>(null);

  // Form Field States
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");

  // --- Utility & Fetching ---

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      // NOTE: Using the /api/admin/users/admin endpoint from your previous code, 
      // as it likely fetches admin details based on the controller structure.
      const response = await fetch("http://localhost:5000/api/admin/users/admin"); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const rawData: any[] = await response.json();
      
      // 🏆 Normalize and filter data for admin display
      const adminData: Admin[] = rawData
        .map(item => ({
            ...item,
            id: Number(item.id),
            // Normalize status to match interface
            status: (item.status === 'Active' || item.status === 'Suspended' ? item.status : 'Inactive') as Admin['status'], 
            phone: item.phone || 'N/A' // Ensure phone exists for typing
        }))
        // You might need to filter if this endpoint returns ALL users:
        // .filter(item => item.role === 'admin');
        
      setAdmins(adminData);
    } catch (err: any) {
      console.error("Failed to fetch admin data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUsername("");
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setStatus("Active");
    setIsEditing(false);
    setEditingAdminId(null);
    setShowForm(false);
  };
  
  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const fillFormForEdit = (admin: Admin) => {
    setUsername(admin.username);
    setFullName(admin.fullName);
    setEmail(admin.email);
    setPhone(admin.phone);
    setPassword("");
    setConfirmPassword("");
    setStatus(admin.status);

    setEditingAdminId(admin.id);
    setIsEditing(true);
    setShowForm(true);
  };

  // --- CRUD Handlers ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !fullName || !email || !phone || !password && !isEditing) {
        return alert("Please fill all required fields.");
    }
    if (password !== confirmPassword) {
        return alert("Password and Confirm Password must match.");
    }

    const method: string = isEditing ? "PUT" : "POST";
    const url: string = isEditing
      ? `http://localhost:5000/api/admin/admins/${editingAdminId}` // 🏆 NEW Admin Endpoint
      : "http://localhost:5000/api/admin/admins"; // 🏆 NEW Admin Endpoint

    const body = {
      username,
      fullName,
      email,
      phone,
      status,
      // Only include password if adding or if password field is populated during edit
      ...(password && { password }), 
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "add"} admin: ${response.statusText}`);
      }

      alert(`Admin ${isEditing ? "updated" : "added"} successfully!`);
      resetForm();
      fetchAdmins();
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUpdateAdmin = (adminId: number) => {
    const adminToEdit = admins.find((a) => a.id === adminId);
    if (adminToEdit) {
      fillFormForEdit(adminToEdit);
    }
  };

  const handleDeleteAdmin = async (adminId: number) => {
    if (!window.confirm(`Are you sure you want to permanently delete Admin ID ${adminId}?`)) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/admin/admins/${adminId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete admin: ${response.statusText}`);
      }
      setAdmins(admins.filter((a) => a.id !== adminId));
      alert("Admin deleted successfully!");
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  // 🏆 NEW: Toggle Status Handler (Assuming separate PATCH endpoint)
  const handleToggleStatus = async (adminId: number, currentStatus: string) => {
    const newStatus: string = currentStatus === 'Active' ? 'Inactive' : 'Active';
    
    try {
        const response = await fetch(`http://localhost:5000/api/admin/admins/status/${adminId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to toggle status: ${response.statusText}`);
        }
        
        setAdmins(admins.map(admin => 
            admin.id === adminId ? { ...admin, status: newStatus as Admin['status'] } : admin
        ));
        
        alert(`Admin status changed to ${newStatus} successfully!`);
    } catch (err: any) {
        console.error(err);
        alert(`Error: ${err.message}`);
    }
  };


  useEffect(() => {
    fetchAdmins();
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
        <p>
          Could not load admin: {error}. Please ensure your backend API is ready.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center border-b-2 pb-2">
        <h2 className="text-4xl font-extrabold text-indigo-700">
          Admin User Management
        </h2>
        <button
          onClick={handleOpenAddForm}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          title="Add New Admin"
        >
          <FaPlus />
          <span className="hidden sm:inline">Add Admin</span>
        </button>
      </div>

      {/* Admin Add/Edit Form */}
      {showForm && (
        <div className="flex">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-full max-w-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
              {isEditing ? `Edit Admin: ${username}` : "Add New Admin"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
              </div>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
              </div>
              {/* Password (Required on Add, Optional on Edit) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password {isEditing ? '(Leave blank to keep existing)' : ''}</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required={!isEditing} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
              </div>
              {/* Confirm Password (Only shown on Add or if Password field is active) */}
              <div className={isEditing && !password ? 'hidden' : ''}> 
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required={!isEditing} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
              </div>
              
              {/* Status (Full Width, Only in Edit mode) */}
              {isEditing && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : isEditing ? "Update Admin" : "Add Admin"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admin List Table */}
      {!showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider rounded-tl-xl">
                  ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Email
                </th>
            
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider rounded-tr-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-indigo-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {admin.id}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                      {admin.username}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {admin.email}
                    </td>
                   
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${
                                              admin.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                      >
                        <div className="flex items-center">
                          {admin.status === "Active" ? (
                            <FaCheckCircle className="mr-1" />
                          ) : (
                            <FaBan className="mr-1" />
                          )}
                          {admin.status}
                        </div>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleUpdateAdmin(admin.id)}
                        className="text-blue-600 hover:text-blue-900 transition"
                        title="Edit Admin"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(admin.id, admin.status)}
                        className={`transition ${
                          admin.status === "Active"
                            ? "text-red-600 hover:text-red-900"
                            : "text-green-600 hover:text-green-900"
                        }`}
                        title={
                          admin.status === "Active"
                            ? "Deactivate Admin"
                            : "Activate Admin"
                        }
                      >
                        {admin.status === "Active" ? <FaBan /> : <FaCheckCircle />}
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-gray-400 hover:text-gray-700 transition"
                        title="Delete Admin"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No admin users found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminListPage;