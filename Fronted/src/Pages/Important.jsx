import React from 'react';
import Cards from '../Components/Cards';

const Important = () => {
  return (
    <>
      <Cards filter='important=true' pageTitle='Important Tasks'/>
    </>
  );
};

export default Important;
