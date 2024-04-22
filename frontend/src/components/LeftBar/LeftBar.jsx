import React, { useState, useEffect } from "react";
import "./LeftBar.css";
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
    { icon: "https://cdn-icons-png.flaticon.com/512/10473/10473299.png", text: "Home", path: "/Home" },
    { icon: "https://cdn-icons-png.flaticon.com/512/15786/15786272.png", text: "My Profile", path: `/Profile/${userData._id}` },
    { icon: "https://cdn-icons-png.flaticon.com/512/7224/7224509.png", text: "Update picture", path: "/set-profile-pic" },
    { icon: "https://res.cloudinary.com/datvbo0ey/image/upload/v1713612720/social-app/3d-render-illustration-of-post-it-icon-office-material-png_dmmmfd.png", text: "My Posts", path: "/my-posts" },
    { icon: "https://cdn-icons-png.freepik.com/512/5300/5300640.png", text: "Bookmarks", path: "/Bookmarks" },
    { icon: "https://cdn-icons-png.flaticon.com/512/15430/15430330.png", text: "Friend List", path: "/Friends" },
    { icon: "https://cdn-icons-png.flaticon.com/256/5509/5509446.png", text: "Friends Suggestions", path: "/Friends-Suggestions" },
    { icon: "https://cdn-icons-png.flaticon.com/512/5509/5509730.png", text: "Sent Requests", path: "/Sent-Requests" },
    { icon: "https://cdn-icons-png.flaticon.com/512/5509/5509916.png", text: "Friend Requests", path: "/Friend-Requests" },
    { icon: "https://cdn-icons-png.flaticon.com/512/15688/15688913.png", text: "Other Users", path: "/People" },
    { icon: "https://cdn-icons-png.flaticon.com/512/2698/2698011.png", text: "Settings", path: "/Settings" },
    { icon: "https://cdn-icons-png.flaticon.com/512/786/786407.png", text: "Contact", path: "/Contact" }
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
                {/* {item.icon} */}
                <img src={item.icon} alt="leftbar icon" />
                <span className="nav-text">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className="logout">
          <li>
            <button onClick={logout}>
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828304.png" alt="logout icon" />
              <span className="nav-text">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftBar;