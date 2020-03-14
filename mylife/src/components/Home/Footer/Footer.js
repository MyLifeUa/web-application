import React from 'react';

function Footer() {
    return (
        <div id="footer">
            <footer id="footer" role="contentinfo">
                <a href="#" class="gotop js-gotop"><i class="icon-arrow-up2"></i></a>
                <div class="container">
                    <div class="">
                        <div class="col-md-12 text-center">
                            <p><strong>MyLife 2020 &copy;</strong>  All Rights Reserved. <br /><a href="https://www.ua.pt/deti/">Universidade de Aveiro - DETI</a></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <ul class="social social-circle">
                                <li><a href="/"><i class="icon-globe"></i></a></li>
                                <li><a href="https://gitlab.com/groups/my-life-ua/"><i class="fab fa-gitlab"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;