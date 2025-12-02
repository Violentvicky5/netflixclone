import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from "../assets/logo.png"
const Header = () => {
  
  const navigate=useNavigate();
  return (
    <>
    <nav className=''>
        <div className='container navAlign'>
       <div>
        <a href="#"><img src={logoImg} alt="logo" style={{height:"60px"}} /></a>
        </div>
  <div>
            <button className='loginBtn btn text-white m-1' onClick={()=>navigate("/Login")}>Sign In</button>
             <button className='loginBtn btn text-white' onClick={()=>navigate("/AdminLoginPage")}>Admin</button>
</div>
     
        
    
    
    
    </div>
    </nav>
    </>
  )
}

export default Header