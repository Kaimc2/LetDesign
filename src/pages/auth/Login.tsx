import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData.email, formData.password);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-5 py-2 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 p-4">
        <h1 className="text-2xl text-dark-900 my-6 font-bold md:text-2xl text-center">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 px-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={`bg-gray-50 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } mt-2 text-gray-900 sm:text-sm rounded-lg w-full pl-10 p-2.5`}
              value={formData.email}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
            />
            {errors.email && (
              <p className="text-red-500 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } mt-2 text-gray-900 sm:text-sm rounded-lg w-full pl-10 p-2.5`}
                value={formData.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
              />
              {errors.password && (
                <p className="text-red-500 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-purple-700 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black active:bg-yellow-500 hover:bg-yellow-400 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <p>Don't have an account? <a href="#" className="text-yellow-400 hover:underline">
              Sign Up
            </a> </p>
            
          </div>
          <div className="py-2">
            <button
              type="button"
              className="relative w-full outline-1 justify-center bg-white hover:bg-yellow-300 active:bg-yellow-400 text-gray-700 font-medium rounded-lg shadow py-2 px-4 inline-flex items-center"
            >
              <img
                src="/src/assets/images/GoogleLogo.svg"
                alt="Google icon"
                className="absolute left-4 w-5 h-5"
              />
              <span className="w-full text-center">Sign up with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
