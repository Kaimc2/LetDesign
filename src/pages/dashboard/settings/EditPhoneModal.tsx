import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../../../context/AuthContext";

export const ManagePhoneModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");
  const [error, setError] = useState(""); // State for error message

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!/^\+?[0-9]*$/.test(phoneNumber)) {
      setError("Invalid phone number"); // Set error message if phone number is invalid
      return;
    }
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
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {/* Display error message */}
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
