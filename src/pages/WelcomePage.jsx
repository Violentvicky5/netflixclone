import React from 'react'
import HeaderSignOutBar from '../components/HeaderSignOutBar'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { EmailContext } from '../context/EmailContext'
const WelcomePage = () => {
    const{email,setEmail}=useContext(EmailContext);
  return (
    <div>
        <HeaderSignOutBar/>
       <div className='container mt-5' style={{width:"50%"}}>
        <h3 className='fw-bold'>Welcome to Netflix!</h3>
        <p className='para'>You've started your membership and we emailed the details to <strong>{email}</strong></p>
        <p className='para'>Remenber yo can cancel at anytime in the account section.</p>
        <p className='para'>please do signout and Re-Login your account and watch your favourite shows!</p>
       </div>
        
         <div
        className="signup-footer"
        style={{ backgroundColor: "rgb(241, 234, 234)" }}
      >
        <Footer />
      </div>
        </div>
  )
}

export default WelcomePage