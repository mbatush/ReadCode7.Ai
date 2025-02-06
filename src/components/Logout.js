import { GoogleLogout } from "@leecheuk/react-google-login";

const clientId =
  "539258541805-jej97k38n6vrcepvvgpo5fqj1ii1v7pp.apps.googleusercontent.com";

export default function Logout() {
  const onSuccess = (res) => {
    console.log("User successfully logged out");
  };

  return (
    <div id="signOutButton">
      {/* Correct use of GoogleLogout component */}
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onSuccess={onSuccess} // Directly referencing the function
      />
    </div>
  );
}
