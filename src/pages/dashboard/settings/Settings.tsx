import { useContext, useState } from "react";
import { Profile } from "./Profile";
import { Security } from "./Security";
import { EditProfileModal } from "./EditProfileModal";
import { ManagePhoneModal } from "./EditPhoneModal";
import { AuthContext } from "../../../context/AuthContext";

export const Settings = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);

  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  const openPhoneModal = () => setPhoneModalOpen(true);
  const closePhoneModal = () => setPhoneModalOpen(false);

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
              />
            )}
            {/* Pass username, phoneNumber, and profileImage as props */}
            {activeTab === "security" && <Security />}
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isProfileModalOpen}
        user={user}
        onClose={closeProfileModal}
      />
      <ManagePhoneModal isOpen={isPhoneModalOpen} onClose={closePhoneModal} />
    </div>
  );
};
