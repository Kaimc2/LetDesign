import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { hidePhoneNumber } from "../../../utils/helper";

export const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-2xl mt-2 mb-4">Personal Information</h2>
      <div className="w-full mb-4 h-[1px] bg-brand-gray"></div>
      <div className="p-4 border border-gray-300 rounded-lg shadow-sm mb-4">
        <div className="flex items-center">
          <img
            src="/placeholder/pf.png"
            alt="profile_picture"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="text-lg">{user?.name}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          <button className="ml-auto bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">
            Edit
          </button>
        </div>
      </div>

      <h2 className="text-2xl mt-6 mb-4">Phone Number</h2>
      <div className="w-full mb-4 h-[1px] bg-brand-gray"></div>
      <div className="p-4 border border-gray-400 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="ml-3 mr-6">
            <FontAwesomeIcon icon={faMobileScreen} size="3x" />
          </div>
          <div>
            <p className="text-lg">
              {hidePhoneNumber(0 + String(user?.phoneNumber))}
            </p>
            <p className="text-sm text-gray-600">
              Keep your primary phone number up-to-date
            </p>
          </div>
          <button className="ml-auto bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};
