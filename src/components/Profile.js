import React from "react";

const Profile = ({ user, onLogout, isOpen, onClose }) => {
  if (!isOpen) return null; // If profile modal is not open, return nothing
  console.log("got here");
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-xl max-w-3xl mx-auto shadow-lg transform transition-all scale-105">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Your Profile
        </h2>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <p className="font-semibold text-gray-700">Full Name</p>
            <p className="text-lg text-gray-900">{user.name}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="font-semibold text-gray-700">Email</p>
            <p className="text-lg text-gray-900">{user.email}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="font-semibold text-gray-700">Profile Image</p>
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onLogout}
            className="px-10 py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Close Profile Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
