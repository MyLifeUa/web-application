import React from 'react';
import { Redirect } from 'react-router-dom';

import myLifeLogo from 'assets/img/mylife-logo.png'

import baseURI from "variables/baseURI.js";



class Auth extends React.Component {

    constructor() {
        super();
        this.state = { loaded: false, currentUser: null }
    }

    componentDidMount() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        fetch(baseURI.restApi.signup + "/" + currentUser.userInfo.email, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Token " + currentUser.token
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {
                localStorage.setItem('authUser', JSON.stringify(data));
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

        this.setState({ loaded: false, currentUser: currentUser })
        setInterval(() => {
            this.setState({ loaded: true, currentUser: this.state.currentUser })
        }, 1000);
    }

    render() {
        if (this.state.loaded) {
            if (this.state.currentUser.role === "client")
                return <Redirect to="/client" />
            else if (this.state.currentUser.role === "doctor")
                return <Redirect to="/doctor" />
            else if (this.state.currentUser.role === "admin")
                return <Redirect to="/admin" />
        }
        else
            return (
                <section className="auth-banner">
                    <div className="gradient">
                        <img className="loader" src={myLifeLogo} alt="Loading" />
                    </div>
                </section>
            )
    }
}

export default Auth;