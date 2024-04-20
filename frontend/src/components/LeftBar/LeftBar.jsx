import React, { useState, useEffect } from "react";
import "./LeftBar.css";
import { ReactComponent as LineSvg2 } from "./LineSvg2.svg";
import { Home, UserCheck, PlusSquare, User, Book, Settings, Users, Bookmark, Mail, Smile, LogOut } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import userDetailApi from "../containers/functions/user/userDetailApi";

const LeftBar = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = await userDetailApi();
      setUserData(user);
    };
    fetchData();
  }, []);

  const navigationItems = [
    { icon: <Home className="fa" />, text: "Home", path: "/Home" },
    { icon: <User className="fa" />, text: "My Profile", path: `/Profile/${userData._id}` },
    { icon: <Smile className="fa" />, text: "Update picture", path: "/set-profile-pic" },
    { icon: <Users className="fa" />, text: "My Posts", path: "/my-posts" },
    { icon: <Bookmark className="fa" />, text: "Bookmarks", path: "/Bookmarks" },
    { icon: <UserCheck className="fa" />, text: "Friend List", path: "/Friends" },
    { icon: <Smile className="fa" />, text: "Friends Suggestions", path: "/Friends-Suggestions" },
    { icon: <Book className="fa" />, text: "Sent Requests", path: "/Sent-Requests" },
    { icon: <PlusSquare className="fa" />, text: "Friend Requests", path: "/Friend-Requests" },
    { icon: <User className="fa" />, text: "Other Users", path: "/People" },
    { icon: <Settings className="fa" />, text: "Settings", path: "/Settings" },
    { icon: <Mail className="fa" />, text: "Contact", path: "/Contact" }
  ];

  const isActiveItem = (path) => location.pathname === path;

  const logout = () => {
    if (localStorage.authToken) {
      localStorage.removeItem("authToken");
    }
  };

  const navigateToPath = (path) => {
    navigate(path);
  };

  return (
    <div className="leftBar">
      <nav className="main-menu">
        <ul>
          {navigationItems.map((item, index) => (
            <li key={index} className={isActiveItem(item.path) ? "activeItem" : ""}>
              <button onClick={() => navigateToPath(item.path)}>
                {item.icon}
                <span className="nav-text">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="leftBar_svg">
          <LineSvg2 />
        </div>
        <ul className="logout">
          <li>
            <button onClick={logout}>
              <LogOut className="fa" />
              <span className="nav-text">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftBar;