import {
   BrowserRouter as Router,
   Routes,
   Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/authentication/Auth';
import UserProfile from "./components/UserProfile/UserProfile";
import SetProfilePic from "./components/SetProfilePic/SetProfilePic";

function App() {
   return (
      <>
         <Router>
            <Routes>
               {/* Authentication */}
               <Route exact path='/auth' element={<Auth />} />
               <Route exact path='/login' element={<Auth />} />
               <Route exact path='/signup' element={<Auth/>} />
               {/* Main Page */}
               <Route exact path='/' element={<Home/>} />
               {/* Other Pages */}
               <Route exact path='/home' element={<Home />} />
               <Route exact path='/profile/:userId' element={<UserProfile/>} />
               <Route exact path='/set-profile-pic' element={<SetProfilePic/>} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
