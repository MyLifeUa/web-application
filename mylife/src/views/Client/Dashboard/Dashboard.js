import React from 'react';

import SignOut from '../../../components/SignOut/SignOut';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            signOut: false
        }
        this.signOut = this.signOut.bind(this);
    }

    
    signOut() {
        localStorage.clear();
        this.setState({
            signOut: true
        })
    }

    render() {
        if(this.state.signOut) return <SignOut />
        return (
            <div id="client-dashboard">Client Dashboard<br /><button onClick={this.signOut}>Log out</button></div>
        );
    }
}

export default Dashboard;