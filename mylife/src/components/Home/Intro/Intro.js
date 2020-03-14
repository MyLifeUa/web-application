import React from 'react'

function Intro () {
  return (
    <div id="intro">
      <section id="fh5co-intro">
        <div className="container">
          <div className="row row-bottom-padded-lg">
            <div className="fh5co-block to-animate">
              <div className="overlay-darker"></div>
              <div className="overlay"></div>
              <div className="fh5co-text">
                <i className="fh5co-intro-icon icon-bulb"></i>
                <h2>Plan</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                <p><a href="#" className="btn btn-primary">Get In Touch</a></p>
              </div>
            </div>
            <div className="fh5co-block to-animate" >
              <div className="overlay-darker"></div>
              <div className="overlay"></div>
              <div className="fh5co-text">
                <i className="fh5co-intro-icon icon-wrench"></i>
                <h2>Develop</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                <p><a href="#" className="btn btn-primary">Click Me</a></p>
              </div>
            </div>
            <div className="fh5co-block to-animate">
              <div className="overlay-darker"></div>
              <div className="overlay"></div>
              <div className="fh5co-text">
                <i className="fh5co-intro-icon icon-rocket"></i>
                <h2>Launch</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                <p><a href="#" className="btn btn-primary">Why Us?</a></p>
              </div>
            </div>
          </div>
          <div className="row watch-video text-center to-animate">
            <span>Watch the video</span>
            <a href="https://vimeo.com/channels/staffpicks/93951774" className="popup-vimeo btn-video"><i className="icon-play2"></i></a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Intro
