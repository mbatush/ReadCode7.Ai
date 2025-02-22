import React, { useState } from "react";
import { GoogleLogin } from "@leecheuk/react-google-login";
import AxiosInstance from "./Axios";

const clientId =
  "539258541805-jej97k38n6vrcepvvgpo5fqj1ii1v7pp.apps.googleusercontent.com";

export default function Login({ updateUser }) {
  const [user, setUser] = useState(null);

  // Handle login success
  const onSuccess = async (res) => {
    console.log("Login success, the current user is ", res.profileObj);
    setUser(res.profileObj);
    updateUser(res.profileObj);

    // ✅ Send user data to Django to create the user
    try {
      const response = await AxiosInstance.post(
        "userstats/create_or_update_user/",
        {
          email: res.profileObj.email,
          name: res.profileObj.name,
        }
      );
      console.log("User successfully created or found:", response.data);
    } catch (error) {
      console.error("Error creating user in Django:", error.message);
    }
  };

  // Handle login failure
  const onFailure = (res) => {
    console.log("Login failed", res);
  };

  return (
    <div>
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
