import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const loadProfile = async () => {
    const token = await getAccessTokenSilently();
    fetch("http://localhost:4000/get-profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  };
  return (
    isAuthenticated && (
      <div>
        <button onClick={loadProfile}>Get Profile from api</button>
        {profile && (
          <div>
            <br />
            <img src={profile.picture} />
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
