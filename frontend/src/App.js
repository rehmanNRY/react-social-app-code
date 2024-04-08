import {
   BrowserRouter as Router,
   Routes,
   Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/authentication/Auth';
import UserProfile from "./components/UserProfile/UserProfile";
import SetProfilePic from "./components/SetProfilePic/SetProfilePic";
import MyPosts from "./components/MyPosts/MyPosts";
import Bookmarks from "./components/Bookmarks/Bookmarks";

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
               <Route exact path='/set-profile-pic' element={<SetProfilePic/>} />
               {/* Left Bar Items */}
               <Route exact path='/home' element={<Home />} />
               <Route exact path='/my-posts' element={<MyPosts />} />
               <Route exact path='/Bookmarks' element={<Bookmarks />} />
               <Route exact path='/profile/:userId' element={<UserProfile/>} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
