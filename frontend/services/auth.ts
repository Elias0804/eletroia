export type UserRole = "cliente" | "tecnico";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city: string;
};

export const AUTH_STORAGE_KEY = "eletroia-user";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function createUserSession(input: {
  name: string;
  email: string;
  role: UserRole;
  city: string;
}): User {
  const user: User = {
    id: `user-${Date.now()}`,
    name: input.name,
    email: input.email,
    role: input.role,
    city: input.city,
  };

  setCurrentUser(user);
  return user;
}
