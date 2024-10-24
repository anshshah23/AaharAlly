import { HomeCarouse } from "@/components/Carousel";

export default function Home() {

  return (
    <>
      <main className="flex flex-col gap-8 row-start-2 items-center max-w-[1000px] justify-center m-auto">
       <HomeCarouse/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </>
    
  );
}
