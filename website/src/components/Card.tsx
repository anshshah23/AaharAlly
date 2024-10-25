"use client";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaHeart, FaDollarSign, FaTruck, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dummyData from "./data/dummy";

export function BookingCard() {
    const [liked, setLiked] = useState(false);
    const router = useRouter();
    const handleClick = (id) => {
        router.push(`/itemDetails/${id}`);
    };
    
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {dummyData.map((item, id) => (
                <Card
                    key={id}
                    onClick={() => handleClick(item.id)}
                    className="w-full max-w-[26rem] shadow-lg sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] mb-20"
                >
                    <CardHeader floated={false} color="blue-gray" className="relative h-56">
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
                            alt="restaurant image"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                        <IconButton
                            size="sm"
                            color="red"
                            variant="text"
                            className="!absolute top-4 right-4 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation(); // To prevent triggering handleClick
                                setLiked(!liked);
                            }}
                        >
                            {liked ? <FaHeart className="h-6 w-6 text-red-600" /> : <FaRegHeart className="h-6 w-6" />}
                        </IconButton>
                    </CardHeader>
                    <CardBody>
                        <div className="mb-1 flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray" className="hover:text-redCustom font-medium">
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
