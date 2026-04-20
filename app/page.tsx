import Hero from "@/components/hero";
import About from "@/components/about";
import Features from "@/components/features";
import Storyline from "@/components/Storyline";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Features />
      <Storyline />
      <Footer />
    </main>
  );
}
