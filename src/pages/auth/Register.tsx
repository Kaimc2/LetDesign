import { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

interface FormData {
  username: string;
  email: string;
  number: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username?: string;
  email?: string;
  number?: string;
  password?: string;
  confirmPassword?: string;
}

export const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.number) newErrors.number = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data:", formData);
      // Submit the form
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-5 py-2 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 p-4">
        <div className="p-2 space-y-4 md:space-y-6 sm:p-4">
          <h1 className="text-2xl text-dark-900 font-bold md:text-2xl text-center">
            Sign up
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="username"
                id="username"
                className={`bg-white border ${
                  errors.username ? "border-red-500" : "border-gray-600"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full pl-10 p-2.5`}
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
              />
              {errors.username && (
                <p className="text-red-500 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
                  {errors.username}
                </p>
              )}
            </div>
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
            <div className="relative">
              <input
                type="text"
                name="number"
                id="phoneNumber"
                placeholder="Phone"
                className={`bg-gray-50 border ${
                  errors.number ? "border-red-500" : "border-gray-600"
                } mt-2 text-gray-900 sm:text-sm rounded-lg  w-full pl-10 p-2.5`}
                value={formData.number}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
              />
              {errors.number && (
                <p className="text-red-500 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
                  {errors.number}
                </p>
              )}
            </div>
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
                <p className="text-red-500 text-sm absolute  bottom-0 left-0 mb-[-1.5rem]">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-600"
                } mt-2 text-gray-900 sm:text-sm rounded-lg  w-full pl-10 p-2.5`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm absolute  bottom-0 left-0 mb-[-1.5rem]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black active:bg-yellow-500 hover:bg-yellow-400 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            </div>
            <div className="">
            <p className="text-sm font-regular text-center">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-yellow-400"
              >
                Sign in
              </a>
            </p>
            </div>
            <div className="flex items-center mt-2">
              <hr className="w-full h-px bg-gray-200 border-1 dark:bg-gray-500 mr-2" />
              <span className="font-regular">Or</span>
              <hr className="w-full h-px bg-gray-200 border-1 dark:bg-gray-500 ml-2" />
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
    </div>
  );
};