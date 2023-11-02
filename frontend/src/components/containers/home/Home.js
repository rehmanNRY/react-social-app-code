import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Posts from '../posts/Posts';
import LeftBar from '../leftBar/LeftBar';
import RightBar from '../rightBar/RightBar';
import './home.css'

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
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <LeftBar/>
      <Posts/>
      <RightBar/>
    </div>
  )
}

export default Home