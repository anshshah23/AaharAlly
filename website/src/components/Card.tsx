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
import { useRouter } from "next/navigation";
import axios from "axios";
import { Food } from "@/types";
// import Dummp from "./data/dummy";

function convertPrice(priceString: string) {
  const priceRange = priceString.split("-");
  const minPrice = parseFloat(priceRange[0].slice(1)); // Remove dollar sign
  return minPrice;
}
export function BookingCard() {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/itemDetails/${id}`);
  };

  const [foodArray, setFoodArray] = useState<Food[]>([]);

  useEffect(() => {
    const fetchFood = async () => {
      const resp = await axios.get("/api/Users/", {});
      console.log({ resp });
      setFoodArray(resp.data.data);
    };
    fetchFood();
  }, []);
  console.log({ foodArray });
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {foodArray.map((item, id) => (
        <Card
          key={id}
          onClick={() => handleClick(item.id)}
          className="w-full max-w-[26rem] shadow-lg sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] mb-20"
          placeholder={"Cards"}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardHeader
            floated={false}
            color="blue-gray"
            className="relative h-56"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="absolute top-4 left-4 z-10">
              <div className="!rounded-full bg-peachCustom bg-opacity-85 px-2 py-1 text-white text-xs md:text-sm">
                <div className="flex justify-start items-center text-redCustom">
                  <span className="text-sm md:text-base">⭐ {item.rating}</span>
                </div>
              </div>
            </div>
            <Image
              src={item.image}
              alt="restaurant image"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
            <IconButton
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              size="sm"
              color="red"
              variant="text"
              className="!absolute top-4 right-4 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="mb-1 flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="hover:text-redCustom font-medium"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {item.name}
              </Typography>
              <Typography
                color="blue-gray"
                className="flex items-center gap-1.5 font-normal"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <FaStar className="text-yellow-500 h-5 w-5" />
                {item.rating}
              </Typography>
            </div>
            <Typography
              color="gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
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
