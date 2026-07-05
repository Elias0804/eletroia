export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-blue-700">
          EletroIA
        </h1>

        {/* Menu */}
        <nav className="hidden items-center gap-8 md:flex">

          <a href="#" className="font-medium hover:text-blue-700">
            Início
          </a>

          <a href="#" className="font-medium hover:text-blue-700">
            Diagnóstico
          </a>

          <a href="#" className="font-medium hover:text-blue-700">
            Técnicos
          </a>

          <a href="#" className="font-medium hover:text-blue-700">
            Planos
          </a>

        </nav>

        {/* Botões */}
        <div className="flex gap-3">

          <button className="rounded-lg border border-blue-700 px-5 py-2 text-blue-700 transition hover:bg-blue-50">
            Entrar
          </button>

          <button className="rounded-lg bg-blue-700 px-5 py-2 text-white transition hover:bg-blue-800">
            Cadastrar
          </button>

        </div>

      </div>
    </header>
  );
}