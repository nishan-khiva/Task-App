import React from 'react';
import Cards from '../Components/Cards';

const Completed = () => {
  return (
    <>
      <Cards filter='complete=true' pageTitle='Completed Tasks' defaultValues={{ complete: true }} />
    </>
  );
};

export default Completed;
