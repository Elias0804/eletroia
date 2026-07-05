import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
  <>
    <Navbar />

    <main className="min-h-screen bg-slate-100">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">

        <h1 className="text-6xl font-extrabold text-blue-700">
          EletroIA
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-gray-600">
          A maior plataforma brasileira de assistência técnica inteligente para eletrodomésticos.
        </p>

        <button className="mt-10 rounded-xl bg-blue-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-800">
          Iniciar Diagnóstico
        </button>

      </section>
      <Hero />
    </main>
    <Footer />
  </>
)}