export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-sky-600 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Comece hoje</p>
        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          Resolva o problema do seu eletrodoméstico sem perder tempo
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-50">
          Use a IA para diagnosticar, confirme com especialistas e tenha uma solução mais rápida e segura.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#diagnostico" className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-slate-100">
            Fazer diagnóstico
          </a>
          <a href="#tecnicos" className="rounded-xl border border-white/50 bg-transparent px-8 py-4 font-semibold text-white transition hover:bg-white/10">
            Ver técnicos
          </a>
        </div>
      </div>
    </section>
  );
}