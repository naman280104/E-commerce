import React from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
export default function Nav() {
  let auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
  }
  return (
    <div className='navbar'>
        {auth?
        <ul className='navbar-list'>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/add'>Add</Link></li>
        <li className='extend-it'></li>
        <li style={{position:"absolute",right:"10px"}}><Link onClick={()=>logout()} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li> 
        </ul>:
        <ul className='navbar-list nav-right'>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
        </ul>
        }
      
    </div>
  )
}
