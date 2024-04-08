import React, { useState, useEffect } from "react";
import "./LeftBar.css";
import { ReactComponent as LineSvg2 } from "./LineSvg2.svg";
import {
  Home,
  UserCheck,
  PlusSquare,
  User,
  Book,
  Settings,
  Bell,
  Users,
  Bookmark,
  Mail,
  Smile,
  LogOut,
} from "react-feather";
import { leftbarItems } from "./LeftbarItems";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userDetailApi from "../containers/functions/user/userDetailApi";

const LeftBar = () => {
  const [userData, setUserData] = useState({})

  // Logout
  const logout = () => {
    if (localStorage.authToken) {
      localStorage.removeItem("authToken");
    }
  };

  // navigateToPath on click on items on left bar
  const navigate = useNavigate();
  const location = useLocation();
  
  const [newPath, setNewPath] = useState('');
  const navigateToPath = (path) => {
    // Clear previous path
    const currentPath = location.pathname;
    let updatedPath = '';
    // Navigate to the new path
    if (path === "My Posts") {
      updatedPath = "/my-posts";
    } else if (path === "Profile") {
      updatedPath = `/Profile/${userData._id}`;
    } else {
      updatedPath = `/${path}`;
    }
    setNewPath(updatedPath);
  };

  useEffect(() => {
    // Getting user detail
    const userDetail = async ()=>{
      const user = await userDetailApi();
      setUserData(user);
    }
    userDetail();

    // Navigating
    if (newPath !== '') {
      window.history.replaceState(null, '', newPath);
      navigate(newPath);
    }
  }, [newPath]);

  return (
    <div className="leftBar">
    <nav className="main-menu">
      <ul>
        {leftbarItems.map((item)=><li key={item.name}>
            <a onClick={()=> navigateToPath(item.name)}>
              {item.name === "Home" && <Home className="fa" />}
              {item.name === "Friends" && <UserCheck className="fa" />}
              {item.name === "Friends Suggestions" && <Smile className="fa" />}
              {item.name === "Friend Requests" && <PlusSquare className="fa" />}
              {item.name === "My Posts" && <Users className="fa" />}
              {item.name === "People" && <User className="fa" />}
              {item.name === "Profile" && <User className="fa" />}
              {item.name === "Settings" && <Settings className="fa" />}
              {item.name === "Sent Requests" && <Book className="fa" />}
              {item.name === "Bookmarks" && <Bookmark className="fa" />}
              {item.name === "Feedback" && <Smile className="fa" />}
              {item.name === "Contact" && <Mail className="fa" />}
              <span className="nav-text">{item.name}</span>
            </a>
          </li>
        )}
      </ul>
      <div className="leftBar_svg">
      <LineSvg2/>
      </div>
      <ul className="logout">
        <li>
          <a href="/" onClick={logout}>
            <LogOut className="fa" />
            <span className="nav-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default LeftBar;
