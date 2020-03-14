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
                                <i class="fh5co-intro-icon fas fa-apple-alt"></i>
                                <h2>Nutrition</h2>
                                <p>With MyLife, a regular user can create and follow recommended nutritional plans according to specific health measures. Additionally, he can take pictures of food on a plate to be recognized by our machine learning engine.</p>
                            </div>
                        </div>
                        <div class="fh5co-block to-animate" >
                            <div class="overlay-darker"></div>
                            <div class="overlay"></div>
                            <div class="fh5co-text">
                                <i class="fh5co-intro-icon fas fa-dumbbell"></i>
                                <h2>Crossfit plan</h2>
                                <p>A regular user can also create and practise recommended crossfit training plans, and choose in which days of the week he wants to train. The exercises can be evaluated by our body movements recognition system.</p>
                            </div>
                        </div>
                        <div class="fh5co-block to-animate">
                            <div class="overlay-darker"></div>
                            <div class="overlay"></div>
                            <div class="fh5co-text">
                                <i class="fh5co-intro-icon fas fa-heartbeat"></i>
                                <h2>Vital signals monitoring</h2>
                                <p>With the help of Fitbit Charge 3 band, our system is capable of gather and process real-time vital signals about regular users. This data is also used for the recommended nutritional and crossfit training plans</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Intro;