"use client";

import { useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "@/redux/reducers/loggendInUser";
import { registerRecruiter as regRecruiter } from "@/api/seekersApis/services";
import { User } from "@/types/type";

interface GoogleLoginButtonProps {
  recruiters?: Array<{ email: string }>;
}

interface DecodedGoogleUser {
  email: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

const GoogleLoginButton = ({ recruiters = [] }: GoogleLoginButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [newUser, setNewUser] = useState<User | null>(null);
  const [formError, setFormError] = useState("");

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("Missing Google Credential");
      return;
    }

    const decoded: DecodedGoogleUser = jwtDecode(credentialResponse.credential);

    const isExist = recruiters.find((rec) => rec.email === decoded.email);

    const userPayload: User = {
      name: `${decoded.given_name || ""} ${decoded.family_name || ""}`.trim(),
      email: decoded.email,
      companyName: "", // Will be collected if new user
      phone: "",       // Will be collected if new user
      password: "google-auth", // or any dummy password
      isSeeker: false,
    };

    if (isExist) {
      dispatch(setLoggedInUser(userPayload));
      router.push("/recruiter/home");
    } else {
      setNewUser(userPayload);
      setShowModal(true);
    }
  };

  const handleRegister = async () => {
    if (!companyName.trim() || !phone.trim()) {
      setFormError("Both fields are required.");
      return;
    }

    if (!newUser) return;

    try {
      await regRecruiter({
        name: newUser.name,
        email: newUser.email,
        companyName,
        phone,
        password: "google-auth",
      });

      dispatch(setLoggedInUser({
        ...newUser,
        companyName,
        phone,
      }));
      router.push("/recruiter/home");
    } catch (error) {
      console.error("Google user registration failed", error);
      setFormError("Registration failed. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex text-black items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>

            {formError && (
              <p className="text-red-600 text-sm mb-3">{formError}</p>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setFormError("");
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., Google Inc."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFormError("");
                }}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., 9876543210"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleLoginButton;
