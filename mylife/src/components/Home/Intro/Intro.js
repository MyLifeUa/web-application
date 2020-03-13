import React from 'react';

function Intro() {

    return (
        <div id="intro">
            <section id="fh5co-intro">
                <div class="container">
                    <div class="row row-bottom-padded-lg">
                        <div class="fh5co-block to-animate">
                            <div class="overlay-darker"></div>
                            <div class="overlay"></div>
                            <div class="fh5co-text">
                                <i class="fh5co-intro-icon icon-bulb"></i>
                                <h2>Nutrition</h2>
                                <p>We will use computer vision and a set of Machine Learning algorithms to recognise basic elements on a plate.<br />We will also display important information about the food intaked by the user, like calories, macronutrients.</p>
                            </div>
                        </div>
                        <div class="fh5co-block to-animate" >
                            <div class="overlay-darker"></div>
                            <div class="overlay"></div>
                            <div class="fh5co-text">
                                <i class="fh5co-intro-icon icon-wrench"></i>
                                <h2>Crossfit plan</h2>
                                <p>Through motion detection using OpenPose, we intend to detect a set of recommended exercises to the user.</p>
                            </div>
                        </div>
                        <div class="fh5co-block to-animate">
                            <div class="overlay-darker"></div>
                            <div class="overlay"></div>
                            <div class="fh5co-text">
                                <i class="fh5co-intro-icon icon-rocket"></i>
                                <h2>Launch</h2>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                <p><a href="#" class="btn btn-primary">Why Us?</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Intro;