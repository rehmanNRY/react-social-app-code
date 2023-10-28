import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Posts from '../posts/Posts';

const Home = () => {
   const navigate = useNavigate();
   useEffect(() => {
      if(!localStorage.authToken){
         const path = "/auth";
         navigate(path);
      }
      // eslint-disable-next-line
   }, [])
  return (
    <div>
      <Posts/>
    </div>
  )
}

export default Home