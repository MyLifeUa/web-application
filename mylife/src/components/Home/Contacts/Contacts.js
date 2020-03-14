import React from 'react'

function Contacts () {
  return (
    <div id='contacts'>
      <section id="fh5co-contact" data-section="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-12 section-heading text-center">
              <h2 className="to-animate">Get In Touch</h2>
              <div className="row">
                <div className="col-md-8 col-md-offset-2 subtext to-animate">
                  <h3>You can contact our team through any of the following options:</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-bottom-padded-md">
            <div className="col-md-6 to-animate">
              <h3>Contact Info</h3>
              <ul className="fh5co-contact-info">
                <li className="fh5co-contact-address ">
                  <i className="icon-home"></i>
                                    IEETA - Instituto de Engenharia Electrónica e Telemática de Aveiro <br />Universidade de Aveiro - Aveiro, Portugal
                </li>
                <li><i className="icon-phone"></i> (+351) 965 380 346</li>
                <li><i className="icon-envelope"></i>vascoalramos@ua.pt</li>
                <li><i className="icon-globe"></i> <a href="my-life-ua.gitlab.io" target="_blank">my-life-ua.gitlab.io</a></li>
              </ul>
            </div>
            <div className="col-md-6 to-animate">
              <h3>Contact Form</h3>
              <div className="form-group ">
                <label htmlFor="name" className="sr-only">Name</label>
                <input id="name" className="form-control" placeholder="Name" type="text" />
              </div>
              <div className="form-group ">
                <label htmlFor="email" className="sr-only">Email</label>
                <input id="email" className="form-control" placeholder="Email" type="email" />
              </div>
              <div className="form-group ">
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input id="phone" className="form-control" placeholder="Phone" type="text" />
              </div>
              <div className="form-group ">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea name="" id="message" cols="30" rows="5" className="form-control" placeholder="Message"></textarea>
              </div>
              <div className="form-group ">
                <input className="btn btn-primary btn-lg" value="Send Message" type="submit" />
              </div>
            </div>
          </div>
        </div>
        <div id="map" className="to-animate"></div>
      </section>
    </div >
  )
}

export default Contacts
