"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

interface Subcategory {
  id: number;
  subcategory: string;
  category_id: number;
  status: 'Active' | 'Inactive';
}

interface Category {
  id: number;
  category: string;
}

const SubcategoryListPage = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const fetchSubcategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/subcategories");
      if (!res.ok) throw new Error("Failed to fetch subcategories");
      const data = await res.json();
      setSubcategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleAddSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subcategoryName || !categoryId || !status) return alert("All fields required!");

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/subcategories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subcategory: subcategoryName, category_id: categoryId, status }),
      });
      if (!res.ok) throw new Error("Failed to add subcategory");
      setSubcategoryName("");
      setCategoryId(0);
      setStatus("Active");
      setShowForm(false);
      fetchSubcategories();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/subcategories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete subcategory");
      fetchSubcategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.category || "Unknown";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p className="ml-3 text-lg text-gray-600">Loading subcategories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-xl">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <Link href="/packages" className="hover:underline">Category</Link> /{" "}
        {!showForm ? (
          <span className="text-gray-700">Subcategory</span>
        ) : (
          <span className="text-gray-700">New Subcategory</span>
        )}
      </nav>

      <div className="flex justify-between items-center border-b-2 pb-2 border-gray-200 mb-6">
        <h2 className="text-4xl font-extrabold text-green-700">Subcategories Management</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            <FaPlus size={16} />
            <span className="hidden sm:inline">Add New Subcategory</span>
          </button>
        )}
      </div>

      {showForm ? (
        // Form aligned left
        <div className="flex">
          <form
            onSubmit={handleAddSubcategory}
            className="bg-white p-6 rounded-2xl shadow-xl space-y-4 w-full max-w-lg"
          >
             <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Select Category
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                Subcategory Name
              </label>
              <input
                type="text"
                id="subcategory"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                placeholder="e.g., Asia, Europe.."
                required
              />
            </div>

           

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Subcategory"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Subcategory</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Category Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {subcategories.length > 0 ? (
                subcategories.map((sub) => (
                  <tr key={sub.id} className="hover:bg-green-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900">{sub.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sub.subcategory}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getCategoryName(sub.category_id)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sub.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-3">
                      <button className="text-blue-600 hover:text-blue-800"><FaEdit size={16} /></button>
                      <button onClick={() => handleDelete(sub.id)} className="text-red-600 hover:text-red-800"><FaTrash size={16} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No subcategories found.</td>
                </tr>
              )}
            </tbody>
          </table>
       

        </div>
      )}
    </div>
  );
};

export default SubcategoryListPage;
