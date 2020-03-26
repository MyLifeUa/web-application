import React from 'react';

import { Redirect } from 'react-router-dom';

import MyLifeLogo from '../../assets/home/white-logo.png';

class Loading extends React.Component {

    constructor() {
        super();
        this.state = { loaded: false, currentUser: null }
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({ loaded: false, currentUser: currentUser })
        setInterval(() => {
            this.setState({ loaded: true, currentUser: this.state.currentUser })
        }, 2000);
    }

    render() {
        if (this.state.loaded) {
            if (this.state.currentUser.role === "client")
                return <Redirect to="/client/dashboard" />
            else if (this.state.currentUser.role === "doctor")
                return <Redirect to="/doctor/dashboard" />
            else if (this.state.currentUser.role === "admin")
                return <Redirect to="/admin/dashboard" />
        }

        return (
            <div class="loading-container"><img class="loader" src={MyLifeLogo} /></div>
        );
    }
}

export default Loading;