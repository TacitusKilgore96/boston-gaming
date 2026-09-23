import Contact from "@/components/Contact";
import Slider from "@/components/Slider";
import About from "@/pages/About";
import Design from "@/pages/Design";
import Products from "@/pages/Products";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <main className="">

        {/* HERO */}
        <section className="relative h-170 overflow-hidden bg-slate-950">
          <Slider />
          <div className="relative z-10 flex min-h-[560px] items-start justify-center px-6 py-16 text-center text-white">
          </div>
        </section>

        {/* PRODUCTS */}
        <section>
          <Products />
        </section>

        {/* DESIGN YOUR OWN RIG! */}
        <section>
          <Design />
        </section>

        {/* ABOUT */}
        <section>
          <About />
        </section>

        {/* CONTACT US */}
        <section>
          <Contact />
        </section>

      </main>
    </div>
  );
}
