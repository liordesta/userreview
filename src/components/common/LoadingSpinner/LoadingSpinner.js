import React from 'react';
import spinner from '../../../assets/spinner.svg';

export const LoadingSpinner = () => {
  return (
    <div>
      <img src={spinner} alt='Loading...' />
    </div>
  );
};
