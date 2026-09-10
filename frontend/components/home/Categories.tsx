const categories = [
  "🧊 Geladeira",
  "🧺 Lava e Seca",
  "🧼 Máquina de Lavar",
  "❄️ Ar-Condicionado",
  "🍽️ Lava-Louças",
  "🔥 Fogão",
  "📡 Micro-ondas",
  "🥶 Freezer",
];

export default function Categories() {
  return (
    <section className="bg-slate-100 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Escolha seu equipamento
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-xl bg-white p-6 text-lg font-semibold shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}