import React from 'react';
import Features from '../components/Features/Features';
import NewsSlider from '../components/NewsSlider/NewsSlider';

const Home: React.FC = () => {
  return (
    <>
      <NewsSlider />
      <Features />
    </>
  );
};

export default Home;
