import { BannerCarousel } from "@/components/BannerCarousel";
import FilterComponent from "@/components/Filter";
import BookingCarousel from "@/components/BookingCarousel";
import FoodItemCard from "@/components/FoodItemCard";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 items-center max w-full mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">
        <BannerCarousel />
        <FilterComponent />
        <FoodItemCard />
        <Card />
      </main>
    </>
  );
}
