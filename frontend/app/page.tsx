import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import TechnicianSection from "@/components/home/TechnicianSection";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100">
        <Hero />
        <SearchBar />
        <Categories />
        <HowItWorks />
        <Benefits />
        <TechnicianSection />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}