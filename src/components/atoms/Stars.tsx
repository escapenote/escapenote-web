import React from 'react';

import iconStarYellow from 'assets/icons/star-yellow.svg';
import iconStarGrey from 'assets/icons/star-grey.svg';
import iconStarHalf from 'assets/icons/star-half.svg';

interface IProps {
  size?: string;
  rating?: number;
}
const Stars: React.FC<IProps> = ({ size = '14px', rating = 0 }) => {
  const div = 5 - Math.floor(rating);
  const mod = Math.abs(5 - div - rating);
  const isHalf = mod > 0 && mod < 1;

  return (
    <span>
      {Array.from({ length: rating }, (_, i) => (
        <img
          key={i}
          src={iconStarYellow}
          alt="star-yellow"
          width={size}
          height={size}
        />
      ))}
      {isHalf && (
        <img src={iconStarHalf} alt="star-grey" width={size} height={size} />
      )}
      {Array.from({ length: 5 - rating }, (_, i) => (
        <img
          key={i}
          src={iconStarGrey}
          alt="star-grey"
          width={size}
          height={size}
        />
      ))}
    </span>
  );
};

export default Stars;
