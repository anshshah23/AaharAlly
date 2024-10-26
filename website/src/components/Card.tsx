"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Food } from "@/types";
import Loading from "./loading";

export function BookingCard() {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/item-details/${id}`);
  };

  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [foodArray, setFoodArray] = useState<Food[]>([]);

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

  useEffect(() => {
    const controller = new AbortController(); // Create a new AbortController instance
    const signal = controller.signal;
    const categoryParam = searchParams.get("category");
    const regionParam = searchParams.get("region");
    const mealTypeParam = searchParams.get("meal_type");

    const categoriesArray = categoryParam
      ? categoryParam.split(",").map((cat) => cat.trim())
      : [];
    const regionsArray = regionParam
      ? regionParam.split(",").map((reg) => reg.trim())
      : [];

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/Users/`, {
          params: {
            categories: categoriesArray.join(","),
            regions: regionsArray.join(","),
            meal_type: mealTypeParam,
          },
          signal, // Pass the abort signal to the request
        });
        setFoodArray(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (categoriesArray.length > 0 || regionsArray.length > 0) {
      fetchData();
    }

    // Cleanup function to cancel the previous request if searchParams change
    return () => controller.abort();
  }, [searchParams]);

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {loading && <Loading />}
      {!loading &&
        foodArray.map((item, _id) => (
          <Card
            key={_id}
            onClick={() => handleClick(item._id)}
            className="w-full max-w-[26rem] shadow-lg sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] cursor-pointer"
            placeholder={"Cards"}
          >
            <CardHeader
              color="blue-gray"
              className="relative h-56"
              floated={false}
              placeholder={undefined}
            >
              <div className="absolute top-4 left-4 z-10">
                <div className="!rounded-full bg-peachCustom bg-opacity-85 px-2 py-1 text-white text-xs md:text-sm">
                  <div className="flex justify-start items-center text-redCustom">
                    <span className="text-sm md:text-base">
                      ⭐ {item.rating}
                    </span>
                  </div>
                </div>
              </div>
              <Image
                src={item.image}
                alt={item.name}
                className="object-cover"
                loading="lazy"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
              <IconButton
                size="sm"
                color="red"
                variant="text"
                className="!absolute top-4 right-4 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                placeholder={undefined}
              >
                {liked ? (
                  <FaHeart className="h-6 w-6 text-red-600" />
                ) : (
                  <FaRegHeart className="h-6 w-6" />
                )}
              </IconButton>
            </CardHeader>
            <CardBody
              placeholder={undefined}
            >
              <div className="mb-1 flex items-center justify-between">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="hover:text-redCustom font-medium"
                  placeholder={undefined}
                >
                  {item.name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center gap-1.5 font-normal"
                  placeholder={undefined}
                >
                  <FaStar className="text-yellow-500 h-5 w-5" />
                  {item.rating}
                </Typography>
              </div>
              <Typography
                color="gray"
                placeholder={undefined}
              >
                {item.description}
              </Typography>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}

export default BookingCard;
