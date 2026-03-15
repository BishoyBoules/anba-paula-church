import React from 'react';
import Features from '../components/Features/Features';
import NewsSlider from '../components/NewsSlider/NewsSlider';
import NewsTicker from '../components/NewsTicker/NewsTicker';

const Home: React.FC = () => {
  return (
    <>
      <NewsSlider />
      <Features />
      <NewsTicker />
    </>
  );
};

export default Home;
