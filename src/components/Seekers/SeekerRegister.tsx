"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSeekers, registerSeeker as regseek } from "@/api/seekersApis/services";
import { SeekersRegForm } from "@/types/formDataTypes";

const SeekerRegister = () => {
  const router = useRouter();

  const initialFormData: SeekersRegForm = {
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<SeekersRegForm>(initialFormData);
  const [errors, setErrors] = useState<Partial<SeekersRegForm>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SeekersRegForm> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.userName.trim()) newErrors.userName = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerSeeker = async () => {
    if (!validateForm()) return;

    try {
      const availableSeeker = await fetchSeekers();
      const seeker = availableSeeker.find((s: any) => s.email === formData.email);
      if (seeker) {
        setIsLoading(false);
        return;
      }
      else {
        setIsLoading(true);
        const response = await regseek(formData);
        console.log("Registered seeker:", response);
        // ✅ Optional redirect after success
        // router.push("/seeker/home");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const seekerLogin = () => {
    router.push("/seeker/seekerLogin");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Seeker Registration</h2>

      {["name", "userName", "email", "password", "confirmPassword"].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block font-medium mb-1" htmlFor={field}>
            {field === "userName"
              ? "Username"
              : field === "confirmPassword"
                ? "Confirm Password"
                : field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            id={field}
            type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
            name={field}
            value={formData[field as keyof SeekersRegForm]}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="off"
          />
          {errors?.[field as keyof SeekersRegForm] && (
            <p className="text-sm text-red-500">{errors[field as keyof SeekersRegForm]}</p>
          )}
        </div>
      ))}

      <button
        onClick={registerSeeker}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>

      <p
        onClick={seekerLogin}
        className="text-blue-600 text-center mt-4 cursor-pointer hover:underline"
      >
        Already registered? Login
      </p>
    </div>
  );
};

export default SeekerRegister;
