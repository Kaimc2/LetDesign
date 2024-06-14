// LoginForm.tsx
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import googleLogo from "../../assets/images/icons/GoogleLogo.svg";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void; // Make onSubmit optional
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [hide, setHide] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const status = await login(formData.email, formData.password);
      if (status) navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center px-5 mt-16 lg:py-0">
      <div className="w-full bg-white rounded-md border border-gray-300 dark:border md:mt-0 sm:max-w-xl p-6">
        <h1 className="text-4xl text-dark-900 font-bold pt-4 pb-2 text-center">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 p-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={`bg-gray-50 border ${
                errors.email ? "border-error" : "border-gray-600"
              } mt-2 text-gray-900 sm:text-sm rounded-md w-full pl-10 p-2.5`}
              value={formData.email}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
            />
            {errors.email && (
              <p className="text-error ml-2 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <input
                type={hide ? "password" : "text"}
                name="password"
                id="password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${
                  errors.password ? "border-error" : "border-gray-600"
                } mt-2 text-gray-900 sm:text-sm rounded-md w-full pl-10 p-2.5`}
                value={formData.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
              />
              {hide ? (
                <FontAwesomeIcon
                  onClick={() => setHide(false)}
                  icon={faEyeSlash}
                  className="absolute right-3 top-7 transform -translate-y-1/2 text-gray-800 hover:cursor-pointer"
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setHide(true)}
                  icon={faEye}
                  className="absolute right-3 top-7 transform -translate-y-1/2 text-gray-800 hover:cursor-pointer"
                />
              )}
              {errors.password && (
                <p className="text-error ml-2 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-accent hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full text-white bg-secondary active:bg-secondary-80 hover:bg-secondary-80 focus:outline-none 
              font-medium rounded-md text-base px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <p>
              Don't have an account?
              <a
                href="/register"
                className="ml-2 text-secondary hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
          <div className="flex items-center mt-2">
            <hr className="w-full h-px bg-gray-200 border-1 dark:bg-gray-500 mr-2" />
            <span className="font-regular">Or</span>
            <hr className="w-full h-px bg-gray-200 border-1 dark:bg-gray-500 ml-2" />
          </div>
          <button
            type="button"
            className="relative w-full outline-1 justify-center bg-white border border-gray-200 hover:bg-gray-100
            text-gray-700 font-medium rounded-md shadow-md py-2 px-4 inline-flex items-center"
          >
            <img
              src={googleLogo}
              alt="Google icon"
              className="absolute left-4 w-5 h-5"
            />
            <span className="w-full text-center">Sign in with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
