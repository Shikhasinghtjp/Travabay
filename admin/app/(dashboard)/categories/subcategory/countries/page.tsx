"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

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
  file?: File;
  path: string;
}

const CountryListPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🏆 EDITING STATE
  const [isEditing, setIsEditing] = useState(false);
  const [editingCountryId, setEditingCountryId] = useState<number | null>(null);

  // Form state
  const [package_name, setPackageName] = useState("");
  const [category_id, setCategoryId] = useState<number>(0);
  const [subcategory_id, setSubcategoryId] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [about, setAbout] = useState("");
  // 'files' state now holds existing file metadata in edit mode
  const [files, setFiles] = useState<FileMeta[]>([]);

  // ----------------------------------------------------
  // 🏆 NEW/MODIFIED: Form and Edit Logic
  // ----------------------------------------------------

  const resetForm = () => {
    setPackageName("");
    setCategoryId(0);
    setSubcategoryId(0);
    setLocation("");
    setPrice("");
    setDate("");
    setDuration("");
    setAbout("");
    setFiles([]);
    setIsEditing(false);
    setEditingCountryId(null);
    setShowForm(false);
  };

  const handleEdit = (country: Country) => {
    setPackageName(country.package_name);
    setCategoryId(country.category_id);
    setSubcategoryId(country.subcategory_id);
    setLocation(country.location);
    // Note: price might be stored as a string, ensure it's loaded correctly
    setPrice(String(country.price)); 
    setDuration(country.duration);
    setAbout(country.about);
    
    // Set date field correctly (if stored as a full timestamp, you might need reformatting)
    setDate(country.date.split('T')[0]); 

    // Set existing file metadata. These are files already saved to the server.
    if (Array.isArray(country.files)) {
      setFiles(country.files);
    } else {
      setFiles([]);
    }

    setEditingCountryId(country.id);
    setIsEditing(true);
    setShowForm(true);
  };

  // ----------------------------------------------------
  // 🏆 MODIFIED: Fetching Logic
  // ----------------------------------------------------

  // Fetch categories (unchanged)
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

  // Fetch subcategories (unchanged)
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

  // Fetch countries (parsing logic implemented)
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/countries");
      if (!res.ok) throw new Error("Failed to fetch countries");

      const data = await res.json();

      const parsedData: Country[] = data.map((country: any) => {
        let parsedFiles: FileMeta[] = [];

        if (country.files && typeof country.files === 'string') {
          try {
            parsedFiles = JSON.parse(country.files);
          } catch (e) {
            console.error("Failed to parse files JSON:", e, country.files);
            parsedFiles = [];
          }
        } else if (Array.isArray(country.files)) {
          parsedFiles = country.files as FileMeta[];
        }

        return {
          ...country,
          category_id: Number(country.category_id),
          subcategory_id: Number(country.subcategory_id),
          files: parsedFiles,
        } as Country;
      });

      setCountries(parsedData);
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

  // ----------------------------------------------------
  // 🏆 MODIFIED: File Change Handler
  // ----------------------------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFilesWithMeta: FileMeta[] = selectedFiles.map((file) => {
      const meta: FileMeta = {
        name: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        file,
        path: '',
      };

      if (file.type.startsWith("image/")) {
        if (typeof window !== 'undefined') {
            const img = new (window as any).Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
              meta.dimensions = `${img.width}x${img.height}`;
              setFiles((prev) => [...prev]);
            };
        }
      }

      return meta;
    });

    // In edit mode, new files are appended to the existing list.
    // In add mode, new files replace the old selection (which is correct behavior for the form).
    setFiles((prevFiles) => isEditing ? [...prevFiles.filter(f => !f.file), ...newFilesWithMeta] : newFilesWithMeta);
  };


  // ----------------------------------------------------
  // 🏆 NEW: Update Controller Logic
  // ----------------------------------------------------
  const handleUpdateCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCountryId) return;

    if (!package_name || !category_id || !subcategory_id || !location || !price || !date || !duration) {
      return alert("All required fields must be filled!");
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("package_name", package_name);
      formData.append("category_id", category_id.toString());
      formData.append("subcategory_id", subcategory_id.toString());
      formData.append("location", location);
      formData.append("price", price);
      formData.append("date", date);
      formData.append("duration", duration);
      formData.append("about", about);

      const existingFilesMetadata = files.filter(f => !f.file);
      const newFilesToUpload = files.filter(f => f.file);
       // 1. Append NEW files (to be processed by Multer)
       newFilesToUpload.forEach((fileMeta) => {
        if (fileMeta.file) {
            // Multer processes the File object
            formData.append("files", fileMeta.file);
        }
    });
     // 2. 🏆 CRITICAL FIX: Append EXISTING files metadata as a JSON string
        // The backend will read this to know which files to KEEP.
        formData.append("existing_files_data", JSON.stringify(existingFilesMetadata));
    


      const res = await fetch(`http://localhost:5000/api/admin/countries/${editingCountryId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update country package");

      alert("Package updated successfully!");
      resetForm();
      fetchCountries();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // 🏆 EXISTING: Add Controller Logic (Slightly Cleaned)
  // ----------------------------------------------------
  const handleAddCountry = async (e: React.FormEvent) => {
    // e.preventDefault() is handled by handleSubmit
    if (!package_name || !category_id || !subcategory_id || !location || !price || !date || !duration) {
      return alert("All fields are required!");
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("package_name", package_name);
      formData.append("category_id", category_id.toString());
      formData.append("subcategory_id", subcategory_id.toString());
      formData.append("location", location);
      formData.append("price", price);
      formData.append("date", date);
      formData.append("duration", duration);
      formData.append("about", about);

      files.forEach((fileMeta) => {
        if (fileMeta.file) {
          formData.append("files", fileMeta.file);
        }
      });

      const res = await fetch("http://localhost:5000/api/admin/countries", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add country");

      resetForm();
      fetchCountries();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // 🏆 MODIFIED: Combined Submit Handler
  // ----------------------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdateCountry(e);
    } else {
      handleAddCountry(e);
    }
  };
  
  // handleDeleteCountry (unchanged)
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
    // ... loading UI
  }
  if (error) {
    // ... error UI
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6">
      {/* Breadcrumb (Modified for Edit mode) */}
      <nav className="text-gray-500 text-sm mb-4">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <span className="text-gray-700">Country Packages</span> /{" "}
        {showForm && <span className="text-gray-700">{isEditing ? "Edit Package" : "New Package"}</span>}
      </nav>

      {/* Page Header (Modified to set editing=false when opening Add Form) */}
      <div className="flex justify-between items-center border-b-2 pb-2 border-gray-200 mb-6">
        <h2 className="text-4xl font-extrabold text-green-700">Country Packages Management</h2>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setIsEditing(false); // Ensure Add mode is selected
              setEditingCountryId(null);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            <FaPlus size={16} />
            <span className="hidden sm:inline">Add New Package</span>
          </button>
        )}
      </div>

      {/* Form (Conditional content for Add/Edit) */}
      {showForm && (
        <form
          // 🏆 MODIFIED: Use combined handleSubmit function
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-xl space-y-6 w-full max-w-5xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {isEditing ? `Edit Package: ${package_name}` : "Add New Package"}
          </h3>
          
          {/* ----- INPUT FIELDS (VALUE BINDING ensures data is loaded) ----- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Package Name</label>
              <input
                value={package_name}
                onChange={(e) => setPackageName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>
            {/* ... (Category, Subcategory, Location, Price, Date, Duration inputs are assumed to be here and use the state values) ... */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category_id}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              >
                <option value={0}>-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.category}</option>
                ))}
              </select>
            </div>
            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select
                value={subcategory_id}
                onChange={(e) => setSubcategoryId(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              >
                <option value={0}>-- Select Subcategory --</option>
                {subcategories
                  .filter((s) => s.category_id === category_id)
                  .map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.subcategory}</option>
                  ))}
              </select>
            </div>
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900"
                required
              />
            </div>
            {/* Price */}
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
            {/* Date */}
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
            {/* Duration */}
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
          
          {/* File Upload / Preview Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">{isEditing ? "Upload NEW Images (Existing files remain unless manually deleted)" : "Images / Videos"}</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-gray-700"
            />

            {/* Displaying existing and newly selected files */}
            {files.length > 0 && (
              <div className="mt-2 space-y-2">
                <p className="font-semibold text-sm text-gray-800">
                    {isEditing ? "Current/New Files:" : "Selected Files:"}
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {files.map((fileMeta, index) => (
                    <li key={fileMeta.path || index} className="border-l-4 pl-2" style={{ borderColor: fileMeta.file ? '#10B981' : '#9CA3AF' }}>
                      <span className={`font-semibold ${fileMeta.file ? 'text-green-600' : 'text-gray-500'}`}>
                          {fileMeta.file ? "[NEW] " : "[EXISTING] "}
                      </span>
                      {fileMeta.name} - {fileMeta.size} {fileMeta.dimensions && `- ${fileMeta.dimensions}px`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : isEditing ? "Update Package" : "Save Package"}
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
      )}

      {/* Countries Table (Modified to include the Edit Button) */}
      {!showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Package Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase">Image</th>
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
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {c.files.length > 0 && c.files[0].type.startsWith('image/') ? (
                        <Image
                          src={`http://localhost:5000/${c.files[0].path}`}
                          alt={c.files[0].name}
                          width={48} // Changed to 48 to match w-12/h-12 (48px)
                          height={48} // Changed to 48 to match w-12/h-12 (48px)
                          className="w-12 h-12 object-cover rounded shadow cursor-pointer"
                          onClick={() => window.open(`http://localhost:5000/${c.files[0].path}`, '_blank')}
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getCategoryName(c.category_id)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getSubcategoryName(c.subcategory_id)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{c.duration}</td>
                    <td className="px-6 py-4 text-sm space-x-3">
                      <button
                          onClick={() => handleEdit(c)} // 🏆 ADDED: Call handleEdit
                          className="text-blue-600 hover:text-blue-800"
                      >
                          <FaEdit size={16} />
                      </button>
                      <button onClick={() => handleDeleteCountry(c.id)} className="text-red-600 hover:text-red-800">
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-6 py-8 text-center text-gray-500">No country packages found.</td>
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