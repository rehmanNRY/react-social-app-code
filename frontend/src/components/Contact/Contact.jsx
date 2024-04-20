import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import LeftBar from "../LeftBar/LeftBar";
import { ExternalLink } from "react-feather";
import './contact.css'

const Contact = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.authToken) {
      const path = "/auth";
      navigate(path);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
    <TopBar />
      <LeftBar />
      <div className="contact_main">
        <h2>Contact, Abdul Rehman</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio porro expedita nobis corrupti beatae itaque doloribus ad quos quae iusto.</p>
        <div className="contact_links">
        <div className="contact_data">
          <div className="contact_item">
            <a href="/" target="_blank">
              <div className="contact_left"><div></div></div>
              <span>https://www.facebook.com/rehman.fbx</span>
              <div className="contact_right"><ExternalLink /></div>
            </a>
          </div>
          <div className="contact_item">
            <a href="/" target="_blank">
              <div className="contact_left"><div></div></div>
              <span>https://www.facebook.com/rehman.fbx</span>
              <div className="contact_right"><ExternalLink /></div>
            </a>
          </div>
          <div className="contact_item">
            <a href="/" target="_blank">
              <div className="contact_left"><div></div></div>
              <span>https://www.facebook.com/rehman.fbx</span>
              <div className="contact_right"><ExternalLink /></div>
            </a>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Contact;