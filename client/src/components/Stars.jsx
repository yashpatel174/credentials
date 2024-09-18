// Starfield.js
import React from "react";

const generateStars = (numStars) => {
  return Array.from({ length: numStars }).map((_, index) => ({
    id: index,
    style: {
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 10}s`,
    },
  }));
};

const Stars = ({ numStars = 100 }) => {
  const stars = generateStars(numStars);

  return (
    <div className="position-fixed top-0 left-0 w-100vw h-100vh pointerEvents-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={star.style}
        />
      ))}
    </div>
  );
};

export default Stars;
