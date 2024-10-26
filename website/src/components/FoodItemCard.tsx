"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const foodCategories = [
  { name: "Breakfast", img: "/images/brunch.svg" }, // Correct path for images in the public folder
  { name: "Lunch", img: "/images/meal.svg" }, // Use absolute path
  { name: "Dinner", img: "/images/dinner.svg" }, // Use absolute path
];

function FoodCategoryCards() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    const mealType = searchParams.get("meal_type") ?? undefined;

    console.log("meal type: " + mealType);
    setSelectedCategory(mealType);
  }, [searchParams]);

  const handleCategoryClick = (category: { name: string }) => {
    setSelectedCategory(category.name);

    // Get the current URL search parameters
    const params = new URLSearchParams(searchParams.toString());

    // Set or update the meal_type parameter
    params.set("meal_type", category.name);

    // Update the URL with the new query string, preserving other parameters
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex space-x-4 md:space-x-6">
      {foodCategories.map((category) => {
        return (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className={`flex flex-col items-center w-[50px] h-[70px] md:w-[80px] md:h-[100px] p-2 md:p-5   rounded-full cursor-pointer transition-all duration-300
              ${
                selectedCategory === category.name
                  ? "bg-orangeCustom shadow-xl"
                  : "bg-white shadow-md"
              }`}
            style={{
              boxShadow:
                selectedCategory === category.name
                  ? "0px 10px 25px rgba(255, 165, 0, 0.3)"
                  : "0px 8px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="mb-1 md:mb-2 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out">
              <Image
                src={category.img}
                alt={category.name}
                width={500}
                height={500}
              />
            </div>
            <span
              className={`text-xs font-bold ${
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
