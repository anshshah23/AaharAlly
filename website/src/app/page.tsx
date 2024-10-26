"use client";
import Navbar from "@/components/navigation";
import Image from "next/image";
import Carousel from "@/components/HomeCarousel";
import Card from "@/components/HomeCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [foodArray, setFoodArray] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchFood = async () => {
      try {
        const resp = await axios.get("/api/Users/");
        setFoodArray(resp.data.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, []);

  // Assuming foodArray contains the necessary data for rendering
  const featuredItems = foodArray.slice(0, 5); // Adjust slicing as per your data structure
  const popularChoices = foodArray.slice(5, 13); // Adjust slicing as per your data structure

  return (
    <>
      <Navbar />
      <div className="relative">
        <Image
          src="/images/food1.svg"
          alt="hero"
          width={1920}
          height={1080}
          className="w-full h-[50vh] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="flex justify-center min-w-[100px] sm:min-w-[360px] !max-w-[200px] sm:max-w-[360px]">
            <div className="flex bg-white py-2.5 pl-2 pr-1 rounded-l-lg items-center gap-1.5 w-full max-w-[280px] sm:max-w-xl">
              <svg
                className="text-redCustom min-w-[20px] min-h-[20px] fill-redCustom"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              <input
                type="text"
                className="py-1 outline-none max-w-[156px] sm:max-w-none placeholder:text-xs sm:placeholder:text-sm"
                placeholder="Our Offerings"
              />
            </div>
            <button
              className="bg-redCustom px-6 py-1 text-base lg:text-lg font-semibold text-white rounded-r-lg shadow-md "
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-10 px-6 lg:px-12 bg-gray-50">
        <section className="my-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Items</h2>
          <Carousel>
            <div className="flex gap-6">
              {featuredItems.map((item, index) => (
                <Card
                  key={index}
                  title={item.name} // Adjust based on your data structure
                  description={item.description} // Adjust based on your data structure
                  imageSrc={item.image}
                />
              ))}
            </div>
          </Carousel>
        </section>

        <section className="my-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Popular Choices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularChoices.map((item, index) => (
              <Card
                key={index}
                title={item.title} // Adjust based on your data structure
                description={item.description} // Adjust based on your data structure
                imageSrc={item.image} // Adjust based on your data structure
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
