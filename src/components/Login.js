import React, { useState } from "react";
import { GoogleLogin } from "@leecheuk/react-google-login";

const clientId =
  "539258541805-jej97k38n6vrcepvvgpo5fqj1ii1v7pp.apps.googleusercontent.com";

export default function Login({ updateUser }) {
  const [user, setUser] = useState(null); // Manage user state

  // Handle login success
  const onSuccess = (res) => {
    console.log("Login success, the current user is ", res.profileObj);
    setUser(res.profileObj); // Set the user state
    updateUser(res.profileObj); // Call updateUser with the logged-in user data
  };

  // Handle login failure
  const onFailure = (res) => {
    console.log("Login failed", res);
  };

  return (
    <div>
      {/* Custom styled Google Login Button */}
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-xl hover:bg-blue-600 transform hover:scale-105 transition duration-300 mr-1"
          >
            Sign in
          </button>
        )}
      />
    </div>
  );
}
