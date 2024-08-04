import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import api from "../../utils/api";
import { displayNotification } from "../../utils/helper";

export const ForgetPasswordNotify = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { email } = state;

  const resendEmail = () => {
    setLoading(true);
    api
      .post(`auth/reset-password/resend`, { email: email })
      .then((res) => {
        displayNotification(res.data.message, "success");
        setLoading(false);
      })
      .catch((err) => {
        const errMessages = err.response.data.message;
        displayNotification(errMessages, "error");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center px-5 mt-16 lg:py-0">
      <div className="w-full bg-white rounded-lg border border-gray-300 dark:border md:mt-0 sm:max-w-xl p-6">
        <div className="flex flex-col justify-center p-2 py-2 space-y-4 md:space-y-6 sm:p-4">
          <div className="flex justify-center">
            <FontAwesomeIcon icon={faEnvelopeOpenText} className="flex fa-5x" />
          </div>
          <div className="text-center">
            <p className="text-2xl text-dark-900 font-bold">Check your email</p>
            <div className="flex-col p-3 px-6">
              <p>
                We just sent instructions to reset your password to{" "}
                <b>{email}</b>
              </p>
              <p>Follow the next steps in email</p>
            </div>

            <hr className="w-4/5 items-center h-px border-1 mx-auto my-2 border-gray-600" />
          </div>
          <div>
            <button
              onClick={resendEmail}
              className="w-full bg-secondary text-white hover:bg-secondary-80 focus:outline-none font-medium rounded-md
               text-bold px-5 py-2.5 text-center"
            >
              {loading ? (
                <ClipLoader loading={loading} size={18} color="white" />
              ) : (
                "Resend Email"
              )}
            </button>
          </div>
          <div className="flex justify-center text-accent hover:underline">
            <Link to={"/login"}>Go back to sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
