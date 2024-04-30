import React, { useContext } from 'react';
import { ProductsContext } from '../../context/AllProducts';


const Rating = ({ rating }) => {
  const stars = [];

  // Fill stars array based on rating value
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i}>&#9733;</span>); // Full star (Unicode character)
    } else {
      stars.push(<span key={i}>&#9734;</span>); // Empty star (Unicode character)
    }
  }

  return (
    <div>
    
      {stars}
    </div>
  );
};

export default Rating;
