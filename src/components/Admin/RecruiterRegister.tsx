"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerRecruiter as regRecruiter } from "@/api/seekersApis/services";
import GoogleLoginButton from "../General/GoogleLoginButton";
import { RecruitersRegForm } from "@/types/formDataTypes";

const RecruiterRegister = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RecruitersRegForm>({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      await regRecruiter(formData);
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
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    router.push("/recruiter/recruiterLogin");
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Recruiter Registration</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleRegister}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>

      <p
        onClick={goToLogin}
        className="text-blue-600 text-center cursor-pointer"
      >
        Already registered? Login
      </p>

      <div className="text-center pt-4 border-t">
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default RecruiterRegister;
