import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

export const VerificationMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-2 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 p-4">
        <div className="flex flex-col justify-center p-2 py-2 space-y-4 md:space-y-6 sm:p-4">
          <div className="flex justify-center">
            <FontAwesomeIcon icon={faEnvelopeOpenText} className="flex fa-5x" />
          </div>
          <div className="text-center">
            <p className="text-5xl text-dark-900 font-bold md:text-2xl">
              Email Confirmation
            </p>
            <div className="flex-col p-3 px-6">
              <p>
                We have sent email to <b>KimjungUn168@gmail.com</b> to confirm
                the validity of our email address. After receiving the email
                follow the link provided to complete your registration.
              </p>
            </div>
      
            <hr className="w-4/5 items-center h-px border-1 mx-auto my-2 border-gray-600" />
         
          </div>
          <div className="font-base flex justify-center">
            <p>Didn't receive any email verification ?</p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full -mt-3 bg-yellow-400 text-black active:bg-yellow-500 hover:bg-yellow-400 focus:outline-none font-medium rounded-lg text-bold px-5 py-2.5 text-center"
            >
              Resend Email Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
