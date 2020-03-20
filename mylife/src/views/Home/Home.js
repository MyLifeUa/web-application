import React from 'react';
import { Router, Switch, Route, useHistory } from "react-router-dom";



// import components
import Header from '../../components/Home/Header/Header';
import HomeSection from '../../components/Home/HomeSection/HomeSection';
import Intro from '../../components/Home/Intro/Intro';
import Work from '../../components/Home/Work/Work';
import Testimonials from '../../components/Home/Testimonials/Testimonials';
import Services from '../../components/Home/Services/Services';
import About from '../../components/Home/About/About';
import Counters from '../../components/Home/Counters/Counters';
import Contacts from '../../components/Home/Contacts/Contacts';
import Footer from '../../components/Home/Footer/Footer';

function Home() {
    return (
        <div id="home">
            <Header />
            <HomeSection />
            <Intro />
            <Services />
            <About />
            <Work />
            <Counters />
            <Contacts />
            <Footer />
        </div>
    );
}

export default Home;