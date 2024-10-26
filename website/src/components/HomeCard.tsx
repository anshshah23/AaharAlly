import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80">
      <img
        src={imageSrc}
        alt={title}
        width={240}
        height={160}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
