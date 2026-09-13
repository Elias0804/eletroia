"use client";

import { useState } from "react";

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
  const [selectedCategory, setSelectedCategory] = useState("🧊 Geladeira");

  return (
    <section className="bg-slate-100 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
          Escolha seu equipamento
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => {
            const isSelected = category === selectedCategory;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-2xl border p-6 text-lg font-semibold shadow-sm transition ${
                  isSelected
                    ? "border-blue-700 bg-blue-700 text-white shadow-lg shadow-blue-200"
                    : "border-slate-200 bg-white text-slate-800 hover:-translate-y-1 hover:shadow-lg"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-blue-200 bg-white px-6 py-4 text-center text-slate-700">
          Equipamento atual: <span className="font-bold text-blue-700">{selectedCategory}</span>
        </div>
      </div>
    </section>
  );
}