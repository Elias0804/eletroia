const technicians = [
  {
    name: "Marcos Silva",
    specialty: "Refrigeração e geladeiras",
    city: "São Paulo - SP",
    rating: 4.9,
    jobs: "215 atendimentos",
  },
  {
    name: "Larissa Costa",
    specialty: "Máquinas de lavar e secar",
    city: "Rio de Janeiro - RJ",
    rating: 4.8,
    jobs: "188 atendimentos",
  },
  {
    name: "Eduardo Ramos",
    specialty: "Ar-condicionado e climatização",
    city: "Belo Horizonte - MG",
    rating: 5.0,
    jobs: "310 atendimentos",
  },
];

export default function TechnicianSection() {
  return (
    <section id="tecnicos" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Técnicos</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Especialistas perto de você
            </h2>
          </div>

          <a href="#" className="inline-flex items-center font-semibold text-blue-700 hover:text-blue-800">
            Ver todos os técnicos →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {technicians.map((tech) => (
            <div key={tech.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white">
                  {tech.name.charAt(0)}
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-700">
                  ★ {tech.rating}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">{tech.name}</h3>
              <p className="mt-2 text-slate-600">{tech.specialty}</p>
              <p className="mt-1 text-sm text-slate-500">{tech.city}</p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
                <span>{tech.jobs}</span>
                <button className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-800">
                  Solicitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}