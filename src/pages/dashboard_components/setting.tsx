import React, { useState } from 'react';

const Profile = () => (
  <div>
    <h2 className="text-xl mb-4">Personal Information</h2>
    <div className="p-4 border rounded-lg shadow-sm mb-4">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          {/* Add user icon here */}
        </div>
        <div>
          <p className="text-lg">PPC</p>
          <p className="text-sm text-gray-600">p1ch3ypr4k@gmail.com</p>
        </div>
        <button className="ml-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Edit</button>
      </div>
    </div>
    <h2 className="text-xl mb-4">Phone Number</h2>
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          {/* Add phone icon here */}
        </div>
        <div>
          <p className="text-lg">+855 xxx xxx x12</p>
          <p className="text-sm text-gray-600">Keep your primary phone number up-to-date</p>
        </div>
        <button className="ml-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Manage</button>
      </div>
    </div>
  </div>
);

const Security = () => (
  <div>
    <h2 className="text-xl mb-2">Password</h2>
    <p>Security content goes here...</p>
  </div>
);

export const Setting = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  return (
    <div className="p-2 pl-8 font-regular text-gray-700">
      <h1 className="text-2xl mb-3">Settings</h1>
      <div>
        <hr className="border-1 border-gray-500 mb-3" /> {/* Divider line */}
      </div>
      <div className="border rounded-md shadow shadow-zinc-300 border-gray-300"> {/* Elevated container */}
        <div className="flex px-3 pt-2"> {/* Tab container */}
          <button
            className={`px-4 py-2 mr-2 rounded-t-md ${
              activeTab === 'profile' ? 'border-b-2 border-purple-500 text-purple-700' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 rounded-t-md ${
              activeTab === 'security' ? 'border-b-2 border-purple-500 text-purple-700' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>
        <hr className="border-1 border-gray-500 opacity-50" /> {/* Faded bottom border */}
        <div className="p-3">
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'security' && <Security />}
        </div>
      </div>
    </div>
  );
};

export default Setting;
