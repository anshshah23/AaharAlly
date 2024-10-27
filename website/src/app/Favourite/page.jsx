"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Image from "next/image";

const FavoriteFoods = () => {
    const [favoriteFoods, setFavoriteFoods] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useUser();
    const [likedItem, setLikedItem] = useState([]); // State to track liked items
    const [likeLoading, setLikeLoading] = useState(false); // Loading state for like action

    useEffect(() => {
        const fetchFavoriteFoods = async () => {
            try {
                const response = await fetch(`/api/fav-food-list?email=${user?.primaryEmailAddress?.emailAddress}`);
                if (response.ok) {
                    const data = await response.json();
                    setFavoriteFoods(data.favoriteFoods || []);
                } else {
                    setError("Failed to load favorite foods");
                }
            } catch (error) {
                console.error("Error fetching favorite foods:", error);
                setError("An error occurred while fetching favorite foods");
            }
        };

        if (user?.primaryEmailAddress?.emailAddress) {
            fetchFavoriteFoods();
        }
    }, [user?.primaryEmailAddress?.emailAddress]);

    const handleClick = (id) => {
        // Handle card click logic here, e.g., navigating to item details
        console.log("Card clicked, ID:", id);
    };

    const likeProduct = (isLiked, id) => {
        setLikeLoading(true);
        // Toggle like status logic here
        setLikedItem((prev) =>
            isLiked ? [...prev, id] : prev.filter((item) => item !== id)
        );
        setLikeLoading(false);
    };

    return (
        <div>
            {favoriteFoods.map((item) => (
                <Card
                    key={item._id}
                    onClick={() => handleClick(item._id)}
                    className="group w-full max-w-[26rem] shadow-lg sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] cursor-pointer hover:scale-105 hover:shadow-blue-gray-300 hover:shadow-lg transition-transform duration-300 ease-in-out"
                >
                    <CardHeader
                        color="blue-gray"
                        className="relative h-56"
                        floated={false}
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
                            className="object-cover group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300 ease-in-out"
                            loading="lazy"
                            width={500}
                            height={500}
                        />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                        <IconButton
                            size="sm"
                            color="red"
                            variant="text"
                            disabled={likeLoading}
                            className="!absolute top-4 right-4 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                likeProduct(
                                    likedItem.includes(item._id) ? false : true,
                                    item._id
                                );
                            }}
                        >
                            {likedItem.includes(item._id) ? (
                                <FaHeart className="h-6 w-6 text-red-600" />
                            ) : (
                                <FaRegHeart className="h-6 w-6" />
                            )}
                        </IconButton>
                    </CardHeader>
                    <CardBody>
                        <div className="mb-1 flex items-center justify-between">
                            <Typography
                                variant="h5"
                                color="blue-gray"
                                className="hover:text-redCustom font-medium"
                            >
                                {item.name}
                            </Typography>
                            <Typography
                                color="blue-gray"
                                className="flex items-center gap-1.5 font-normal"
                            >
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
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default FavoriteFoods;
