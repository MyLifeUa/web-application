import React from 'react';

import { Router, Link, Redirect, useHistory } from 'react-router-dom';
import { Button } from "reactstrap";



function Header() {

    let history = useHistory();

    const signIn = () => {
        history.push("/signin");
    }

    const signUp = () => {
        history.push("/signup");
    }

    return (
        <div id="header">
            <header role="banner" id="fh5co-header">
                <div class="container">
                    <nav class="navbar navbar-default">
                        <div class="navbar-header">
                            <a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
                            <Link to="/" class="navbar-brand">MyLife</Link>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li style={{marginLeft: "10px", marginTop: "5px"}}><Button onClick={signIn} color="primary">Sign In</Button></li>
                                <li style={{marginLeft: "10px", marginTop: "5px"}}><Button onClick={signUp} color="info">Sign Up</Button></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );

}

export default Header;