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
        <div className="w-full max-w-full min-h-full my-auto mx-auto bg-white rounded-xl p-5 lg:p-8 transition-all duration-300 flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/3 h-full lg:h-auto mb-5 lg:mb-0 lg:mr-8">
            <Image
              src={itemDetails.image}
              alt="Ground Beef Tacos"
              width={400}
              height={400}
              className="rounded-xl w-full h-full object-cover shadow-lg shadow-gray-600"
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
                <span className="text-sm md:text-base">
                  ⭐{itemDetails.rating}{" "}
                </span>
              </div>
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
          </div>
        </div>
      )}
    </>
  );
};

export default TacoCard;
