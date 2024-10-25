"use client";
import {
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dummyData from "./data/dummy";

export function BookingCard() {
    const [likedItems, setLikedItems] = useState({});
    const router = useRouter();

    const handleClick = (id) => {
        router.push(`/itemDetails/${id}`);
    };

    const toggleLike = (id) => {
        setLikedItems((prevLikedItems) => ({
            ...prevLikedItems,
            [id]: !prevLikedItems[id],
        }));
    };

    return (
        <div className="flex flex-wrap justify-center gap-8">
            {dummyData.map((item) => (
                <Card
                    key={item.id}
                    className="w-full max-w-[26rem] shadow-lg sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] mb-20 cursor-pointer"
                >
                    <CardHeader floated={false} color="blue-gray" className="relative h-56">
                        <div className="absolute top-4 left-4 z-10">
                            <div className="rounded-full bg-peachCustom bg-opacity-85 px-2 py-1 text-white text-xs md:text-sm">
                                <div className="flex items-center text-redCustom">
                                    <span className="text-sm md:text-base">
                                        ⭐ {item.rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-full">
                            <Image
                                src={item.image}
                                alt={`${item.name} image`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                            />
                        </div>
                        <IconButton
                            size="sm"
                            color="red"
                            variant="text"
                            className="absolute top-4 right-4 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(item.id);
                            }}
                        >
                            {likedItems[item.id] ? (
                                <FaHeart className="h-6 w-6 text-red-600" />
                            ) : (
                                <FaRegHeart className="h-6 w-6" />
                            )}
                        </IconButton>
                    </CardHeader>
                    <CardBody>
                        <div className="mb-1 flex items-center justify-between">
                            <Typography
                                onClick={() => handleClick(item.id)}
                                variant="h5" color="blue-gray" className="hover:text-redCustom font-medium">
                                {item.name}
                            </Typography>
                            <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
                                <FaStar className="text-yellow-500 h-5 w-5" />
                                {item.rating}
                            </Typography>
                        </div>
                        <Typography color="gray">
                            {item.description}
                        </Typography>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}

export default BookingCard;
