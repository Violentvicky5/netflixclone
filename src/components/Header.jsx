import React from 'react'
import logoImg from "../assets/logo.png"
const Header = () => {
  return (
    <>
    <nav className=''>
        <div className='container navAlign'>
        <a href="#"><img src={logoImg} alt="logo" style={{height:"60px"}} /></a>
        <a href="#" className='loginBtn btn text-white '>Sign In</a>
    </div>
    </nav>
    </>
  )
}

export default Header