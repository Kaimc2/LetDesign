import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faKey,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
// import googleLogo from "../../assets/images/icons/GoogleLogo.svg";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { Errors, FormData } from "../../types/common.types";
import { ClipLoader } from "react-spinners";
import { displayNotification, validatePhoneNumber } from "../../utils/helper";
import { AuthContext } from "../../context/AuthContext";
import { PasswordStrength } from "../../core/common/PasswordStrength";

export const Register = () => {
  const { initializeUser } = useContext(AuthContext);
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

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
    if (name === "password") {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.number) newErrors.number = "Phone number is required";
    if (!validatePhoneNumber(formData.number))
      newErrors.number = "Invalid phone number";
    if (!formData.password) newErrors.password = "Password is required";
    if (passwordStrength <= 2) newErrors.password = "Password too weak";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // Submit the form
      setLoading(true);
      await api
        .post("/auth/register", {
          name: formData.username,
          email: formData.email,
          phone_number: formData.number,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        })
        .then((res) => {
          setLoading(false);
          const userData = res.data.data;
          initializeUser(userData);
          displayNotification("Account created sucessfully", "success");
          navigate("/account/verify", {
            state: { email: formData.email, id: userData.id },
          });
        })
        .catch((err) => {
          setLoading(false);
          const errMessages = err.response.data.message;

          const newErrors: Errors = {};
          if (errMessages[0].includes("name")) {
            newErrors.username = errMessages[0];
          } else if (errMessages[0].includes("email")) {
            newErrors.email = errMessages[0];
          }
          setErrors(newErrors);
        });
    }
  };

  return (
    <div className="flex flex-col justify-end items-center px-5 mt-16 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-md border border-gray-300 dark:border md:mt-0 sm:max-w-xl p-6">
        <h1 className="text-4xl text-dark-900 font-bold pt-4 pb-2 text-center">
          Sign Up
        </h1>
        <div className="p-2 space-y-4 md:space-y-6 sm:p-4">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="username"
                id="username"
                className={`bg-white border ${
                  errors.username ? "border-error" : "border-gray-600"
                } text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 w-full pl-10 p-2.5`}
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
              />
              {errors.username && (
                <p className="text-error ml-4 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
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
                <p className="text-error ml-4 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
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
                  errors.number ? "border-error" : "border-gray-600"
                } mt-2 text-gray-900 sm:text-sm rounded-md  w-full pl-10 p-2.5`}
                value={formData.number}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
              />
              {errors.number && (
                <p className="text-error ml-4 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
                  {errors.number}
                </p>
              )}
            </div>

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
                <p className="text-error ml-4 text-sm absolute  bottom-0 left-0 mb-[-1.5rem]">
                  {errors.password}
                </p>
              )}
            </div>
            {formData.password && (
              <PasswordStrength strength={passwordStrength} />
            )}

            <div className="relative">
              <input
                type={hide ? "password" : "text"}
                name="confirmPassword"
                id="confirm-password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${
                  errors.confirmPassword ? "border-error" : "border-gray-600"
                } mt-2 text-gray-900 sm:text-sm rounded-md  w-full pl-10 p-2.5`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
              />
              {errors.confirmPassword && (
                <p className="text-error ml-4 text-sm absolute  bottom-0 left-0 mb-[-1.5rem]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full text-white bg-secondary active:bg-secondary hover:bg-secondary-80 focus:outline-none 
                font-medium rounded-md text-base px-5 py-2.5 text-center"
              >
                {loading ? (
                  <ClipLoader loading={loading} size={18} color="white" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
            <div>
              <p className="text-sm font-regular text-center">
                Already have an account?
                <Link
                  to={"/login"}
                  className="font-medium ml-1 hover:underline text-secondary"
                >
                  Sign in
                </Link>
              </p>
            </div>
            {/* <div className="flex items-center mt-2">
              <hr className="w-full h-px bg-gray-200 border-1 dark:bg-gray-500 mr-2" />
              <span className="font-regular">Or</span>
              <hr className="w-full h-px bg-gray-200 border-1 dark:bg-gray-500 ml-2" />
            </div>
            <button
              type="button"
              className="relative w-full outline-1 justify-center border border-gray-200 bg-white hover:bg-gray-100 
              text-gray-700 font-medium rounded-md shadow py-2 px-4 inline-flex items-center"
            >
              <img
                src={googleLogo}
                alt="Google icon"
                className="absolute left-4 w-5 h-5"
              />
              <span className="w-full text-center">Sign up with Google</span>
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};
