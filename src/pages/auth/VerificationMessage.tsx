import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { displayNotification } from "../../utils/helper";

export const VerificationMessage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const { id, email } = state;

  const resendEmail = () => {
    setLoading(true);
    api
      .post(`/auth/email/verification-notice/${id}`)
      .then((res) => {
        displayNotification(res.data.message, "success");
      })
      .catch((err) => {
        const errMessages = err.response.data.message;
        displayNotification(errMessages, "error");
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
            <p className="text-2xl text-dark-900 font-bold">
              Email Confirmation
            </p>
            <div className="flex-col p-3 px-6">
              <p>
                We have sent email to <b>{email}</b> to confirm the validity of
                our email address. After receiving the email follow the link
                provided to complete your registration.
              </p>
            </div>

            <hr className="w-4/5 items-center h-px border-1 mx-auto my-2 border-gray-600" />
          </div>
          <div className="flex justify-center">
            <p>Didn't receive any email verification ?</p>
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
                "Resend Email Confirmation"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
