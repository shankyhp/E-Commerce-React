import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top on mount
    }, []);

    return (
        <div>
            <Hero />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsletterBox />
        </div>
    );
};

export default Home;
