import React from 'react';

function Services() {
    return (
        <div id="services">
            <section id="fh5co-services" data-section="services">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 section-heading text-left">
                            <h2 class=" left-border to-animate">Services</h2>
                            <div class="row">
                                <div class="col-md-8 subtext to-animate">
                                    <h3>A brief description of the services we plan to implement.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-sm-6 fh5co-service to-animate">
                            <i class="icon to-animate-2 fas fa-heartbeat"></i>
                            <h3>Real-time data with Fitbit Charge 3</h3>
                            <p>In order to help us monitorizing the lifestyle of a specific user, we will use the Fitbit Charge 3 band. With this band, we will be able to gather some real-time information about heart rate, sleep quality, burnt calories and much more!</p>
                        </div>
                        <div class="col-md-6 col-sm-6 fh5co-service to-animate">
                            <i class="icon to-animate-2 fas fa-dumbbell"></i>
                            <h3>Crossfit training recognition</h3>
                            <p>When a user wants to have feedback about his crossfit training, he can record and send it to our servers in order to be processed. With the help of <strong>OpenPose</strong> software, we can check if a certain exercise was done correctly or not. We will use <strong>Flask</strong> to develop this module.</p>
                        </div>
                        <div class="col-md-6 col-sm-6 fh5co-service to-animate">
                            <i class="icon to-animate-2 fas fa-robot"></i>
                            <h3>Food recognition with ML</h3>
                            <p>In order to identify and quantify different types of food present in a plate, we will develop a machine learning engine in <strong>Python</strong> that will process pictures taken with a smartphone.</p>
                        </div>

                        <div class="clearfix visible-sm-block"></div>

                        <div class="col-md-6 col-sm-6 fh5co-service to-animate">
                            <i class="icon to-animate-2 fas fa-laptop"></i>
                            <h3>Mobile and Web applications</h3>
                            <p>In order to interact with the different users of our system, we will develop different applications for each one. For the patients, we will be developing both a mobile app and a web app. For the doctor and the admin of the hospital, both will have a customized web app. Both the applications wil be developed with <strong>React.</strong></p>
                        </div>
                        <div class="col-md-6 col-sm-6 fh5co-service to-animate">
                            <i class="icon to-animate-2 fas fa-cloud-meatball"></i>
                            <h3>Service layer REST API</h3>
                            <p>This module is the core of our information system, responsible to communicate with all the other components. This <strong>REST API</strong>, built in <strong>Django</strong>, will do CRUD operations to a <strong>PostgreSQL</strong> database and send data to the clients applications.</p>
                        </div>
                        <div class="col-md-6 col-sm-6 fh5co-service to-animate">
                            <i class="icon to-animate-2 fas fa-sync-alt"></i>
                            <h3>Continuous Integration / Continuous Deployment</h3>
                            <p>We will be using the <strong>CI/CD</strong> practise to develop and deploy all our components. For that, we will be using <strong>Docker containers</strong> and also <strong>Gitlab pipelines.</strong></p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;