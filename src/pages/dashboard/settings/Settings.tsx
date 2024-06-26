import { useState } from "react";
import { Profile } from "./Profile";
import { Security } from "./Security";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Settings</h1>
      </div>

      <div className="p-8">
        <div className="border rounded-md shadow shadow-zinc-300 border-gray-300">
          {/* Elevated container */}
          <div className="flex px-3 pt-2">
            {/* Tab container */}
            <button
              className={`px-4 py-2 mr-2 rounded-t-md ${
                activeTab === "profile"
                  ? "border-b-2 border-purple-500 text-purple-700"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-4 py-2 rounded-t-md ${
                activeTab === "security"
                  ? "border-b-2 border-purple-500 text-purple-700"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
          </div>
          <hr className="border-1 border-gray-500 opacity-50" />{" "}
          {/* Faded bottom border */}
          <div className="p-4">
            {activeTab === "profile" && <Profile />}
            {activeTab === "security" && <Security />}
          </div>
        </div>
      </div>
    </div>
  );
};
