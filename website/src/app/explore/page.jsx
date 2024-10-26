import AgeModal from "@/components/AgeModal"; // Adjust the path as necessary
import { BannerCarousel } from "@/components/BannerCarousel";
import FilterComponent from "@/components/Filter";
import FoodItemCard from "@/components/FoodItemCard";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

const Page = () => {
    return (
        <div>
            <Navbar />

            <AgeModal /> {/* Include the Age Modal here */}
            <main className="flex flex-col gap-8 items-center max w-full justify-center mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">
                <BannerCarousel />
                <FilterComponent />
                <FoodItemCard />
                <Card />
            </main>
        </div>
    )
}

export default Page