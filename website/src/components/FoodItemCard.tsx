"use client";
import { useState } from "react";
import { MdFreeBreakfast, MdDinnerDining, MdLunchDining } from "react-icons/md";

const foodCategories = [
  { name: "Breakfast", icon: MdFreeBreakfast },
  { name: "Launch", icon: MdLunchDining },
  { name: "Dinner", icon: MdDinnerDining },
];

function FoodCategoryCards() {
  const [selectedCategory, setSelectedCategory] = useState("Burger");

  return (
    <div className="flex space-x-4 md:space-x-6">
      {foodCategories.map((category) => {
        const IconComponent = category.icon; // Destructure the icon component

        return (
          <div
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex flex-col items-center w-[50px] h-[70px] md:w-[60px] md:h-[80px] p-2 md:p-4 rounded-full cursor-pointer transition-all duration-300
                            ${
                              selectedCategory === category.name
                                ? "bg-orangeCustom shadow-lg"
                                : "bg-white shadow-md"
                            }
                        `}
            style={{
              boxShadow:
                selectedCategory === category.name
                  ? "0px 10px 25px rgba(255, 165, 0, 0.3)" // strong shadow for selected
                  : "0px 8px 20px rgba(0, 0, 0, 0.1)", // subtle shadow for unselected
            }}
          >
            <div className="mb-1 md:mb-2">
              <IconComponent size={20} className="text-gray-800" />
            </div>
            <span
              className={`text-xs ${
                selectedCategory === category.name
                  ? "text-white"
                  : "text-gray-800"
              }`}
            >
              {category.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default FoodCategoryCards;
