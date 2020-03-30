import React from 'react';

import { Redirect } from 'react-router-dom';

import MyLifeLogo from '../../assets/home/white-logo.png';

class SignOut extends React.Component {

    constructor() {
        super();
        this.state = { loaded: false }
    }

    componentDidMount() {
        localStorage.clear();

        setInterval(() => {
            this.setState({ loaded: true })
        }, 2000);
    }

    render() {
        if (this.state.loaded) return <Redirect to="/signin" />

        return <div class="loading-container"><img class="loader" src={MyLifeLogo} /></div>
    }
}

export default SignOut;