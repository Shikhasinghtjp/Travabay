"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

interface Country {
  id: number;
  package_name: string;
  category_id: number;
  subcategory_id: number;
  location: string;
  price: string;
  date: string;
  duration: string;
  about: string;
  files: FileMeta[];
}

interface Category {
  id: number;
  category: string;
}

interface Subcategory {
  id: number;
  subcategory: string;
  category_id: number;
}

interface FileMeta {
  name: string;
  type: string;
  size: string;
  dimensions?: string;
  file: File;
}

const CountryListPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [packageName, setPackageName] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [subcategoryId, setSubcategoryId] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [about, setAbout] = useState("");
  const [files, setFiles] = useState<FileMeta[]>([]);

  // Fetch categories, subcategories, and countries
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

  const fetchSubcategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/subcategories");
      if (!res.ok) throw new Error("Failed to fetch subcategories");
      const data = await res.json();
      setSubcategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/countries");
      if (!res.ok) throw new Error("Failed to fetch countries");
      const data = await res.json();
      setCountries(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchCountries();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const filesWithMeta = selectedFiles.map((file) => {
      const meta: FileMeta = {
        name: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        file,
      };

      if (file.type.startsWith("image/")) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          meta.dimensions = `${img.width}x${img.height}`;
          setFiles((prev) => [...prev]);
        };
      }

      return meta;
    });

    setFiles(filesWithMeta);
  };

  const handleAddCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageName || !categoryId || !subcategoryId || !location || !price || !date || !duration) {
      return alert("All fields are required!");
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("package_name", packageName);
      formData.append("category_id", categoryId.toString());
      formData.append("subcategory_id", subcategoryId.toString());
      formData.append("location", location);
      formData.append("price", price);
      formData.append("date", date);
      formData.append("duration", duration);
      formData.append("about", about);

      files.forEach((fileMeta) => formData.append("files", fileMeta.file));

      const res = await fetch("http://localhost:5000/api/admin/countries", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add country");

      // Reset form
      setPackageName("");
      setCategoryId(0);
      setSubcategoryId(0);
      setLocation("");
      setPrice("");
      setDate("");
      setDuration("");
      setAbout("");
      setFiles([]);
      setShowForm(false);
      fetchCountries();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCountry = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this country package?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/countries/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete country package");
      fetchCountries();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.category || "Unknown";
  const getSubcategoryName = (id: number) => subcategories.find((s) => s.id === id)?.subcategory || "Unknown";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p className="ml-3 text-lg text-gray-600">Loading country packages...</p>
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
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <span className="text-gray-700">Country Packages</span> /{" "}
        {showForm && <span className="text-gray-700">New Package</span>}
      </nav>

      {/* Page Header */}
      <div className="flex justify-between items-center border-b-2 pb-2 border-gray-200 mb-6">
        <h2 className="text-4xl font-extrabold text-green-700">Country Packages Management</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            <FaPlus size={16} />
            <span className="hidden sm:inline">Add New Package</span>
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleAddCountry}
          className="bg-white p-6 rounded-2xl shadow-xl space-y-6 w-full max-w-5xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Package Name</label>
              <input
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              >
                <option value="">-- Select Subcategory --</option>
                {subcategories
                  .filter((s) => s.category_id === categoryId)
                  .map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.subcategory}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>
          </div>

          {/* About / Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Images / Videos</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-gray-700"
            />
            {files.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {files.map((file, index) => (
                  <li key={index}>
                    <span className="font-semibold">{file.name}</span> - {file.type} - {file.size} {file.dimensions && `- ${file.dimensions}px`}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." :
                              "Save Package"}
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
                        )}
                  
                        {/* Countries Table */}
                        {!showForm && (
                          <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-green-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">ID</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Package Name</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Category</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Subcategory</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Location</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Price</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Date</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Duration</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-100">
                                {countries.length > 0 ? (
                                  countries.map((c) => (
                                    <tr key={c.id} className="hover:bg-green-50 transition">
                                      <td className="px-6 py-4 text-sm text-gray-900">{c.id}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{c.package_name}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{getCategoryName(c.category_id)}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{getSubcategoryName(c.subcategory_id)}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{c.location}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{c.price}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{c.date}</td>
                                      <td className="px-6 py-4 text-sm text-gray-700">{c.duration}</td>
                                      <td className="px-6 py-4 text-sm space-x-3">
                                        <button className="text-blue-600 hover:text-blue-800"><FaEdit size={16} /></button>
                                        <button onClick={() => handleDeleteCountry(c.id)} className="text-red-600 hover:text-red-800"><FaTrash size={16} /></button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">No country packages found.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  };
                  
                  export default CountryListPage;
                  