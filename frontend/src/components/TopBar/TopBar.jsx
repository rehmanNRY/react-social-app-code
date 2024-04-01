import React, { useState, useEffect, useRef } from 'react';
import './TopBar.css';
import {Link} from 'react-router-dom';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSearchMenu = ()=>{
    setIsOpen(true);
  }
  return (
    <div className="topBar">
      <div className="topBar_LeftRegion">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="0" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </span>
      </div>
      <div className="topBar_CenterRegion">
        <label className="topBar_Center_Logo" htmlFor="">
          <Link to="/">Abdul.<span>REHMAN</span></Link>
        </label>
        <div className="topBar_Center_Search">
          <form action="" ref={buttonRef} onClick={toggleSearchMenu}>
            <div>
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="search">
                <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"></path>
              </svg>
            </button>
            </div>
            <input type="search" name="" id="" placeholder='Find friends, groups, pages' />
          </form>
          <div className={`topbar_searchMenu ${isOpen ? 'displayMenu' : ''}`}>
            <div className="topbar_searchMenu-main">
              <h3>People</h3>
              {[1,2,3].map((item)=> <div key={item} className='topbar_searchMenu-item'>
                <div className="searchmenu-itemPic"></div>
                <h4>Abdul Rehman</h4>
              </div>)}
              <h3>Groups</h3>
              {[1,2,3].map((item)=> <div key={item} className='topbar_searchMenu-item'>
                <div className="searchmenu-itemPic"></div>
                <h4>Fun Land</h4>
              </div>)}
              <h3>Pages</h3>
              {[1,2,3].map((item)=> <div key={item} className='topbar_searchMenu-item'>
                <div className="searchmenu-itemPic"></div>
                <h4>Poetry lovers</h4>
              </div>)}
            </div>
          </div>
        </div>
        <svg className="absolute show-for-large-up" width="66" height="81" viewBox="0 0 466 481" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M259.2 116.588C201.353 152.064 296.476 309.386 426.582 229.598" stroke="url(#paint0_linear_1604_6767)" strokeWidth="21"></path>
  <path d="M280.773 319.016C415.77 236.228 314.727 82.537 259.2 116.589" stroke="url(#paint1_linear_1604_6767)" strokeWidth="21"></path>
  <path d="M113.391 206.007C55.5432 241.482 150.666 398.804 280.772 319.016" stroke="url(#paint2_linear_1604_6767)" strokeWidth="21"></path>
  <path d="M134.964 408.434C269.961 325.647 168.917 171.955 113.391 206.007" stroke="url(#paint3_linear_1604_6767)" strokeWidth="21"></path>
  <defs>
  <linearGradient id="paint0_linear_1604_6767" x1="422.648" y1="230.728" x2="304.822" y2="83.7047" gradientUnits="userSpaceOnUse">
  <stop stopColor="#FFE14F" stopOpacity="0"></stop>
  <stop offset="0.244161" stopColor="#FFE14F"></stop>
  <stop offset="1" stopColor="#FF7676"></stop>
  </linearGradient>
  <linearGradient id="paint1_linear_1604_6767" x1="281.856" y1="319.294" x2="233.267" y2="135.709" gradientUnits="userSpaceOnUse">
  <stop stopColor="#303CAB"></stop>
  <stop offset="0.546875" stopColor="#A12D8E"></stop>
  <stop offset="0.989583" stopColor="#FF7676"></stop>
  </linearGradient>
  <linearGradient id="paint2_linear_1604_6767" x1="119.848" y1="201.386" x2="234.932" y2="349.589" gradientUnits="userSpaceOnUse">
  <stop stopColor="#0082E0"></stop>
  <stop offset="1" stopColor="#303CAB"></stop>
  </linearGradient>
  <linearGradient id="paint3_linear_1604_6767" x1="126.5" y1="401.5" x2="44.8895" y2="239.258" gradientUnits="userSpaceOnUse">
  <stop stopColor="#CCE6F9" stopOpacity="0"></stop>
  <stop offset="0.244792" stopColor="#0082E0"></stop>
  </linearGradient>
  </defs>
</svg>
        <div className="topBar_Center_Btns">
          <button type='button'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </span>
          </button>
          <button type='button'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </span>
          </button>
          <button type='button'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </span>
          </button>
          <button type='button'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </span>
          </button>
          <button type='button'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </span>
          </button>
        </div>
      </div>
      <div className="topBar_RightRegion"></div>
    </div>
  )
}

export default TopBar