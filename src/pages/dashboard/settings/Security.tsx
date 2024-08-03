import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faLock,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../context/AuthContext";
import {
  displayNotification,
  evaluatePasswordStrength,
  hidePhoneNumber,
} from "../../../utils/helper";
import api from "../../../utils/api";
import { PasswordStrength } from "../../../core/common/PasswordStrength";

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-xl mb-4">Success</h2>
        <p className="mb-4">You have successfully changed your password.</p>
        <button
          onClick={onClose}
          className="bg-accent hover:bg-accent-80 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>
    </div>
  ) : null;
};

const ChangePasswordModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (step === 1 && currentPassword) {
      api
        .post("auth/current-password", { current_password: currentPassword })
        .then(() => setStep(2))
        .catch((err) =>
          displayNotification(err.response.data.message, "error")
        );
    } else if (step === 2 && newPassword && confirmPassword) {
      if (passwordStrength <= 2) {
        setError("Password too weak");
      } else if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        setError("");
        api
          .post("auth/reset-password", {
            password: newPassword,
            password_confirmation: confirmPassword,
          })
          .then(() => {
            displayNotification("Password changed successfully", "success");
            onSuccess(); // Trigger success logic
            onClose(); // Close ChangePasswordModal
          })
          .catch((err) => {
            console.error(err);
            displayNotification("Failed to update password", "error");
          });
      }
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        {step === 1 ? (
          <>
            <h2 className="text-xl mb-4">Change Password</h2>
            <label className="block mb-2">
              Enter your current password below
            </label>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Step 1 of 2</span>
              <button
                onClick={handleNext}
                className="bg-accent hover:bg-accent-80 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl mb-4">Create New Password</h2>
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordStrength(evaluatePasswordStrength(e.target.value));
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
            />
            {newPassword && <PasswordStrength strength={passwordStrength} />}
            <label className="block mt-4 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Step 2 of 2</span>
              <button
                onClick={handleNext}
                className="bg-accent hover:bg-accent-80 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </>
        )}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>
    </div>
  ) : null;
};

export const Security: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [selectedMethod, setSelectedMethod] = useState<
    "text" | "authenticator" | null
  >("text");
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const handleSelect = (method: "text" | "authenticator") => {
    setSelectedMethod(method);
  };

  const handleRemove = () => {
    setSelectedMethod(null);
  };

  const handleChangePasswordModalOpen = () => {
    setChangePasswordModalOpen(true);
  };

  const handleChangePasswordModalClose = () => {
    setChangePasswordModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  const handleChangePasswordSuccess = () => {
    setSuccessModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl mb-2 text-gray-800">Password</h2>
      <hr className="border-1 border-gray-500 mb-3" />
      <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
        <span>
          Remember not to store your password in your email or cloud and don’t
          share it with anyone
        </span>
        <button
          onClick={handleChangePasswordModalOpen}
          className="active:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-400"
        >
          Change Password
        </button>
      </div>
      <div className="flex-1 overflow-y-auto mt-7">
        <h2 className="text-xl mb-2 text-gray-900">2-Step Verification</h2>
        <hr className="border-1 border-gray-500 mb-3" />
        <p className="text-gray-700 mb-4 ml-2">
          Select your 2-step verification methods
        </p>
        <div className="mb-6">
          <h3 className="ml-2 text-lg mb-2 text-gray-600">Current</h3>
          {selectedMethod === null ? (
            <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-800 font-semibold">
                  No method is selected
                </p>
                <p className="text-gray-600">
                  Please select one to secure your account
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center mb-4">
              {selectedMethod === "text" && (
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faMobileAlt}
                    className="text-2xl text-gray-700 mr-3"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Text Message</p>
                    <p className="text-gray-600">
                      Phone Number:
                      {hidePhoneNumber(0 + String(user?.phoneNumber))}
                    </p>
                  </div>
                </div>
              )}
              {selectedMethod === "authenticator" && (
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-2xl text-gray-700 mr-3"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">Authenticator</p>
                    <p className="text-gray-600">
                      Install an authenticator app on your phone
                    </p>
                  </div>
                </div>
              )}
              <button
                onClick={handleRemove}
                className="active:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-400"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className="ml-2 text-lg mb-2 text-gray-600">Other Options</h3>
          {selectedMethod !== "text" && (
            <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center mb-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faMobileAlt}
                  className="text-2xl text-gray-700 mr-3"
                />
                <div>
                  <p className="text-gray-800 font-semibold">Text Message</p>
                  <p className="text-gray-600">Phone Number: +855xxxxxxxxx</p>
                </div>
              </div>
              <button
                onClick={() => handleSelect("text")}
                className="active:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-400"
              >
                Select
              </button>
            </div>
          )}
          {selectedMethod !== "authenticator" && (
            <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-2xl text-gray-700 mr-3"
                />
                <div>
                  <p className="text-gray-800 font-semibold">Authenticator</p>
                  <p className="text-gray-600">
                    Install an authenticator app on your phone
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleSelect("authenticator")}
                className="active:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-400"
              >
                Select
              </button>
            </div>
          )}
        </div>
      </div>
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={handleChangePasswordModalClose}
          onSuccess={handleChangePasswordSuccess}
        />
      )}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
      />
    </div>
  );
};
