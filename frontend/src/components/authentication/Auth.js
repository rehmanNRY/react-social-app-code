import React from 'react';
import './auth.css';
import Form from './Form';

const Auth = () => {
  return (
    <div className="main">
      <div className="container">
         <Form/>
         <div className="right">
            <img height="420px" src="https://myls.mls.systems/ISS/images/loogin-infograph.png" alt="" />
         </div>
      </div>
    </div>
  )
}

export default Auth