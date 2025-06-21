import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSeeker as regseek } from "@/api/seekersApis/services";

interface SeekerRegisterFormType {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SeekerRegister = () => {
  const router = useRouter();

  const initialFormData: SeekerRegisterFormType = {
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<SeekerRegisterFormType>>({});
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SeekerRegisterFormType> = {};

    if (!formData.name.trim()) newErrors.name = "Name can't be empty";
    if (!formData.userName.trim()) newErrors.userName = "Username can't be empty";
    if (!formData.email.trim()) newErrors.email = "Email can't be empty";
    if (!formData.password.trim()) newErrors.password = "Password can't be empty";
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password can't be empty";

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Password and Confirm Password should match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerSeeker = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const response = await regseek(formData);
      console.log("Registered seeker:", response);
      // redirect if needed
      // router.push('/seeker/dashboard');
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
    <div>
      <div>
        <label>
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm h-5">{errors.name ?? ""}</p>
        </label>

        <label>
          <p>Username</p>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm h-5">{errors.userName ?? ""}</p>
        </label>

        <label>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm h-5">{errors.email ?? ""}</p>
        </label>

        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm h-5">{errors.password ?? ""}</p>
        </label>

        <label>
          <p>Confirm Password</p>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm h-5">{errors.confirmPassword ?? ""}</p>
        </label>

        <button
          onClick={registerSeeker}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          {isLoading ? "Registering..." : "Register Seeker"}
        </button>
      </div>

      <p onClick={seekerLogin} className="text-blue-600 mt-4 cursor-pointer">
        Already registered? Login
      </p>
    </div>
  );
};

export default SeekerRegister;
