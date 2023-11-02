import Auth from './components/authentication/Auth';
import {
   BrowserRouter as Router,
   Routes,
   Route,
} from "react-router-dom";
import Home from './components/containers/home/Home';

function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route exact path='/' element={<Home/>} />
               <Route exact path='/home' element={<Home />} />
               <Route exact path='/auth' element={<Auth />} />
               <Route exact path='/login' element={<Auth />} />
               <Route exact path='/signup' element={<Auth/>} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
