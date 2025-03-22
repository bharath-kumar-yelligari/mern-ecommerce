import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"; // Star icons

const StarRating = ({ rating=0 }) => {
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 !== 0; // Half star if rating is decimal
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="star-rating-color">
        
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} />
      ))}

      {/* Half Star */}
      {halfStar && <FaStarHalfAlt />}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  );
};

export default StarRating;
