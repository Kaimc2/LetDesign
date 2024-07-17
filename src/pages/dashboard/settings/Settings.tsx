import { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Profile } from "./Profile";
import { Security } from "./Security";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const ManagePhoneModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (phoneNumber: string) => void;
}) => {
  const [phoneNumber, setPhoneNumber] = useState("+855 xxx xxx xxx");
  const [error, setError] = useState(""); // State for error message

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!/^\+?[0-9]*$/.test(phoneNumber)) {
      setError("Invalid phone number"); // Set error message if phone number is invalid
      return;
    }
    onConfirm(phoneNumber);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Manage Phone Number</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="flex flex-col items-center my-4">
          <label htmlFor="phoneNumber" className="text-sm mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setError("");
            }} // Clear error on input change
            className="border p-2 rounded w-full mb-1"
            placeholder="Enter your phone number"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}{" "}
          {/* Display error message */}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-accent hover:bg-accent-80 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const EditProfileModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (username: string, profileImage: string) => void;
}) => {
  const [username, setUsername] = useState("Your name");
  const [profileImage, setProfileImage] = useState("/placeholder/pf.png");
  const [error, setError] = useState(""); // State for error message
  const fileUpload = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    const files = fileUpload.current?.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (username.trim() === "") {
      setError("Username is required"); // Set error message if username is empty
      return;
    }
    onConfirm(username, profileImage);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Edit Personal Information</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="flex flex-col items-center my-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full relative mb-4">
            <img
              src={profileImage}
              alt="profile"
              className="w-24 h-24 rounded-full"
            />
            <button
              onClick={() => fileUpload.current?.click()}
              title="Upload Picture"
              className="absolute bottom-0 right-0 bg-gray-300 p-1 rounded-full"
            >
              <input
                className="hidden"
                type="file"
                accept="image/*"
                ref={fileUpload}
                onChange={handleUpload}
                name="upload"
                id="upload"
              />
              <FontAwesomeIcon icon={faUpload} size="xl" />
            </button>
          </div>
          <label htmlFor="username" className="text-sm mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }} // Clear error on input change
            className="border p-2 rounded w-full mb-1"
            placeholder="Enter your username"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}{" "}
          {/* Display error message */}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-accent hover:bg-accent-80 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [username, setUsername] = useState("PPC");
  const [phoneNumber, setPhoneNumber] = useState("+855 xxx xxx x12");
  const [profileImage, setProfileImage] = useState("/placeholder/pf.png");

  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  const openPhoneModal = () => setPhoneModalOpen(true);
  const closePhoneModal = () => setPhoneModalOpen(false);

  const handleProfileConfirm = (
    newUsername: string,
    newProfileImage: string
  ) => {
    setUsername(newUsername);
    setProfileImage(newProfileImage);
  };

  const handlePhoneConfirm = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
  };

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Settings</h1>
      </div>

      <div className="p-8">
        <div className="overflow-y-auto pb-8 border rounded-md shadow shadow-zinc-300 border-gray-300">
          {/* Elevated container */}
          <div className=" flex px-3 pt-2">
            {/* Tab container */}
            <button
              className={`px-4 py-2 mr-2 rounded-t-md ${
                activeTab === "profile"
                  ? "border-b-2 border-accent text-accent-80"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-4 py-2 rounded-t-md ${
                activeTab === "security"
                  ? "border-b-2 border-accent text-accent-80"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>
          <hr className="border-1  border-gray-500 opacity-50" />
          {/* Faded bottom border */}
          <div className="p-3 max-h-[500px]">
            {activeTab === "profile" && (
              <Profile
                onEdit={openProfileModal}
                onManagePhone={openPhoneModal}
                username={username}
                phoneNumber={phoneNumber}
                profileImage={profileImage}
              />
            )}
            {/* Pass username, phoneNumber, and profileImage as props */}
            {activeTab === "security" && <Security />}
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        onConfirm={handleProfileConfirm}
      />
      <ManagePhoneModal
        isOpen={isPhoneModalOpen}
        onClose={closePhoneModal}
        onConfirm={handlePhoneConfirm}
      />
    </div>
  );
};
