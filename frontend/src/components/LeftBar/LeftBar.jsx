import React from "react";
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

const LeftBar = () => {
  const logout = () => {
    if (localStorage.authToken) {
      localStorage.removeItem("authToken");
    }
  };
  return (
    <div className="leftBar">
    <nav className="main-menu">
      <ul>
        {leftbarItems.map((item)=><li key={item.name}>
            <a href="/">
              {item.name === "Home" && <Home className="fa" />}
              {item.name === "Friends" && <UserCheck className="fa" />}
              {item.name === "Friend Requests" && <PlusSquare className="fa" />}
              {item.name === "Groups" && <Users className="fa" />}
              {item.name === "People" && <User className="fa" />}
              {item.name === "Pages" && <Book className="fa" />}
              {item.name === "Settings" && <Settings className="fa" />}
              {item.name === "Notifications" && <Bell className="fa" />}
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
