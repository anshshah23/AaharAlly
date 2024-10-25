"use client";
import { useState } from "react";
import { FaBurger } from "react-icons/fa6";
import { PizzaIcon, DonutIcon} from "lucide-react"; // Icons from lucide-react
import { GiTacos, GiNoodles } from "react-icons/gi";

const foodCategories = [
    { name: "Burger", icon: FaBurger },
    { name: "Pizza", icon: PizzaIcon },
    { name: "Donut", icon: DonutIcon },
    { name: "Taco", icon: GiTacos },
    { name: "Noodles", icon: GiNoodles },
];

function FoodCategoryCards() {
    const [selectedCategory, setSelectedCategory] = useState("Burger");

    return (
        <div className="flex space-x-4">
            {foodCategories.map((category) => {
                const IconComponent = category.icon; // Destructure the icon component

                return (
                    <div
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex flex-col items-center w-[60px] h-[80px] px-4 py-4 rounded-full cursor-pointer transition-all duration-300
                            ${selectedCategory === category.name ? 'bg-orangeCustom shadow-lg' : 'bg-white shadow-md'}
                        `}
                        style={{
                            boxShadow: selectedCategory === category.name 
                                ? "0px 10px 25px rgba(255, 165, 0, 0.3)" // strong shadow for selected
                                : "0px 8px 20px rgba(0, 0, 0, 0.1)"   // subtle shadow for unselected
                        }}
                    >
                        <div className="mb-2">
                            <IconComponent size={20} className="text-gray-800" />
                        </div>
                        <span
                            className={`text-xs ${
                                selectedCategory === category.name ? 'text-white' : 'text-gray-800'
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
