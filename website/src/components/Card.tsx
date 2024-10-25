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
import DummyData from "./data/dummy";

export function BookingCard() {
    const [liked, setLiked] = useState(false);
    const data = DummyData[0];

    return (
        <Card className="w-full max-w-[26rem] shadow-lg sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] mb-20">
            <CardHeader floated={false} color="blue-gray" className="relative h-56">
                <div className="absolute top-4 left-4 z-10">
                    <div className="!rounded-full bg-peachCustom bg-opacity-85 px-2 py-1 text-white text-xs md:text-sm">
                        <div className="flex justify-start items-center text-redCustom">
                            <span className="text-sm md:text-base">
                                ⭐ {data.rating} ({data.reviews}+)
                            </span>
                        </div>
                    </div>
                </div>
                <Image
                    src={data.imageUrl}
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
                    onClick={() => setLiked(!liked)}
                >
                    {liked ? <FaHeart className="h-6 w-6 text-red-600" /> : <FaRegHeart className="h-6 w-6" />}
                </IconButton>
            </CardHeader>
            <CardBody>
                <div className="mb-1 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        {data.name}
                    </Typography>
                    <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
                        <FaStar className="text-yellow-500 h-5 w-5" />
                        {data.rating}
                    </Typography>
                </div>
                <Typography color="gray">
                    {data.description}
                </Typography>
                <div className="mt-2 inline-flex flex-wrap items-center gap-3">
                    <Tooltip content={data.priceInfo}>
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100">
                            <FaDollarSign className="h-5 w-5" />
                        </span>
                    </Tooltip>
                    <Tooltip content={data.deliveryInfo}>
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100">
                            <FaTruck className="h-5 w-5" />
                        </span>
                    </Tooltip>
                </div>
            </CardBody>
        </Card>
    );
}

export default BookingCard;
