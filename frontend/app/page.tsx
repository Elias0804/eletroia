"use client";

import { useState } from "react";

type DiagnosticIssue = {
  id: number;
  title: string;
  description: string;
  symptoms: string[];
  solution: string;
};

type DiagnosticResult = {
  query: string[];
  recommendations: DiagnosticIssue[];
};

async function analyzeSymptoms(symptoms: string[]) {
  const response = await fetch("http://localhost:8000/api/diagnostic/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erro ao analisar sintomas.");
  }

  return response.json() as Promise<DiagnosticResult>;
}

export default function Home() {
  const [symptomText, setSymptomText] = useState("");
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const symptoms = symptomText
        .split(/\n|,|;/)
        .map((item) => item.trim())
        .filter(Boolean);

      if (symptoms.length === 0) {
        setError("Por favor, descreva ao menos um sintoma.");
        setLoading(false);
        return;
      }

      const response = await analyzeSymptoms(symptoms);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-100 to-slate-100 px-6 py-12 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-200/50 backdrop-blur">
        <section className="space-y-4 text-center">
          <h1 className="text-5xl font-semibold text-sky-700">EletroIA</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Diagnóstico rápido para problemas de aparelhos elétricos e eletrônicos. Descreva os sintomas e obtenha recomendações.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <label className="grid gap-3 text-sm font-medium text-slate-700">
            Quais sintomas o aparelho apresenta?
            <textarea
              value={symptomText}
              onChange={(event) => setSymptomText(event.target.value)}
              rows={6}
              placeholder="Ex: não liga, faz barulho, esquenta"
              className="min-h-[180px] resize-none rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-white shadow-lg shadow-sky-200/50 transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Analisando..." : "Iniciar Diagnóstico"}
          </button>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>
          ) : null}

          {result ? (
            <section className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Recomendações</h2>
                <p className="mt-2 text-sm text-slate-600">Problemas detectados com base nos sintomas informados.</p>
              </div>
              <div className="space-y-5">
                {result.recommendations.map((item) => (
                  <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    <div className="mt-4 text-sm text-slate-600">
                      <strong>Sintomas relacionados:</strong> {item.symptoms.join(", ")}
                    </div>
                    <div className="mt-4 rounded-3xl bg-sky-50 px-4 py-3 text-sm text-sky-800">
                      <strong>Solução sugerida:</strong> {item.solution}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </form>
      </div>
    </main>
  );
}
