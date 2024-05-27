import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";

export const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl text-dark-900 font-bold md:text-2xl text-center">
            Sign up
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div className="relative">
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full pl-10 p-2.5"
                placeholder="Username"
                required=""
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full pl-10 p-2.5"
                required=""
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
              />
            </div>
            <div className="relative">
              <input
                type="phonenumber"
                name="number"
                id="phoneNumber"
                placeholder="Phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full pl-10 p-2.5"
                required=""
              />
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full pl-10 p-2.5"
                required=""
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full pl-10 p-2.5"
                required=""
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-800"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black active:bg-yellow-500 hover:bg-yellow-400 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-regular text-center">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-500"
              >
                Sign in
              </a>
            </p>
            <div className="flex items-center">
              <hr className="w-full h-px bg-gray-200 border-0 dark:bg-gray-500 mr-2" />
              <span className="font-regular">Or</span>
              <hr className="w-full h-px bg-gray-200 border-0 dark:bg-gray-500 ml-2" />
            </div>
            <button
              type="button"
              className="relative w-full outline-1 justify-center bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-lg shadow py-2 px-4 inline-flex items-center"
            >
              <img
                src="/src/assets/images/GoogleLogo.svg"
                alt="Google icon"
                className="absolute left-4 w-5 h-5"
              />
              <span className="w-full text-center">Sign up with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
