import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractiveUnionMap from '../components/InteractiveUnionMap';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
     
      <div className="">
        <InteractiveUnionMap />
      </div>
    </div>
  );
};

export default HomePage;
