"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
 
export function BannerCarousel() {
  return (
    <Carousel
      placeholder={"HomeCarousel"}
      className="rounded-3xl h-[40vh]"
      autoplay={true}
      loop={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 hidden -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-3xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"}`}
              onClick={() => setActiveIndex(i)} />
          ))}
        </div>
      )} 
      >
      <Image
        src={"/images/food1.svg"}
        alt="image 1"
        className="h-full w-full object-cover"
        width={500}
        height={500}
      />
      <Image
        src={"/images/food2.svg"}
        alt="image 2"
        className="h-full w-full object-cover"
        width={500}
        height={500}
      />
      <Image
        src={"/images/food3.svg"}
        alt="image 3"
        className="h-full w-full object-cover"
        width={500}
        height={500}
      />
    </Carousel>
  );
}
