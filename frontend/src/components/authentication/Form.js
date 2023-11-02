import React, { useState, useEffect } from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {
   const navigate = useNavigate();
   useEffect(() => {
      if(localStorage.authToken){
         const path = "/home";
         navigate(path);
      }
      // eslint-disable-next-line
   }, [])
   
   const [loginFormDisplay, setLoginFormDisplay] = useState("block");
   const [signupStep1Display, setSignupStep1Display] = useState("none");
   const [signupStep2Display, setSignupStep2Display] = useState("none");
   // Go to login form
   const goLoginForm = () => {
      setLoginFormDisplay("block");
      setSignupStep1Display("none");
      setSignupStep2Display("none");
   }
   // Go to Sign up step 1
   const goSignupStep1 = () => {
      setSignupStep1Display("block");
      setSignupStep2Display("none");
      setLoginFormDisplay("none");
   }
   // Login Form
   const [loginForm, setLoginForm] = useState({ loginEmail: "", loginPassword: "" });
   const loginOnChange = (e) => {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
   }
   // Login form api call
   const loginApiCall = async (email, password) => {
      try {
         const host = "http://localhost:5000";
         const url = `${host}/api/auth/login`;
         const bodyData = JSON.stringify({ email, password })
         const response = await fetch(url, {
            method: 'POST',
            body: bodyData,
            headers: {
               'Content-Type': 'application/json'
            }
         });
         const myJson = await response.json(); //extract JSON from the http response
         if (myJson.authToken) {
            localStorage.setItem('authToken', myJson.authToken);
            const path = "/home";
            navigate(path);
            console.log(myJson.authToken)
         }
         else {
            console.log("Some error occur write correct credentials")
         }
      } catch (error) {
         console.log("Some error occured!");
      }
   }
   // Submitting login form
   const loginSubmit = (e) => {
      e.preventDefault();
      loginApiCall(loginForm.loginEmail, loginForm.loginPassword);
      setLoginForm({ loginEmail: "", loginPassword: "" });
   }
   // Signup Form
   const [signForm, setSignForm] = useState({ signEmail: "", signPassword: "", signCnPassword: "", signFName: "", signLName: "" });
   const signOnChange = (e) => {
      setSignForm({ ...signForm, [e.target.name]: e.target.value });
   }
   // Signup form api call
   const signupApiCall = async (name, email, password, gender) => {
      try {
         const host = "http://localhost:5000";
         const url = `${host}/api/auth/signup`;
         const bodyData = JSON.stringify({ name, email, password, gender })
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: bodyData
         });
         const myJson = await response.json(); //extract JSON from the http response
         if (myJson.authToken) {
            // Saving token in local storage
            localStorage.setItem('authToken', myJson.authToken);
            // Redirecting to the Success path
            const path = "/home";
            navigate(path);
            // console.log(myJson.authToken)
         }
         else {
            console.log("Invalid creentials");
         }
      } catch (error) {
         console.log("Some error occured!");
      }
   }
   // Submitting signup step 1 form
   const submitSingupStep1 = (e) => {
      e.preventDefault();
      if (signForm.signPassword === signForm.signCnPassword) {
         setSignupStep1Display("none");
         setSignupStep2Display("block");
      } else {
         alert("Password and confrm password is not equal");
      }
   }
   // Submitting signup step 2 form
   const submitSingupStep2 = (e) => {
      e.preventDefault();
      const fullName = signForm.signFName + " " + signForm.signLName;
      const selectedGender = document.querySelector('input[name="signGender"]:checked').value;
      // "Todo api call"
      signupApiCall(fullName, signForm.signEmail, signForm.signPassword, selectedGender);
      setSignForm({ signEmail: "", signPassword: "", signCnPassword: "", signFName: "", signLName: "" })
   }
   return (
      <div className='authForm'>
         {/* Login form */}
         <form style={{ display: `${loginFormDisplay}` }} autoComplete='off' className='loginForm' onSubmit={loginSubmit}>
            <h3>Let's Start</h3>
            <p>Doesn't have an account yet? <span onClick={goSignupStep1}>Sign up</span></p>
            <label htmlFor="loginEmail"><h4>Email address</h4></label>
            <input type="email" name="loginEmail" required onChange={loginOnChange} value={loginForm.loginEmail} id="loginEmail" placeholder='your@example.com' />
            <label htmlFor="loginPassword"><h4>Password <span>Forgot Password?</span></h4></label>
            <input type="password" name="loginPassword" onChange={loginOnChange} value={loginForm.loginPassword} id="loginPassword" required minLength={6} placeholder='Enter 6 character or more' />
            <button type="submit">Login</button>
            <div className="formBottom">
               <p>or login with</p>
               <button type="button">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path></svg></span>Google
               </button>
               <button type="button">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg></span>Facebook
               </button>
            </div>
         </form>
         {/* Signup Step 1 form */}
         <form style={{ display: `${signupStep1Display}` }} autoComplete='off' className='signupForm' onSubmit={submitSingupStep1}>
            <div className="signupSteps">
               <div></div>
               <div style={{ backgroundColor: `#cdcdcd` }}></div>
            </div>
            <h3>Let's Start</h3>
            <p>Already have an account? <span onClick={goLoginForm}>Login now</span></p>
            <div className="signupStep1">
               <label htmlFor="signEmail"><h4>Email address</h4></label>
               <input type="email" name="signEmail" onChange={signOnChange} value={signForm.signEmail} required id="signEmail" placeholder='your@example.com' />
               <label htmlFor="signPassword"><h4>Password</h4></label>
               <input type="password" name="signPassword" onChange={signOnChange} value={signForm.signPassword} required minLength={6} id="signPassword" placeholder='Enter 6 character or more' />
               <label htmlFor="signCnPassword"><h4>Confirm Password</h4></label>
               <input type="password" name="signCnPassword" onChange={signOnChange} value={signForm.signCnPassword} required minLength={6} id="signCnPassword" placeholder='Confrim your password' />
               <button type="submit">Next</button>
               <div className="formBottom">
                  <p>or signup with</p>
                  <div className='signupBtns'>
                     <button type="button">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path></svg></span>Google
                     </button>
                     <button type="button">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg></span>Facebook
                     </button>
                  </div>
               </div>
            </div>
         </form>
         {/* Signup Step 2 form */}
         <form style={{ display: `${signupStep2Display}` }} autoComplete='off' className='signupForm' onSubmit={submitSingupStep2}>
            <div className="signupSteps">
               <div></div>
               <div style={{ backgroundColor: `#0027c3` }}></div>
            </div>
            <h3>Let's Start</h3>
            <p>Already have an account? <span onClick={goLoginForm}>Login now</span></p>
            <div className="signupStep2">
               <label htmlFor="signFName"><h4>First Name</h4></label>
               <input type="text" name="signFName" required minLength={3} onChange={signOnChange} value={signForm.signFName} id="signFName" placeholder='Your first name' />
               <label htmlFor="signLName"><h4>Last Name</h4></label>
               <input type="text" name="signLName" required minLength={3} onChange={signOnChange} value={signForm.signLName} id="signLName" placeholder='Your last name' />
               <div className="signupGender">
                  <label htmlFor="signGender"><h4>Gender</h4></label>
                  <div className="gender">
                     <div>
                        <input type="radio" name="signGender" value="male" required id="genderMale" />
                        <label htmlFor="genderMale">Male</label>
                     </div>
                     <div>
                        <input type="radio" name="signGender" value="female" required id="genderFemale" />
                        <label htmlFor="genderFemale">Female</label>
                     </div>
                     <div>
                        <input type="radio" name="signGender" value="other" required id="genderOther" />
                        <label htmlFor="genderOther">Other</label>
                     </div>
                  </div>
               </div>
               <div className="signupBtns">
                  <button type="button" id='goSignStep1Btn' onClick={goSignupStep1}>Back</button>
                  <button type="submit">Sign up</button>
               </div>
            </div>
         </form>
      </div>
   )
}

export default Form;