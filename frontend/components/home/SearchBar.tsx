"use client";

import { useMemo, useState } from "react";
import { diagnoseIssue } from "@/services/diagnostic";

const diagnosticHints: Record<string, string[]> = {
  "🧊 Geladeira": [
    "não está gelando",
    "faz barulho",
    "vibração excessiva",
    "gelo em excesso",
  ],
  "🧺 Lava e Seca": [
    "não liga",
    "não seca",
    "vaza água",
    "erro de drenagem",
  ],
  "🧼 Máquina de Lavar": [
    "não centrifuga",
    "não escoa",
    "vibra muito",
    "desliga sozinha",
  ],
  "❄️ Ar-Condicionado": [
    "não resfria",
    "vaza água",
    "barulho estranho",
    "cheiro forte",
  ],
  "🍽️ Lava-Louças": [
    "não aquece",
    "não drena",
    "não inicia",
    "aparece código de erro",
  ],
  "🔥 Fogão": [
    "não acende",
    "chama irregular",
    "faíscas",
    "botão travado",
  ],
  "📡 Micro-ondas": [
    "não aquece",
    "luz acende",
    "toca sem aquecer",
    "porta não fecha",
  ],
  "🥶 Freezer": [
    "congela demais",
    "não liga",
    "forma gelo",
    "temperatura instável",
  ],
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("🧊 Geladeira");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    title: string;
    details: string;
    recommendations: Array<{ title: string; description: string; solution: string; confidence: number; follow_up_questions: string[] }>; 
  } | null>(null);

  const diagnosis = useMemo(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      return {
        title: "Descreva o defeito para receber uma análise inicial.",
        details: "Exemplo: minha geladeira não está gelando e o motor está funcionando.",
      };
    }

    const hints = diagnosticHints[selectedCategory] ?? diagnosticHints["🧊 Geladeira"];
    const matchingHint = hints.find((hint) => trimmed.toLowerCase().includes(hint));

    return {
      title: `Possível causa em ${selectedCategory}`,
      details: matchingHint
        ? `O sintoma “${matchingHint}” costuma estar relacionado a falha no compressor, sensor de temperatura ou problema na eletroeletrônica do equipamento.`
        : "O problema descrito pode estar relacionado a falha de ventilação, sensor, termostato ou alimentação elétrica. Um técnico pode confirmar no diagnóstico final.",
    };
  }, [query, selectedCategory]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setError("Descreva o problema do equipamento antes de enviar.");
      setResult(null);
      setIsSubmitted(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSubmitted(true);

    try {
      const apiResponse = await diagnoseIssue([selectedCategory, trimmed]);
      const firstRecommendation = apiResponse.recommendations?.[0];

      setResult({
        title: firstRecommendation?.title ?? "Diagnóstico inicial",
        details: firstRecommendation?.description ?? diagnosis.details,
        recommendations: apiResponse.recommendations ?? [],
      });
    } catch (apiError) {
      setResult(null);
      setError(
        apiError instanceof Error
          ? apiError.message
          : "Não foi possível obter o diagnóstico no momento."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="diagnostico" className="bg-white py-18">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
          Qual o problema do seu equipamento?
        </h2>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-200/60">
          <div className="flex flex-col gap-4 md:flex-row">
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-4 text-base font-medium text-slate-700 outline-none focus:border-blue-600"
              aria-label="Selecione o equipamento"
            >
              {Object.keys(diagnosticHints).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsSubmitted(false);
                setError(null);
              }}
              placeholder="Ex.: Minha geladeira não está gelando..."
              className="flex-1 rounded-xl border border-slate-300 bg-white p-4 text-base text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              aria-label="Descreva o problema"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {isLoading ? "Diagnosticando..." : "Diagnosticar"}
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-left text-red-700">
              {error}
            </div>
          )}

          {isSubmitted && !isLoading && result && (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Diagnóstico inicial
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">{result.title}</h3>
              <p className="mt-3 text-slate-700">{result.details}</p>

              {result.recommendations.length > 0 && (
                <div className="mt-5 space-y-4">
                  {result.recommendations.map((recommendation) => (
                    <div key={recommendation.title} className="rounded-2xl bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-bold text-slate-900">{recommendation.title}</h4>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                          {Math.round(recommendation.confidence * 100)}%
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-700">{recommendation.description}</p>
                      <p className="mt-2 text-sm text-slate-700"><strong>Solução:</strong> {recommendation.solution}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                        {recommendation.follow_up_questions.map((question) => (
                          <span key={question} className="rounded-full bg-slate-100 px-2 py-1">
                            {question}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isSubmitted && !isLoading && !result && !error && (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Diagnóstico inicial
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">{diagnosis.title}</h3>
              <p className="mt-3 text-slate-700">{diagnosis.details}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
                <span className="rounded-full bg-white px-3 py-1">✅ Verificar alimentação</span>
                <span className="rounded-full bg-white px-3 py-1">🔎 Inspecionar sensor</span>
                <span className="rounded-full bg-white px-3 py-1">🛠️ Agendar técnico</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}