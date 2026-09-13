const steps = [
  {
    number: "01",
    title: "Descreva o problema",
    description: "Conte em poucas palavras o sintoma do aparelho e o que aconteceu antes da falha.",
  },
  {
    number: "02",
    title: "Receba análise da IA",
    description: "A plataforma identifica padrões comuns e sugere as causas mais prováveis.",
  },
  {
    number: "03",
    title: "Conecte-se com especialistas",
    description: "Encontre profissionais qualificados e agende atendimento com segurança.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Como funciona</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Diagnóstico rápido, simples e confiável
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}