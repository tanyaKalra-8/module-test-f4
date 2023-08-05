import React from 'react'
import { Outlet } from 'react-router';
import "../Styles/header.css"
import home from "../Resources/Group 2918.png"
import bell from "../Resources/Group (1).png"
import notification from "../Resources/Layer_49.png"
import profile from "../Resources/Layer_26.png"
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
        <div className='header'>
          <div>
            <a href='#' id='logo'>TravelMedia.in</a>
          </div>
          <div>
            <nav id='nav'>
              <div><NavLink to="/"><img src={home} alt='home'/></NavLink></div>
              <div><img src={bell} alt='bell' style={{cursor:"pointer"}}/></div>
              <div><NavLink to="/item/:id"><img src={notification} alt='notification'/></NavLink></div>
              <div><img src={profile} alt='profile' style={{cursor:"pointer"}}/></div>
            </nav>
          </div>
        </div>

        <Outlet/>
    </>
  )
}

export default Header;