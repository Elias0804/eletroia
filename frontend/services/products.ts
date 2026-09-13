import type { User } from "@/services/auth";

export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export type Product = {
  id: string;
  ownerId: string;
  name: string;
  brand: string;
  model: string;
  categoryId: string;
  categoryName: string;
  serialNumber: string;
  purchaseDate: string;
  notes: string;
  imageDataUrl?: string;
  createdAt: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "refrigeracao", name: "Refrigeração", description: "Geladeiras, freezers e adegas", icon: "❄️", color: "bg-cyan-50 text-cyan-700" },
  { id: "lavanderia", name: "Lavanderia", description: "Lavadoras, secadoras e lava e seca", icon: "🧺", color: "bg-blue-50 text-blue-700" },
  { id: "cozinha", name: "Cozinha", description: "Fogão, forno, micro-ondas e lava-louças", icon: "🍳", color: "bg-orange-50 text-orange-700" },
  { id: "climatizacao", name: "Climatização", description: "Ar-condicionado, ventiladores e aquecedores", icon: "🌬️", color: "bg-sky-50 text-sky-700" },
  { id: "agua", name: "Água e aquecimento", description: "Boilers, filtros e bombas", icon: "🚿", color: "bg-emerald-50 text-emerald-700" },
  { id: "eletronicos", name: "Eletrônicos", description: "TVs, áudio, monitores e projetores", icon: "📺", color: "bg-violet-50 text-violet-700" },
  { id: "informatica", name: "Informática", description: "Notebooks, desktops, impressoras e redes", icon: "💻", color: "bg-indigo-50 text-indigo-700" },
  { id: "celulares", name: "Celulares e tablets", description: "Smartphones, tablets e acessórios", icon: "📱", color: "bg-pink-50 text-pink-700" },
  { id: "pequenos", name: "Pequenos aparelhos", description: "Cafeteiras, liquidificadores e ferros", icon: "⚡", color: "bg-amber-50 text-amber-700" },
];

const STORAGE_PREFIX = "eletroia-products";

function storageKey(ownerId: string) {
  return `${STORAGE_PREFIX}:${ownerId}`;
}

export function loadProducts(owner: Pick<User, "id"> | null): Product[] {
  if (typeof window === "undefined" || !owner) return [];

  try {
    const raw = window.localStorage.getItem(storageKey(owner.id));
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

export function saveProduct(owner: Pick<User, "id">, product: Omit<Product, "id" | "ownerId" | "createdAt">) {
  if (typeof window === "undefined") return null;

  const nextProduct: Product = {
    ...product,
    id: `product-${Date.now()}`,
    ownerId: owner.id,
    createdAt: new Date().toISOString(),
  };
  const products = [nextProduct, ...loadProducts(owner)];
  window.localStorage.setItem(storageKey(owner.id), JSON.stringify(products));
  return nextProduct;
}

export function deleteProduct(owner: Pick<User, "id">, productId: string) {
  if (typeof window === "undefined") return;
  const products = loadProducts(owner).filter((product) => product.id !== productId);
  window.localStorage.setItem(storageKey(owner.id), JSON.stringify(products));
}
