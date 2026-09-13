"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_TECHNICIANS,
  EQUIPMENT_CATEGORIES,
  SPECIALTIES,
  type Technician,
  loadTechnicians,
} from "@/services/technicians";

export default function TecnicosPage() {
  const [technicians, setTechnicians] = useState<Technician[]>(DEFAULT_TECHNICIANS);
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("Todas");
  const [equipmentFilter, setEquipmentFilter] = useState("Todos");
  const [cityFilter, setCityFilter] = useState("Todas");

  useEffect(() => {
    setTechnicians(loadTechnicians());
  }, []);

  const cities = useMemo(
    () => ["Todas", ...new Set(technicians.map((tech) => tech.city))],
    [technicians],
  );

  const filteredTechnicians = useMemo(() => {
    return technicians.filter((tech) => {
      const matchesSearch =
        !search ||
        `${tech.name} ${tech.specialty} ${tech.city} ${tech.bio}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSpecialty =
        specialtyFilter === "Todas" || tech.specialties.includes(specialtyFilter);

      const matchesEquipment =
        equipmentFilter === "Todos" ||
        tech.equipments.some((equipment) => equipment.toLowerCase().includes(equipmentFilter.toLowerCase()));

      const matchesCity = cityFilter === "Todas" || tech.city === cityFilter;

      return matchesSearch && matchesSpecialty && matchesEquipment && matchesCity;
    });
  }, [technicians, search, specialtyFilter, equipmentFilter, cityFilter]);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Técnicos</p>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Especialistas em eletrodomésticos e eletrônicos</h1>
          </div>

          <Link
            href="/cadastro-tecnico"
            className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Quero me candidatar
          </Link>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar técnico ou especialidade"
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
            />

            <select
              value={specialtyFilter}
              onChange={(event) => setSpecialtyFilter(event.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="Todas">Todas as especialidades</option>
              {SPECIALTIES.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>

            <select
              value={equipmentFilter}
              onChange={(event) => setEquipmentFilter(event.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="Todos">Todos os equipamentos</option>
              {EQUIPMENT_CATEGORIES.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={cityFilter}
              onChange={(event) => setCityFilter(event.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === "Todas" ? "Todas as cidades" : city}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTechnicians.map((tech) => (
            <article key={tech.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white">
                  {tech.name.charAt(0)}
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-700">
                  ★ {tech.rating.toFixed(1)}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">{tech.name}</h2>
              <p className="mt-2 text-sm font-medium text-blue-700">{tech.specialty}</p>
              <p className="mt-1 text-sm text-slate-500">{tech.city} - {tech.state}</p>
              <p className="mt-4 text-sm text-slate-600">{tech.bio}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tech.specialties.map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Equipamentos</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tech.equipments.map((item) => (
                    <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs text-blue-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
                <span>{tech.yearsExperience} anos de experiência</span>
                <button className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-800">
                  Solicitar
                </button>
              </div>
            </article>
          ))}
        </section>

        {filteredTechnicians.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Nenhum técnico encontrado com os filtros selecionados.
          </div>
        )}
      </div>
    </main>
  );
}
