import { GridLayout } from "./components/grid-layout";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="pb-10 mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <GridLayout />
      {/* <Footer /> */}
    </div>
  );
}
