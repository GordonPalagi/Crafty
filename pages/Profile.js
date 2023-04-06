import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react"



const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile">
      {console.log(currentUser)}
      <h3>welcome {currentUser.username}</h3>
      <p>Here is your token: {currentUser.token}</p>

      <p>your userID is: {currentUser.user.id}</p>
      <p>authorities list:</p>
      {currentUser.user.authorities.map((e, id) => {
        return <p key={id}>{e.name}</p>;
      })}
    </div>
  );
};

export default Profile;
