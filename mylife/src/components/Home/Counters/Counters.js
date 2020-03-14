import React from 'react'

import fullImage from '../../../assets/home/full_image_1.jpg'

function Counters () {
  return (
    <div id="counters">
      <section id="fh5co-counters" style={{ backgroundImage: 'url(' + fullImage + ')' }} data-stellar-background-ratio="0.5">
        <div className="fh5co-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 section-heading text-center to-animate">
              <h2>Fun Facts</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="fh5co-counter to-animate">
                <i className="fh5co-counter-icon icon-briefcase to-animate-2"></i>
                <span className="fh5co-counter-number js-counter" data-from="0" data-to="89" data-speed="5000" data-refresh-interval="50">89</span>
                <span className="fh5co-counter-label">Finished projects</span>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="fh5co-counter to-animate">
                <i className="fh5co-counter-icon icon-code to-animate-2"></i>
                <span className="fh5co-counter-number js-counter" data-from="0" data-to="2343409" data-speed="5000" data-refresh-interval="50">2343409</span>
                <span className="fh5co-counter-label">Line of codes</span>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="fh5co-counter to-animate">
                <i className="fh5co-counter-icon icon-cup to-animate-2"></i>
                <span className="fh5co-counter-number js-counter" data-from="0" data-to="1302" data-speed="5000" data-refresh-interval="50">1302</span>
                <span className="fh5co-counter-label">Cup of coffees</span>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="fh5co-counter to-animate">
                <i className="fh5co-counter-icon icon-people to-animate-2"></i>
                <span className="fh5co-counter-number js-counter" data-from="0" data-to="52" data-speed="5000" data-refresh-interval="50">52</span>
                <span className="fh5co-counter-label">Happy clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Counters
