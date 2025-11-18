import React from 'react'

const Header = () => {
  return (
    <>
    <nav className=''>
        <div className='container navAlign'>
        <a href="#"><img src="src/assets/logo.png" alt="logo" style={{height:"60px"}} /></a>
        <a href="#" className='loginBtn btn text-white '>Sign In</a>
    </div>
    </nav>
    </>
  )
}

export default Header