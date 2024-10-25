import { BannerCarousel } from "@/components/BannerCarousel";
import FilterComponent from "@/components/Filter";
import BookingCarousel from "@/components/BookingCarousel";
import FoodItemCard from "@/components/FoodItemCard";
export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 row-start-2 items-center max-w-[1000px] justify-center m-auto">
        <BannerCarousel />
        <FilterComponent></FilterComponent>
        <FoodItemCard />
        <BookingCarousel />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </>
  );
}
