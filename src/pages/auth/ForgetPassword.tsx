import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { displayNotification } from "../../utils/helper";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    let newError = "";

    if (!email) {
      newError = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError = "Email address is invalid";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);

      api
        .post("auth/forgot-password", { email: email })
        .then((res) => {
          console.log(res);
          navigate("/forgot-password/notify", { state: { email: res.data.data.email } });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to send reset email", "error");
          setLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col items-center px-5 mt-16 lg:py-0">
      <div className="w-full bg-white rounded-md border border-gray-300 dark:border md:mt-0 sm:max-w-xl p-6">
        <h1 className="text-4xl text-dark-900 font-bold pt-4 pb-2 text-center">
          Forgot your Password?
        </h1>
        <p>
          Enter you email and we'll send your instructions to reset your
          password.
        </p>
        <div className="flex flex-col space-y-6 p-4">
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={`bg-gray-50 border ${
                error ? "border-error" : "border-gray-600"
              } mt-2 text-gray-900 sm:text-sm rounded-md w-full pl-10 p-2.5`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-800"
            />
            {error && (
              <p className="text-error ml-2 text-sm absolute bottom-0 left-0 mb-[-1.5rem]">
                {error}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="w-full text-white bg-secondary active:bg-secondary-80 hover:bg-secondary-80 focus:outline-none 
              font-medium rounded-md text-base px-5 py-2.5 text-center"
            >
              {loading ? (
                <ClipLoader loading={loading} size={18} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </div>

          <Link
            className="flex justify-center text-accent hover:underline"
            to={"/login"}
          >
            Go back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
