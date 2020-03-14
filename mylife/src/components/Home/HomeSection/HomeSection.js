import React from 'react'

import whiteLogo from '../../../assets/home/white-logo.png'

function HomeSection () {
  return (
    <div id="home">
      <section id="fh5co-home" data-section="home" data-stellar-background-ratio="0.5">
        <div className="gradient"></div>
        <div className="container">
          <div className="text-wrap">
            <div className="text-inner">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <img className="to-animate" style={{ marginTop: '-200px', width: '250px', height: '250px' }} src={whiteLogo}/>
                  <h1 className="to-animate">Be the best version of yourself</h1>
                  <h2 className="to-animate">With our personal lifestyle monitoring system,</h2>
                  <h2 className="to-animate">your life will never be the same!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slant"></div>
      </section>
    </div>
  )
}

export default HomeSection
