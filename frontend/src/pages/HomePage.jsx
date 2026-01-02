import React from "react";

import Header from '../components/Header';
import Generator from '../components/Generator';
import Information from '../components/Information';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
            <Header />
            <Generator />
            <Information />
            <Footer />
        </>
    );
}

export default HomePage;