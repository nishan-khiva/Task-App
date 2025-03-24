import React from 'react';
import Cards from '../Components/Cards';

const InCompleted = () => {

  return (
    <>
      <Cards filter='complete=false' pageTitle='Incomplete Tasks' />  
    </>
  );
};

export default InCompleted;
