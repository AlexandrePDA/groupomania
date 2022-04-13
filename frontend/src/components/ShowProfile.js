import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";

const ShowProfile = () => {
  return (
    <div>
      <div className="showProfilInfo">
        <div className="hello">
          <h1>Profil</h1>
          <NavLink to="/edit-profile" className="edit-profile">
            <AiFillSetting />
          </NavLink>
        </div>
        <div className="picture">
            avatar
        </div>
        <div className="pseudo">
          <p>Pseudo :</p>
        </div>
        <div className="bio">
          <p>Bio :</p>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
