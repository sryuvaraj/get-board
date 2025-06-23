"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "@/redux/reducers/loggendInUser";
import GoogleLoginButton from "../General/GoogleLoginButton";
import { fetchRecruiters } from "@/api/seekersApis/services";

const RecruiterLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [recruiters, setRecruiters] = useState([]);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = () => {
    const { username, password } = formData;

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const matchedRecruiter:any = recruiters.find(
      (rec: any) => rec.username === username && rec.password === password
    );

    if (matchedRecruiter) {
      dispatch(setLoggedInUser({
  name: matchedRecruiter?.name,
  email: matchedRecruiter?.email,
  role: "recruiter",
  token: "abc123token",
}));
      router.push("/recruiter/home");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const navigateToRegister = () => {
    router.push("/recruiter/recruiterRegister");
  };

  const loadUsers = async () => {
    try {
      const resRecruiters = await fetchRecruiters();
      setRecruiters(resRecruiters);
      // await fetchUsers(); // Add actual implementation if needed
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div className="p-4 max-w-md mx-auto space-y-4 border rounded shadow">
      <h2 className="text-xl font-semibold">Recruiter Login</h2>

      <div>
        <label className="block mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Login
      </button>
      <div onClick={handleLogin}>
        <GoogleLoginButton recruiters={recruiters} />
      </div>

      <p
        onClick={navigateToRegister}
        className="text-blue-500 cursor-pointer text-sm text-center mt-2"
      >
        Don’t have an account? Register here
      </p>
    </div>
  );
};

export default RecruiterLogin;
