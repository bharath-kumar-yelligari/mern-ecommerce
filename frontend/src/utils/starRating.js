import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"; // Star icons

const StarRating = ({ rating = 0, colorVal = "green" }) => {
  console.log("colorVal", colorVal)
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 !== 0; // Half star if rating is decimal
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="star-rating-color">

      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} style={{ color: colorVal }} />
      ))}

      {/* Half Star */}
      {halfStar && <FaStarHalfAlt style={{ color: colorVal }} />}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} style={{ color: colorVal }} />
      ))}
    </div>
  );
};

export default StarRating;
