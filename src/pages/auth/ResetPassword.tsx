import { faKey, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { PasswordStrength } from "../../core/common/PasswordStrength";
import { Errors } from "../../types/common.types";
import {
  displayNotification,
  evaluatePasswordStrength,
} from "../../utils/helper";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";

export const ResetPassword = () => {
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const validate = () => {
    const newErrors: Errors = {};
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
      setLoading(true);
      // Submit the form
      api
        .post("auth/reset-password", {
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          token: token,
        })
        .then((res) => {
          console.log(res);
          displayNotification("Password reset successfully", "success");
          navigate("/login");
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to reset password", "error");
          setLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col justify-end items-center px-5 mt-16 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-md border border-gray-300 dark:border md:mt-0 sm:max-w-xl p-6">
        <h1 className="text-4xl text-dark-900 font-bold pt-4 pb-2 text-center">
          Reset Password
        </h1>
        <div className="p-2 space-y-4 md:space-y-6 sm:p-4">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
