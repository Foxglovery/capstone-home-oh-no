import React from 'react';
import { AllHomesList } from '../AllHomesList/AllHomesList';
import "./HomePage.css"
import { Logo } from '../Logo/Logo';
export const HomePage = () => {
  return (
    <>

      <Logo />
      <AllHomesList />
    </>
  );
}

export default HomePage;
