"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserSession, getCurrentUser, type UserRole } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "cadastrar">("login");
  const [role, setRole] = useState<UserRole>("cliente");
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.email || !form.password || (!mode || (mode === "cadastrar" && !form.name))) {
      setMessage("Preencha os campos obrigatórios para continuar.");
      return;
    }

    if (mode === "cadastrar") {
      createUserSession({
        name: form.name,
        email: form.email,
        city: form.city || "São Paulo",
        role,
      });

      setMessage("Cadastro realizado com sucesso!");
      router.push(role === "tecnico" ? "/painel-tecnico" : "/dashboard-cliente");
      return;
    }

    const existingUser = getCurrentUser();
    if (existingUser) {
      router.push(existingUser.role === "tecnico" ? "/painel-tecnico" : "/dashboard-cliente");
      return;
    }

    const fallbackUser = createUserSession({
      name: form.name || "Cliente EletroIA",
      email: form.email,
      city: form.city || "São Paulo",
      role,
    });

    setMessage(`Bem-vindo(a), ${fallbackUser.name}!`);
    router.push(role === "tecnico" ? "/painel-tecnico" : "/dashboard-cliente");
  };

  return (
    <main className="min-h-screen bg-slate-100 py-14 text-slate-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-sky-600 p-8 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">EletroIA</p>
          <h1 className="mt-5 text-4xl font-extrabold">Acesse sua conta e organize seu atendimento.</h1>
          <p className="mt-5 text-lg text-blue-50">
            Clientes encontram técnicos, técnicos recebem leads e toda a operação fica centralizada.
          </p>

          <div className="mt-8 space-y-4 text-sm text-blue-50">
            <div className="rounded-2xl bg-white/10 p-4">✅ Diagnóstico inteligente</div>
            <div className="rounded-2xl bg-white/10 p-4">🛠️ Técnicos por especialidade</div>
            <div className="rounded-2xl bg-white/10 p-4">📍 Agendamento por cidade</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold ${
                mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setMode("cadastrar")}
              className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold ${
                mode === "cadastrar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700">Tipo de conta</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("cliente")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                    role === "cliente" ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  Cliente
                </button>
                <button
                  type="button"
                  onClick={() => setRole("tecnico")}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                    role === "tecnico" ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  Técnico
                </button>
              </div>
            </div>

            {mode === "cadastrar" && (
              <label className="block text-sm font-medium text-slate-700">
                Nome completo
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="Seu nome"
                />
              </label>
            )}

            <label className="block text-sm font-medium text-slate-700">
              E-mail
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="seu@email.com"
              />
            </label>

            {mode === "cadastrar" && (
              <label className="block text-sm font-medium text-slate-700">
                Cidade
                <input
                  value={form.city}
                  onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="São Paulo"
                />
              </label>
            )}

            <label className="block text-sm font-medium text-slate-700">
              Senha
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              {mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          {message && (
            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          <p className="mt-5 text-center text-sm text-slate-500">
            Quer voltar para o início? <Link href="/" className="font-semibold text-blue-700">Clique aqui</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
