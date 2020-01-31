import React from 'react';
import Header from './Header';
import Section from './Section';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container text-muted">
        <Section />
      </div>
    </div>
  );
};

export default Home;
