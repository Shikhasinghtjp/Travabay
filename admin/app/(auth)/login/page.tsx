"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Correctly targets the dedicated Admin API route
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Login failed. Check your credentials.");
        setLoading(false);
        return;
      } // Option A: If backend returns token -> store it

      if (data.token) {
        localStorage.setItem("adminToken", data.token); // Renamed token key for clarity
        localStorage.setItem("adminUser", JSON.stringify(data.user));
      } // Redirect to the dashboard route

      router.replace("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {" "}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-[380px]">
        {" "}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        {" "}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}
        {" "}
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
           <FaEnvelope className="text-gray-400 mr-2" />
           {" "}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
              required
            />
            {" "}
          </div>
          {" "}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
               <FaLock className="text-gray-400 mr-2" />
              {" "}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
              required
            />
            {" "}
          </div>
          {" "}
          <div className="flex items-center justify-between text-sm">
              {" "}
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
               Forgot Password?   {" "}
            </a>
            {" "}
          </div>
          {" "}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-60"
          >
               {loading ? "Logging in..." : "Login"}{" "}
          </button>
          {" "}
        </form>
        {" "}
        <p className="text-xs text-gray-500 text-center mt-4">
          © 2025 Travabay Admin Panel
        </p>
        {" "}
      </div>
         {" "}
    </div>
  );
}
