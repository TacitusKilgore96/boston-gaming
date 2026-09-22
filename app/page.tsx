import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <main className="">

        {/* Hero */}
        <section className="relative h-170 overflow-hidden bg-slate-950">
          <Slider />
          <div className="relative z-10 flex min-h-[560px] items-start justify-center px-6 py-16 text-center text-white">
          </div>
        </section>

      </main>
    </div>
  );
}
