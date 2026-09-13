"use client";

import Link from "next/link";
import { useState } from "react";
import { EQUIPMENT_CATEGORIES, SPECIALTIES, loadTechnicians, saveTechnicians, type Technician } from "@/services/technicians";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  specialty: "Refrigeração",
  specialties: ["Refrigeração"],
  equipments: ["Geladeira"],
  yearsExperience: 1,
  availability: "Disponível para atendimento",
  bio: "",
};

export default function CadastroTecnicoPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleSelection = (field: "specialties" | "equipments", value: string) => {
    setForm((current) => {
      const selected = current[field];
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return { ...current, [field]: next };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.city || !form.bio) {
      setMessage("Preencha os campos obrigatórios antes de enviar.");
      return;
    }

    const tech: Technician = {
      id: `tech-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      state: form.state,
      specialty: form.specialty,
      specialties: form.specialties,
      equipments: form.equipments,
      yearsExperience: form.yearsExperience,
      availability: form.availability,
      bio: form.bio,
      rating: 4.8,
    };

    const current = loadTechnicians();
    saveTechnicians([tech, ...current]);

    setForm(initialForm);
    setMessage("Cadastro realizado com sucesso! Seu perfil já está disponível para clientes.");
  };

  return (
    <main className="min-h-screen bg-slate-100 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Cadastro</p>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Seja técnico EletroIA</h1>
          </div>

          <Link href="/tecnicos" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
            Ver profissionais
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Nome completo
              <input
                value={form.name}
                onChange={(event) => handleInputChange("name", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="Seu nome"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              E-mail
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleInputChange("email", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="seu@email.com"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Telefone
              <input
                value={form.phone}
                onChange={(event) => handleInputChange("phone", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="(11) 99999-9999"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Experiência em anos
              <input
                type="number"
                min={0}
                value={form.yearsExperience}
                onChange={(event) => handleInputChange("yearsExperience", Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Cidade
              <input
                value={form.city}
                onChange={(event) => handleInputChange("city", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="São Paulo"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Estado
              <input
                value={form.state}
                onChange={(event) => handleInputChange("state", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="SP"
              />
            </label>

            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              Especialidade principal
              <select
                value={form.specialty}
                onChange={(event) => handleInputChange("specialty", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
              >
                {SPECIALTIES.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Especialidades</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SPECIALTIES.map((specialty) => {
                const active = form.specialties.includes(specialty);
                return (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => toggleSelection("specialties", specialty)}
                    className={`rounded-full px-3 py-2 text-sm font-medium ${
                      active ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Equipamentos atendidos</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {EQUIPMENT_CATEGORIES.map((category) => {
                const active = form.equipments.includes(category.name);
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleSelection("equipments", category.name)}
                    className={`rounded-full px-3 py-2 text-sm font-medium ${
                      active ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category.emoji} {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              Disponibilidade
              <input
                value={form.availability}
                onChange={(event) => handleInputChange("availability", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="Disponível para atendimento em domicílio"
              />
            </label>

            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              Descrição profissional
              <textarea
                value={form.bio}
                onChange={(event) => handleInputChange("bio", event.target.value)}
                rows={5}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="Conte sua experiência e áreas de atuação."
              />
            </label>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Cadastrar técnico
            </button>

            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              Voltar ao início
            </Link>
          </div>

          {message && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
              {message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
