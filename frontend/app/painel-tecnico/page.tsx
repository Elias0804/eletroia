"use client";

import { AGENDA, TECHNICAL_LEADS } from "@/services/painel-tecnico";

export default function PainelTecnicoPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Painel</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Área do técnico</h1>
          </div>
          <button className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800">
            + Novo atendimento
          </button>
        </div>

        <section className="grid gap-6 md:grid-cols-4">
          {[
            { label: "Leads ativos", value: "128", accent: "bg-blue-50 text-blue-700" },
            { label: "Atendimentos hoje", value: "12", accent: "bg-emerald-50 text-emerald-700" },
            { label: "Receita estimada", value: "R$ 8.4k", accent: "bg-amber-50 text-amber-700" },
            { label: "Avaliação", value: "4.9/5", accent: "bg-violet-50 text-violet-700" },
          ].map((card) => (
            <div key={card.label} className={`rounded-2xl border border-slate-200 p-5 ${card.accent}`}>
              <p className="text-sm font-medium">{card.label}</p>
              <h2 className="mt-3 text-3xl font-extrabold">{card.value}</h2>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Leads recebidos</h2>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Atualizado agora</span>
            </div>

            <div className="space-y-4">
              {TECHNICAL_LEADS.map((lead) => (
                <div key={lead.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900">{lead.client}</p>
                      <p className="text-sm text-slate-500">{lead.device} • {lead.city}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        lead.priority === "Alta"
                          ? "bg-red-100 text-red-700"
                          : lead.priority === "Média"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {lead.priority}
                      </span>
                      <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {lead.status}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-600">{lead.issue}</p>

                  <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                    <span className="font-medium">Valor estimado: R$ {lead.value}</span>
                    <button className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-800">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Agenda</h2>
            <div className="mt-5 space-y-4">
              {AGENDA.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">{item.type}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{item.time}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.client}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.address}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
