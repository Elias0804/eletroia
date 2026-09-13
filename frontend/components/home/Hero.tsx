export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-sky-50 via-white to-slate-100 py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <span className="rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
          🚀 Inteligência Artificial para Assistência Técnica
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">
          Diagnóstico inteligente para
          <span className="block text-blue-700"> eletrodomésticos</span>
        </h1>

        <p className="mt-8 max-w-3xl text-xl text-slate-600">
          Descubra possíveis causas de defeitos, converse com uma IA especialista
          e conecte-se com técnicos qualificados em todo o Brasil.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            href="#diagnostico"
            className="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
          >
            Iniciar Diagnóstico
          </a>

          <a
            href="#tecnicos"
            className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Encontrar Técnico
          </a>
        </div>

        <div className="mt-14 grid w-full max-w-5xl grid-cols-1 gap-4 text-left md:grid-cols-3">
          {[
            { value: "4.9/5", label: "Avaliação média" },
            { value: "12k+", label: "Diagnósticos resolvidos" },
            { value: "300+", label: "Técnicos parceiros" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-extrabold text-blue-700">{item.value}</div>
              <p className="mt-2 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}