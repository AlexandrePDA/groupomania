import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/icon.png";
import { BiHomeSmile } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

const Header = () => {


  return (
    <div className="header">
      <div className="header_logo">
        <img src={Logo} alt="logo Groupomania" />
        <p>Groupomania</p>
      </div>
      <p>{}</p>
      <div className="nav">
        <NavLink
          to="/"
          className={(nav) =>
            nav.isActive ? "nav-active nav_home" : "nav_home"
          }
        >
          <BiHomeSmile />
        </NavLink>
        <NavLink
          to="/Profile"
          className={(nav) =>
            nav.isActive ? "nav-active nav_profile" : "nav_profile"
          }
        >
          <CgProfile />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
