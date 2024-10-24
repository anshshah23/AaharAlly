"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
 
export function HomeCarouse() {
  return (
    <Carousel
      placeholder={"HomeCarousel"}
      className="rounded-3xl h-[60vh]"
      autoplay={true}
      loop={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-3xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"}`}
              onClick={() => setActiveIndex(i)} />
          ))}
        </div>
      )} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <Image
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
        width={500}
        height={500}
      />
      <Image
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
        width={500}
        height={500}
      />
      <Image
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
        width={500}
        height={500}
      />
    </Carousel>
  );
}
