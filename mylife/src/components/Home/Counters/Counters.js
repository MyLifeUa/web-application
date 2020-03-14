import React from 'react';

import fullImage from '../../../assets/home/full_image_1.jpg';

function Counters() {
    return (
        <div id="counters">
            <section id="fh5co-counters" style={{backgroundImage: "url(" + fullImage + ")"}} data-stellar-background-ratio="0.5">
                <div class="fh5co-overlay"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 section-heading text-center to-animate">
                            <h2>Fun Facts</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="fh5co-counter to-animate">
                                <i class="fh5co-counter-icon icon-briefcase to-animate-2"></i>
                                <span class="fh5co-counter-number js-counter" data-from="0" data-to="9" data-speed="5000" data-refresh-interval="50">9</span>
                                <span class="fh5co-counter-label">Gitlab repositories</span>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="fh5co-counter to-animate">
                                <i class="fh5co-counter-icon icon-code to-animate-2"></i>
                                <span class="fh5co-counter-number js-counter" data-from="0" data-to="2343409" data-speed="5000" data-refresh-interval="50">2343409</span>
                                <span class="fh5co-counter-label">Lines of codes</span>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="fh5co-counter to-animate">
                                <i class="fh5co-counter-icon icon-cup to-animate-2"></i>
                                <span class="fh5co-counter-number js-counter" data-from="0" data-to="500" data-speed="5000" data-refresh-interval="50">500</span>
                                <span class="fh5co-counter-label">Working hours</span>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="fh5co-counter to-animate">
                                <i class="fh5co-counter-icon icon-people to-animate-2"></i>
                                <span class="fh5co-counter-number js-counter" data-from="0" data-to="77" data-speed="5000" data-refresh-interval="50">77</span>
                                <span class="fh5co-counter-label">Days left</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Counters;