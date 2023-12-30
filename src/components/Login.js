import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

const Login = () => {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  return (
    <div>
      {!isAuthenticated && <button onClick={loginWithPopup}>Login</button>}
      {isAuthenticated && <button onClick={logout}>Logout</button>}
      <Profile />
    </div>
  );
};

export default Login;
