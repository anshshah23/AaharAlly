"use client";
import { useState } from "react";
import Image from "next/image";

const foodCategories = [
  { name: "Breakfast", img: "/images/brunch.svg" }, // Correct path for images in the public folder
  { name: "Lunch", img: "/images/meal.svg" },       // Use absolute path
  { name: "Dinner", img: "/images/dinner.svg" },     // Use absolute path
];

function FoodCategoryCards() {
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");

  return (
    <div className="flex space-x-4 md:space-x-6">
      {foodCategories.map((category) => (
        <div
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
          className={`flex flex-col items-center w-[50px] h-[70px] md:w-[80px] md:h-[100px] p-2 md:p-4 rounded-full cursor-pointer transition-all duration-300
                        ${selectedCategory === category.name ? "bg-orangeCustom shadow-lg" : "bg-white shadow-md"}
                    `}
          style={{
            boxShadow:
              selectedCategory === category.name
                ? "0px 10px 25px rgba(255, 165, 0, 0.3)" // strong shadow for selected
                : "0px 8px 20px rgba(0, 0, 0, 0.1)", // subtle shadow for unselected
          }}
        >
          <div className="mb-1 md:mb-2">
            <Image src={category.img} width={40} height={40} alt={category.name} /> {/* Add width and height for Image */}
          </div>
          <span
            className={`text-xs ${
              selectedCategory === category.name ? "text-white" : "text-gray-800"
            }`}
          >
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default FoodCategoryCards;
