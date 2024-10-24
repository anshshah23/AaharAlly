"use client";
import { useRef, useEffect, useState } from "react";
import { BookingCard } from "./Card"; // Import your BookingCard component
import { motion } from "framer-motion"; // Framer Motion for smooth drag

export function BookingCarousel() {
    const carouselRef = useRef(null);
    const [carouselWidth, setCarouselWidth] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            // Calculate the total width of the cards container
            const totalWidth = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
            setCarouselWidth(totalWidth);
        }
    }, []);

    return (
        <div className="overflow-hidden w-full cursor-grab py-8" ref={carouselRef}>
            <motion.div
                drag="x"
                dragConstraints={{ left: -carouselWidth, right: 0 }}
                className="flex gap-6"
            >
                {/* Display up to 3 cards on large screens, responsive for smaller screens */}
                {Array.from({ length: 9 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3"
                    >
                        <BookingCard />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default BookingCarousel;
