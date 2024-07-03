import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { hidePhoneNumber } from "../../../utils/helper";

export const Profile = ({
  onEdit,
  onManagePhone,
  username,
  phoneNumber,
  profileImage,
}: {
  onEdit: () => void;
  onManagePhone: () => void;
  username: string;
  phoneNumber: string;
  profileImage: string;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-xl mb-4">Personal Information</h2>
      <div className="p-4 border rounded-lg shadow-sm mb-4">
        <div className="flex items-center">
          <img
            src={profileImage}
            alt="profile picture"
            className="w-16 h-16 bg-gray-200 rounded-full mr-4"
          />
          <div>
            <p className="text-lg">{user?.name || username}</p>
            <p className="text-sm text-gray-600">{user?.email || "example@example.com"}</p>
          </div>
          <button
            onClick={onEdit}
            className="ml-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            Edit
          </button>
        </div>
      </div>
      <h2 className="text-xl mb-4">Phone Number</h2>
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <FontAwesomeIcon icon={faMobileScreen} size="2x" />
          </div>
          <div>
            <p className="text-lg">{hidePhoneNumber(0 + String(user?.phoneNumber || phoneNumber))}</p>
            <p className="text-sm text-gray-600">
              Keep your primary phone number up-to-date
            </p>
          </div>
          <button
            onClick={onManagePhone}
            className="ml-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};