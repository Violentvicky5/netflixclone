import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from "../assets/logo.png"
const Header = () => {
  
  const navigate=useNavigate();
  return (
    <>
    <nav className=''>
        <div className='container navAlign'>
        <a href="#"><img src={logoImg} alt="logo" style={{height:"60px"}} /></a>
        
  
            <button className='loginBtn btn text-white' onClick={()=>navigate("/signin")}>Sign In</button>

     
        
    
    
    
    </div>
    </nav>
    </>
  )
}

export default Header