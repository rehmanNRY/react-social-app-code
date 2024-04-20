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
import People from "./components/People/People";
import FriendsSuggestions from "./components/FriendsSuggestions/FriendsSuggestion";
import PendingReq from "./components/pendingRequestes/PendingReq";
import SentReq from "./components/SentRequests/SentReq";
import FriendList from "./components/FriendList/FriendList";
import Contact from "./components/Contact/Contact";
import Settings from "./components/SettingsPage/Settings";
import './Responsive.css'

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
               <Route exact path='/People' element={<People/>} />
               <Route exact path='/Friends-Suggestions' element={<FriendsSuggestions/>} />
               <Route exact path='/Friend-Requests' element={<PendingReq/>} />
               <Route exact path='/Sent-Requests' element={<SentReq/>} />
               <Route exact path='/Friends' element={<FriendList/>} />
               <Route exact path='/Settings' element={<Settings/>} />
               <Route exact path='/Contact' element={<Contact/>} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
