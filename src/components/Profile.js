import React, { useEffect, useState } from "react";
import AxiosInstance from "./Axios";

const Profile = ({ isOpen, onClose, user }) => {
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    if (isOpen && user?.email) {
      fetchUserData(user.email);
    }
  }, [isOpen, user?.email]); // Depend on modal state & user email

  const fetchUserData = async (email) => {
    try {
      console.log("Fetching user data for:", email);

      // Ensure Axios is correctly used
      const response = await AxiosInstance.get(`/userstats/`, {
        params: { email }, // ✅ Use params instead of manual string concat
      });

      console.log("✅ User Data Fetched:", response.data);
      setUserStats(response.data);
    } catch (error) {
      console.error("❌ Error fetching user data:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-lg w-full transform transition-all scale-100">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Your Profile
        </h2>

        {user && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-900">Name:</span> {user.name}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-900">Email:</span>{" "}
              {user.email}
            </p>
          </div>
        )}

        {userStats ? (
          <div className="bg-gray-200 p-6 rounded-lg shadow-inner mt-4">
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-900">Level:</span>{" "}
              {userStats.level}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-900">
                Experience Points:
              </span>{" "}
              {userStats.experience_points}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-900">
                Total Problems Completed:
              </span>{" "}
              {userStats.total_problems_completed}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <span className="font-bold text-gray-900">Average Score:</span>{" "}
              {userStats.average_score.toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-4">
            Loading user stats...
          </p>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
