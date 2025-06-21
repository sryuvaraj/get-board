"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerRecruiter as regRecruiter } from "@/api/seekersApis/services";

interface RegisterFormData {
  name: string;
}

const RecruiterRegister = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({ name: "" });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // clear error on change
  };

  const handleRegister = async () => {
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      setError("Name is required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await regRecruiter({ name: trimmedName });
      console.log("Recruiter registered:", response);

      setFormData({ name: "" });
      alert("Registered successfully!");
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
    <div className="p-4 max-w-md mx-auto space-y-4 border rounded shadow">
      <h2 className="text-xl font-semibold">Recruiter Registration</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Enter recruiter name"
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleRegister}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>

      <p onClick={navigateToLogin} className="text-blue-500 cursor-pointer">
        Go to Recruiter Login
      </p>
    </div>
  );
};

export default RecruiterRegister;
