export default function Hero() {
  return (
    <section className="bg-slate-100 py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          🚀 Inteligência Artificial para Assistência Técnica
        </span>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl">
          Diagnóstico inteligente para
          <span className="text-blue-700"> eletrodomésticos</span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl text-gray-600">
          Descubra possíveis causas de defeitos, converse com uma IA especialista
          e encontre técnicos qualificados em todo o Brasil.
        </p>

        <div className="mt-12 flex gap-4">

          <button className="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800">
            Iniciar Diagnóstico
          </button>

          <button className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold hover:bg-gray-100">
            Encontrar Técnico
          </button>

        </div>

      </div>
    </section>
  );
}