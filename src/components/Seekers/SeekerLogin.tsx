"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsSeeker } from "@/redux/reducers/isSeeker";
import GoogleLoginButton from "../General/GoogleLoginButton";
import { fetchSeekers } from "@/api/seekersApis/services"; // 👈 adjust path if needed
import { User } from "@/types/type";

interface LoginFormType {
  email: string;
  password: string;
}

const SeekerLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const loginSeeker = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setIsLoading(true);

    try {
      const seekers = await fetchSeekers();

      const matchedSeeker = seekers?.find(
        (seeker: User) => seeker.email === email && seeker.password === password
      );

      if (matchedSeeker) {
        dispatch(setIsSeeker(true));
        router.push("/seeker/home");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/seeker/seekerRegister");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Seeker Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <button
          onClick={loginSeeker}
          disabled={isLoading}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p
          onClick={handleRegisterRedirect}
          className="text-center mt-4 text-blue-500 hover:underline cursor-pointer"
        >
          New user? Register here
        </p>

        <div className="mt-6">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default SeekerLogin;
