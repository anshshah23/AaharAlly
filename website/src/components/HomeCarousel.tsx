import React from "react";

const Carousel = ({ children }) => {
  return (
    <div className="overflow-x-scroll scrollbar-hide flex space-x-4 p-4 -mx-4">
      {children}
    </div>
  );
};

export default Carousel;
