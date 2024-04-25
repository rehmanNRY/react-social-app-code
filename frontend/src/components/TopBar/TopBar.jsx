import React, { useState, useEffect, useRef } from "react";
import "./TopBar.css";
import { Link, useNavigate } from "react-router-dom";
import getUserDetail from "../containers/functions/user/userDetailApi";
import getAllUsersApi from "../containers/functions/user/getAllUsersApi";
import { X } from "react-feather";

const TopBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([])

  const buttonRef = useRef(null);

  // navigateToPath on click on item
  const navigate = useNavigate();
  
  const [newPath, setNewPath] = useState('');
  const navigateToPath = (path) => {
    // Navigate to the new path
    setNewPath(`/${path}`);
  };


  function addClassToBody(className) {
    document.body.classList.add(className);
  }
  function removeClassFromBody(className) {
    document.body.classList.remove(className);
  }
  function toggleClassOnBody(className) {
    if (document.body.classList.contains(className)) {
      removeClassFromBody(className);
    } else {
      addClassToBody(className);
    }
  }

  useEffect(() => {
    const maxWidth = 900;
    const className = 'leftbar_minimize';
    if (window.innerWidth <= maxWidth) {
      addClassToBody(className);
    } else {
      removeClassFromBody(className);
    }

    // Getting user detail
    const userDetail = async () => {
      const user = await getUserDetail();
      setUserData(user);
      // setUserId(user._id);
    };
    userDetail();

    // Getting alluser
    const getAllusers = async () => {
      const allUsers = await getAllUsersApi();
      setUsers(allUsers);
    }
    getAllusers();

    // Navigating
    if (newPath !== '') {
      window.history.replaceState(null, '', newPath);
      navigate(newPath);
    }

    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
        removeClassFromBody('searchBar_open');
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

    // eslint-disable-next-line
  }, [newPath]);

  const toggleSearchMenu = () => {
    setIsOpen(true);
    if (window.innerWidth <= 500) {
      addClassToBody('searchBar_open');
    }
  };

  function toggleDarkMode() {
    var root = document.documentElement;
    root.classList.toggle('dark-theme');
  }
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to highlight matching text
  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="searchMatchResult">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const closeSearchMenu = () => {
    setIsOpen(false);
    removeClassFromBody('searchBar_open');
  };
  return (
    <div className="topBar">
      <div className="topBar_LeftRegion">
        <span className="topBarmenu_icon" onClick={()=> toggleClassOnBody('leftbar_minimize')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="0" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </span>
        <label className="topBar_Logo" htmlFor="">
          <Link to="/">
            Abdul.<span>REHMAN</span>
          </Link>
        </label>
      </div>
      <div className="topBar_CenterRegion">
        <div className="topBar_Center_Search">
        <form action="" ref={buttonRef} onClick={toggleSearchMenu}>
          <div>
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="search">
                <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"></path>
              </svg>
            </button>
          </div>
          <input
            type="search"
            name=""
            id=""
            placeholder="Find friends, groups, pages"
            onChange={handleInputChange}
          />
        
        </form>
        {isOpen && <button type="button" className="closeSearchMenuButton" onClick={closeSearchMenu}><X /></button>}
        <div className={`topbar_searchMenu ${isOpen ? "displayMenu" : ""}`}>
          <div className="topbar_searchMenu-main">
            <h3>People</h3>
            {searchTerm !== '' ? (
              filteredUsers.length > 0 ? (
                filteredUsers.slice(0, 10).map((user) => (
                  <div key={user._id} className="topbar_searchMenu-item">
                    <div className="searchmenu-itemPic" style={{backgroundImage: `url(${user.profilePic})`}}></div>
                    <h4>{highlightText(user.name, searchTerm)}</h4>
                  </div>
                ))
              ) : (
                <h3 className="noResultText">No results found</h3>
              )
            ) : (
              users.slice(0, 10).map((user) => (
                <div key={user._id} className="topbar_searchMenu-item">
                  <div className="searchmenu-itemPic" style={{backgroundImage: `url(${user.profilePic})`}}></div>
                  <h4>{user.name}</h4>
                </div>
              ))
            )}
          </div>
        </div>
        </div>
      </div>
      <div className="topBar_RightRegion">
        <button type="button" onClick={()=>{navigateToPath(`Bookmarks`)}}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </span>
        </button>
        <button type="button" onClick={()=>{navigateToPath(`Contact`)}}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-mail"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </span>
        </button>
        <button type="button" onClick={()=>{navigateToPath(`Settings`)}}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </span>
        </button>
        <button type="button" onClick={()=>{navigateToPath(`Profile/${userData._id}`)}} >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
        </button>
        <button type="button" onClick={toggleDarkMode}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;