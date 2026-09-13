const benefits = [
  {
    title: "Diagnóstico preciso",
    description: "IA especializada em eletrodomésticos reduz tempo de investigação e aumenta acurácia.",
  },
  {
    title: "Rede de técnicos",
    description: "Conecte-se com profissionais verificados por região e especialidade.",
  },
  {
    title: "Economia de tempo",
    description: "Evite tentativas aleatórias e entenda antes de comprar peças ou chamar um serviço.",
  },
  {
    title: "Acompanhamento completo",
    description: "Tudo em um só lugar: diagnóstico, histórico, orçamento e suporte técnico.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-slate-100 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Vantagens</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Simples para clientes, poderoso para técnicos
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl">⚡</div>
              <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
              <p className="mt-3 text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}