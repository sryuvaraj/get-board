import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";

const GoogleLoginButton = () => {
  const handleSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token);
    console.log("Google User:", user);
    // Save user to Redux/localStorage/backend here
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
  );
};

export default GoogleLoginButton;
