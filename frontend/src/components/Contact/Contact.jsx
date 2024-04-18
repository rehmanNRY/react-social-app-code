import React, { useEffect, useState } from "react";
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
    <div style={{ display: "flex"}}>
      <LeftBar />
      <div className="contact_main">
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