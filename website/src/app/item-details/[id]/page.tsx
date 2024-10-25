"use client";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { Food } from "@/types";
import axios from "axios";
import Loading from "@/components/loading";

function convertPrice(priceString: string) {
  const priceRange = priceString.split("-");
  const minPrice = parseFloat(priceRange[0].slice(1));
  return minPrice;
}

const TacoCard = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(false);
  const unwrappedParams = use<{ id: string }>(params);

  const id = unwrappedParams.id;
  const [itemDetails, setItemDetails] = useState<Food>();

  // Example pairings
  const pairings = ["Mojito", "French Fries", "Chips"];

  useEffect(() => {
    const controller = new AbortController();
    const fetchDetails = async () => {
      try {
        setLoading(true);
        console.log("calling details");
        const resp = await axios.get("/api/Users/", {
          params: { id },
          signal: controller.signal,
        });
        console.log({ resp });
        setItemDetails(resp.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
    return () => controller.abort();
  }, [id]);

  return (
    <>
      {loading && <Loading />}
      {!loading && itemDetails && (
        <div className="w-full max-w-full min-h-full my-auto mx-auto bg-white rounded-xl p-5 lg:p-8 transition-all duration-300 flex flex-col lg:flex-row shadow-lg">
          <div className="relative w-full lg:w-1/3 h-full lg:h-auto mb-5 lg:mb-0 lg:mr-8">
            <Image
              src={itemDetails.image}
              alt={itemDetails.name}
              width={400}
              height={400}
              className="rounded-xl w-full h-[75vh] object-cover shadow-lg shadow-gray-600 "
            />
            <button className="absolute top-2 right-2 text-2xl text-red-500 focus:outline-none">
              ❤️
            </button>
          </div>

          <div className="flex-grow flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold">
                {itemDetails.name}
              </h2>
              <div className="flex justify-start items-center text-gray-600 mt-2">
                <span className="text-sm md:text-base mx-4">
                  ⭐ {itemDetails.rating}
                </span>
                <div className="flex flex-col md:flex-row justify-start items-center mt-2">
                  <div className="flex justify-start items-center">
                    <p className="text-2xl md:text-3xl text-orange-500 font-bold">
                      $ {convertPrice(itemDetails.price)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mt-3 text-sm md:text-lg">
                {itemDetails.description}
              </p>

              <div className="flex justify-start items-center mt-5">
                <span className="font-semibold">Pair me with:</span>
                <div className="flex flex-wrap gap-2 ml-2">
                  {pairings.map((pairing, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-600 p-1 rounded"
                    >
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutritional Info */}
              <div className="mt-5 border-t pt-4">
                <h3 className="text-lg font-semibold">Nutritional Info:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Calories: 250</li>
                  <li>Protein: 12g</li>
                  <li>Carbs: 30g</li>
                  <li>Fat: 10g</li>
                </ul>
              </div>

              {/* User Reviews */}
              <div className="mt-5 border-t pt-4">
                <h3 className="text-lg font-semibold">User Reviews:</h3>
                <div className="text-gray-600">
                  <p><strong>Jane:</strong> Absolutely delicious&#x21;</p>
                  <p><strong>Mark:</strong> The best thing Ive ever had&#x21;</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5">
              <button className="bg-orangeCustom text-white p-2 rounded-lg shadow-lg shadow-orangeCustom hover:bg-deep-orange-600 transition duration-300">
                Add to Cart
              </button>
              <button className="bg-greenCustom text-white p-2 rounded-lg shadow-lg shadow-greenCustom hover:bg-light-green-600 transition duration-300">
                View Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TacoCard;
