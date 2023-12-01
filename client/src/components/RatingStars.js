import React from 'react';
import StarIcon from '@mui/icons-material/StarRounded';
import StarBorderIcon from '@mui/icons-material/StarBorderRounded';
import StarHalfIcon from '@mui/icons-material/StarHalfRounded';
import "../styles/PopularProd.css"

const RatingStars = ({ rating }) => {
  const MAX_STARS = 5;
  const stars = [];

  for (let i = 1; i <= MAX_STARS; i++) {
    if (i <= rating) {
      stars.push(<StarIcon key={i} />);
    } else if (i - 0.5 === rating) {
      stars.push(<StarHalfIcon key={i} />);
    } else {
      stars.push(<StarBorderIcon key={i} />);
    }
  }

  return <div className='stars'>{stars}</div>;
};

export default RatingStars;