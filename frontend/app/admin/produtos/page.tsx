"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser, type User } from "@/services/auth";
import { PRODUCT_CATEGORIES, deleteProduct, loadProducts, saveProduct, type Product } from "@/services/products";

const emptyForm = {
  name: "",
  brand: "",
  model: "",
  categoryId: PRODUCT_CATEGORIES[0].id,
  serialNumber: "",
  purchaseDate: "",
  notes: "",
  imageDataUrl: "",
};

export default function AdminProdutosPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const cameraInput = useRef<HTMLInputElement>(null);
  const uploadInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setProducts(loadProducts(currentUser));
  }, []);

  const updateImage = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Selecione uma imagem válida.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("A imagem deve ter no máximo 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, imageDataUrl: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    if (!form.name.trim() || !form.categoryId) {
      setMessage("Informe o nome e a categoria do produto.");
      return;
    }

    const category = PRODUCT_CATEGORIES.find((item) => item.id === form.categoryId) ?? PRODUCT_CATEGORIES[0];
    const created = saveProduct(user, { ...form, categoryName: category.name });
    if (!created) return;

    setProducts(loadProducts(user));
    setForm(emptyForm);
    setMessage("Produto adicionado à sua área com sucesso.");
  };

  const handleDelete = (productId: string) => {
    if (!user) return;
    deleteProduct(user, productId);
    setProducts(loadProducts(user));
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Entre para gerenciar seus produtos</h1>
          <Link href="/login" className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white">Ir para login</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/dashboard-cliente" className="text-sm font-semibold text-blue-700">← Voltar para minha área</Link>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Administração pessoal</p>
            <h1 className="mt-2 text-4xl font-extrabold">Meus equipamentos</h1>
            <p className="mt-2 text-slate-600">Gerencie apenas os produtos da conta de {user.name}.</p>
          </div>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">{products.length} produto(s)</span>
        </div>

        <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
          <form onSubmit={handleSubmit} className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Adicionar produto</h2>
            <p className="mt-2 text-sm text-slate-500">Cadastre por upload ou tire uma foto agora.</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => cameraInput.current?.click()} className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100">📷 Tirar foto</button>
              <button type="button" onClick={() => uploadInput.current?.click()} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">⬆️ Enviar imagem</button>
              <input ref={cameraInput} type="file" accept="image/*" capture="environment" onChange={(event) => updateImage(event.target.files?.[0])} className="hidden" />
              <input ref={uploadInput} type="file" accept="image/*" onChange={(event) => updateImage(event.target.files?.[0])} className="hidden" />
            </div>

            {form.imageDataUrl && <img src={form.imageDataUrl} alt="Prévia do produto" className="mt-4 h-44 w-full rounded-2xl object-cover" />}

            <div className="mt-5 space-y-4">
              {[
                ["name", "Nome do produto", "Ex.: Geladeira inverse"],
                ["brand", "Marca", "Ex.: Brastemp"],
                ["model", "Modelo", "Ex.: BRE50"],
                ["serialNumber", "Número de série", "Opcional"],
              ].map(([field, label, placeholder]) => (
                <label key={field} className="block text-sm font-medium text-slate-700">{label}
                  <input value={form[field as keyof typeof form] as string} onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600" />
                </label>
              ))}

              <label className="block text-sm font-medium text-slate-700">Categoria
                <select value={form.categoryId} onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600">
                  {PRODUCT_CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.icon} {category.name}</option>)}
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700">Data da compra
                <input type="date" value={form.purchaseDate} onChange={(event) => setForm((current) => ({ ...current, purchaseDate: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600" />
              </label>

              <label className="block text-sm font-medium text-slate-700">Observações
                <textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} rows={3} placeholder="Ex.: fica na cozinha, garantia ativa..." className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-600" />
              </label>
            </div>

            <button type="submit" className="mt-5 w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">Salvar produto</button>
            {message && <p className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}
          </form>

          <section>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRODUCT_CATEGORIES.map((category) => <div key={category.id} className={`rounded-2xl p-4 ${category.color}`}><span className="text-2xl">{category.icon}</span><h3 className="mt-2 font-bold">{category.name}</h3><p className="mt-1 text-xs opacity-80">{category.description}</p></div>)}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {products.map((product) => <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">{product.imageDataUrl ? <img src={product.imageDataUrl} alt={product.name} className="h-48 w-full object-cover" /> : <div className="flex h-48 items-center justify-center bg-slate-100 text-5xl">{PRODUCT_CATEGORIES.find((item) => item.id === product.categoryId)?.icon ?? "📦"}</div>}<div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{product.categoryName}</p><h2 className="mt-1 text-xl font-bold">{product.name}</h2></div><button type="button" onClick={() => handleDelete(product.id)} aria-label={`Excluir ${product.name}`} className="text-sm font-semibold text-red-600 hover:text-red-800">Excluir</button></div><p className="mt-3 text-sm text-slate-600">{product.brand || "Marca não informada"} {product.model && `• ${product.model}`}</p>{product.serialNumber && <p className="mt-1 text-xs text-slate-500">Série: {product.serialNumber}</p>}{product.notes && <p className="mt-3 text-sm text-slate-600">{product.notes}</p>}</div></article>)}
            </div>
            {!products.length && <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">Você ainda não cadastrou equipamentos nesta conta.</div>}
          </section>
        </div>
      </div>
    </main>
  );
}
