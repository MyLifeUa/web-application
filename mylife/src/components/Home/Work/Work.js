import React from 'react';

// import works
import work01 from '../../../assets/home/work/work01.png';
import work02 from '../../../assets/home/work/work02.png';
import work03 from '../../../assets/home/work/work03.png';
import work04 from '../../../assets/home/work/work04.png';
import work05 from '../../../assets/home/work/work05.png';
import work06 from '../../../assets/home/work/work06.png';
import work07 from '../../../assets/home/work/work07.png';
import work08 from '../../../assets/home/work/work08.png';
import work09 from '../../../assets/home/work/work09.png';

function Work() {
    return (
        <div id="work">
            <section id="fh5co-work" data-section="work">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 section-heading text-center">
                            <h2 class="to-animate">Work</h2>
                            <div class="row">
                                <div class="col-md-8 col-md-offset-2 subtext to-animate">
                                    <h3>"Talk is cheap. Show me the code!"</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-bottom-padded-sm">
                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work01} class="fh5co-project-item image-popup to-animate">
                                <img src={work01} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Project planning</h2>
                                    <span>Requirements, system architecure and calendar</span>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work02} class="fh5co-project-item image-popup to-animate">
                                <img src={work02} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Web application</h2>
                                    <span>Started React web application</span>
                                </div>
                            </a>
                        </div>
                        <div class="clearfix visible-sm-block"></div>

                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work03} class="fh5co-project-item image-popup to-animate">
                                <img src={work03} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Mobile application</h2>
                                    <span>Started React Native mobile application</span>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work04} class="fh5co-project-item image-popup to-animate">
                                <img src={work04} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Rest API</h2>
                                    <span>Started Rest API using Django</span>
                                </div>
                            </a>
                        </div>

                        <div class="clearfix visible-sm-block"></div>

                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work05} class="fh5co-project-item image-popup to-animate">
                                <img src={work05} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Machine Learning Engine</h2>
                                    <span>Started researching about food recognition</span>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work06} class="fh5co-project-item image-popup to-animate">
                                <img src={work06} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Fitbit integration</h2>
                                    <span>Started integrating Fitbit Charge 3 band</span>
                                </div>
                            </a>
                        </div>

                        <div class="clearfix visible-sm-block"></div>

                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work07} class="fh5co-project-item image-popup to-animate">
                                <img src={work07} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Project calendar</h2>
                                    <span>Planning</span>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work08} class="fh5co-project-item image-popup to-animate">
                                <img src={work08} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Technological model</h2>
                                    <span>Software architecure</span>
                                </div>
                            </a>
                        </div>
                        <div class="clearfix visible-sm-block"></div>

                        <div class="col-md-4 col-sm-6 col-xxs-12">
                            <a href={work09} class="fh5co-project-item image-popup to-animate">
                                <img src={work09} alt="Image" class="img-responsive" />
                                <div class="fh5co-text">
                                    <h2>Deployment diagram</h2>
                                    <span>DevOps</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Work;