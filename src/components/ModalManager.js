import { useState } from "react";
import HowItWorksModal from "./HowItWorksModal";
import WhyUsModal from "./WhyUsModal";
import Profile from "./Profile";
import Login from "./Login";

const ModalManager = ({ user, isLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWhyUsOpen, setWhyUs] = useState(false);
  const [isProfileOpen, setProfile] = useState(false);

  return (
    <>
      <div className="flex justify-center bg-blue-100 p-2 rounded-lg shadow-md space-x-2">
        {/* Login or View Profile Button */}
        {!isLoggedIn ? (
          <Login />
        ) : (
          <button
            onClick={() => setProfile(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-xl hover:bg-blue-600 transform hover:scale-105 transition duration-300"
          >
            View Profile
          </button>
        )}

        {/* How It Works Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-xl hover:bg-blue-600 transform hover:scale-105 transition duration-300"
        >
          How It Works
        </button>

        {/* Why Us / About Us Button */}
        <button
          onClick={() => setWhyUs(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-xl hover:bg-blue-600 transform hover:scale-105 transition duration-300"
        >
          Why Us?
        </button>
      </div>

      {/* Modals */}
      {isProfileOpen && (
        <Profile
          user={user}
          isOpen={isProfileOpen}
          onClose={() => setProfile(false)}
        />
      )}
      {isModalOpen && (
        <HowItWorksModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isWhyUsOpen && (
        <WhyUsModal isOpen={isWhyUsOpen} onClose={() => setWhyUs(false)} />
      )}
    </>
  );
};

export default ModalManager;
