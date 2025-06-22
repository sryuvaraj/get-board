"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerRecruiter as regRecruiter } from "@/api/seekersApis/services";
import GoogleLoginButton from "../General/GoogleLoginButton";


interface RegisterFormData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RecruiterRegister = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleRegister = async () => {
    const { name, companyName, email, phone, password, confirmPassword } = formData;

    if (!name || !companyName || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await regRecruiter({
        name,
        companyName,
        email,
        phone,
        password,
      });
      console.log("Recruiter registered:", response);

      alert("Registered successfully!");
      setFormData({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push("/recruiter/recruiterLogin");
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-center">Recruiter Registration</h2>

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="companyName"
        type="text"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleRegister}
        disabled={isLoading}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>

      <p onClick={navigateToLogin} className="text-blue-500 text-center cursor-pointer">
        Already registered? Go to Login
      </p>
      <div><GoogleLoginButton /></div>
    </div>
  );
};

export default RecruiterRegister;
