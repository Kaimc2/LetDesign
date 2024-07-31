import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../utils/api";
import { displayNotification } from "../../../utils/helper";
import User from "../../../types/user.types";

export const EditProfileModal = ({
  isOpen,
  user,
  onClose,
}: {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}) => {
  const { updateUser } = useContext(AuthContext);
  const [newUsername, setNewUsername] = useState(user?.name ?? "");
  const [preview, setPreview] = useState(user?.profilePicture);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState(""); // State for error message
  const fileUpload = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    const files = fileUpload.current?.files;
    if (files && files[0]) {
      setNewProfilePicture(files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setPreview(String(e.target.result));
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (newUsername.trim() === "") {
      setError("Username is required"); // Set error message if username is empty
      return;
    }

    api
      .post(
        `/profile/update/${user?.id}`,
        {
          name: newUsername,
          profile_picture: newProfilePicture,
          _method: "PUT",
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        const updatedUser = res.data.data;
        updateUser({
          name: updatedUser.name,
          profilePicture: updatedUser.profilePicture,
        });
        displayNotification("User updated successfully", "success");
        onClose();
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Failed to update user", "error");
      });
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
              src={preview ?? "/placeholder/pf.png"}
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
          <div className="w-full flex flex-col justify-start">
            <label htmlFor="username" className="text-sm mb-1 ml-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                // Clear error on input change
                setError("");
              }}
              className="border border-gray-300 p-2 rounded-md w-full mb-1"
              placeholder="Enter your username"
            />
            {/* Display error message */}
            {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 hover:border-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-accent hover:bg-accent-80 text-white px-4 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
