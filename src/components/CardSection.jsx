import React from 'react'
import img1 from "../assets/icon01.png"
import img2 from "../assets/icon02.png"
import img3 from "../assets/icon03.png"
import img4 from "../assets/icon04.png"

const CardSection = () => {
  return (
    <>
    <div className='cardWrapper sectionPadd'>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='text-white headText' >More reasons to join</h2>
                </div>
                <div className='col-sm-6 col-lg-3 g-3'>
                    <div className='cardItem'>
                        <h6 className='text-white'>Enjoy on your TV</h6>
                        <p className='para'>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                        <img className='imgFluid' src={img1} alt="desktopImg" />
                    </div>
                </div>
                 <div className='col-sm-6 col-lg-3 g-3'>
                    <div className='cardItem'>
                        <h6 className='text-white'>Download your shows to watch offlin</h6>
<p className='para'>Save your favourites easily and always have something to watch.</p>  
                      <img className='imgFluid' src={img2} alt="downloadImg" />
                    </div>
                </div>
                 <div className='col-sm-6 col-lg-3 g-3'>
                    <div className='cardItem'>
                        <h6 className='text-white'>Enjoy on your TV</h6>
                        <p className='para'>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                        <img className='imgFluid' src={img3} alt="watchImg" />
                    </div>
                </div>
                 <div className='col-sm-6 col-lg-3 g-3'>
                    <div className='cardItem'>
                        <h6 className='text-white'>Enjoy on your TV</h6>
                        <p className='para'>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                        <img className='imgFluid' src={img4} alt="profileImg" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CardSection