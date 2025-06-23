"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "@/redux/reducers/loggendInUser";
import { registerRecruiter as regRecruiter } from "@/api/seekersApis/services";

interface GoogleLoginButtonProps {
  recruiters?: Array<{ email: string }>;
}

const GoogleLoginButton = ({ recruiters = [] }: GoogleLoginButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [newUser, setNewUser] = useState<any>(null);
  const [formError, setFormError] = useState("");

  const handleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const user: any = jwtDecode(token);

    const isExist = recruiters.find((rec) => rec?.email === user?.email);

    const userPayload = {
      name: `${user?.given_name || ""} ${user?.family_name || ""}`.trim(),
      email: user?.email,
      role: "recruiter",
      token: token,
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

    try {
      await regRecruiter({
        name: newUser.name,
        email: newUser.email,
        companyName,
        phone,
        password: "google-auth", // or generate random
      });

      dispatch(setLoggedInUser(newUser));
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
