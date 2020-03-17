import React from 'react';

// import team pictures
import team01 from '../../../assets/home/team/team01.png';
import team02 from '../../../assets/home/team/team02.jpg';
import team03 from '../../../assets/home/team/team03.jpg';
import team04 from '../../../assets/home/team/team04.png';
import team05 from '../../../assets/home/team/team05.jpg';
import team06 from '../../../assets/home/team/cc.png';

function About() {
    return (
        <div id="about">
            <section id="fh5co-about" data-section="about">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 section-heading text-center">
                            <h2 class="to-animate">Our team</h2>
                            <div class="row">
                                <div class="col-md-8 col-md-offset-2 subtext to-animate">
                                    <h3>These are the actors of MyLife project.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="fh5co-person text-center to-animate">
                                <figure><img src={team01} alt="Image" /></figure>
                                <h3>João Marques</h3>
                                <span class="fh5co-position">DevOps Master</span>
                                <ul class="social social-circle">
                                    <li><a href="https://jmarques.icu"><i class="icon-globe"></i></a></li>
                                    <li><a href="https://www.linkedin.com/in/joão-marques-62480119a/"><i class="icon-linkedin"></i></a></li>
                                    <li><a href="https://github.com/joao-p-marques"><i class="icon-github"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="fh5co-person text-center to-animate">
                                <figure><img src={team02} alt="Image" /></figure>
                                <h3>João Vasconcelos</h3>
                                <span class="fh5co-position">Team Manager</span>
                                <ul class="social social-circle">
                                    <li><a href="https://jmnmv12.github.io/AboutMePT"><i class="icon-globe"></i></a></li>
                                    <li><a href="https://www.linkedin.com/in/joão-vasconcelos/"><i class="icon-linkedin"></i></a></li>
                                    <li><a href="https://github.com/jmnmv12"><i class="icon-github"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="fh5co-person text-center to-animate">
                                <figure><img src={team03} alt="Image" /></figure>
                                <h3>Tiago Mendes</h3>
                                <span class="fh5co-position">Software Architect</span>
                                <ul class="social social-circle">
                                    <li><a href="https://tiagocmendes.github.io/"><i class="icon-globe"></i></a></li>
                                    <li><a href="https://pt.linkedin.com/in/tiagocmendes"><i class="icon-linkedin"></i></a></li>
                                    <li><a href="https://github.com/tiagocmendes"><i class="icon-github"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row" style={{marginTop: "100px"}}>
                        <div class="col-md-4">
                            <div class="fh5co-person text-center to-animate">
                                <figure><img src={team04} alt="Image" /></figure>
                                <h3>Tomás Costa</h3>
                                <span class="fh5co-position">Lead Developer</span>
                                <ul class="social social-circle">
                                    <li><a href="https://tomascosta.netlify.com/"><i class="icon-globe"></i></a></li>
                                    <li><a href="https://www.linkedin.com/in/tomascostax/"><i class="icon-linkedin"></i></a></li>
                                    <li><a href="https://github.com/TomasCostaK"><i class="icon-github"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="fh5co-person text-center to-animate">
                                <figure><img src={team05} alt="Image" /></figure>
                                <h3>Vasco Ramos</h3>
                                <span class="fh5co-position">Team Manager</span>
                                <ul class="social social-circle">
                                    <li><a href="https://vascoalramos.me/"><i class="icon-globe"></i></a></li>
                                    <li><a href="https://linkedin.com/in/vascoalramos"><i class="icon-linkedin"></i></a></li>
                                    <li><a href="https://github.com/vascoalramos"><i class="icon-github"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="fh5co-person text-center to-animate">
                                <figure><img src={team06} alt="Image" /></figure>
                                <h3>Prof. Dr. Carlos Costa</h3>
                                <span class="fh5co-position">Advisor</span>
                                <ul class="social social-circle">
                                    <li><a href="http://sweet.ua.pt/carlos.costa/default.htm"><i class="icon-globe"></i></a></li>
                                    <li><a href="https://gitlab.com/nao.consigo.nome"><i class="icon-github"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default About;