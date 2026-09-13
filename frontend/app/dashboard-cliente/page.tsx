"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser, type User } from "@/services/auth";
import { loadProducts, type Product } from "@/services/products";

const technicians = [
  { name: "Marcos Silva", specialty: "Refrigeração", city: "São Paulo" },
  { name: "Larissa Costa", specialty: "Lavanderia", city: "Rio de Janeiro" },
  { name: "Eduardo Ramos", specialty: "Climatização", city: "Belo Horizonte" },
];

export default function DashboardClientePage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setProducts(loadProducts(currentUser));
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Acesso</p>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Faça login para acessar sua área.</h1>
          <p className="mt-4 text-slate-600">Clientes precisam entrar para acompanhar diagnósticos, agendamentos e técnicos.</p>
          <Link href="/login" className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
            Ir para login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Cliente</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Olá, {user.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700">{user.city}</span>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Sair
            </button>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-4">
          {[
            { label: "Diagnósticos", value: "09", tint: "bg-blue-50 text-blue-700" },
            { label: "Equipamentos salvos", value: String(products.length).padStart(2, "0"), tint: "bg-emerald-50 text-emerald-700" },
            { label: "Técnicos favoritos", value: "03", tint: "bg-amber-50 text-amber-700" },
            { label: "Orçamentos", value: "04", tint: "bg-violet-50 text-violet-700" },
          ].map((card) => (
            <div key={card.label} className={`rounded-2xl border border-slate-200 p-5 ${card.tint}`}>
              <p className="text-sm font-medium">{card.label}</p>
              <h2 className="mt-3 text-3xl font-extrabold">{card.value}</h2>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Meus equipamentos</h2>
              <Link href="/" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
                Novo diagnóstico
              </Link>
            </div>

            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-lg font-bold text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.categoryName} {product.brand && `• ${product.brand}`}</p>
                  {product.notes && <p className="mt-2 text-sm text-slate-600">{product.notes}</p>}
                </div>
              ))}
              {!products.length && <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600">Nenhum equipamento cadastrado nesta conta.</p>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-slate-900">Administração</h2>
                <Link href="/admin/produtos" className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800">Gerenciar produtos</Link>
              </div>
              <p className="mt-4 text-sm text-slate-600">Adicione fotos, marca, modelo, série e observações dos seus aparelhos. Cada cliente vê somente os próprios dados.</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Técnicos sugeridos</h2>
              <div className="mt-4 space-y-4">
                {technicians.map((tech) => (
                  <div key={tech.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="font-bold text-slate-900">{tech.name}</p>
                    <p className="text-sm text-slate-600">{tech.specialty}</p>
                    <p className="text-sm text-slate-500">{tech.city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
