export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-400">EletroIA</h2>
          <p className="mt-4 text-sm text-gray-400">
            A maior plataforma brasileira de assistência técnica inteligente para eletrodomésticos.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Plataforma</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#diagnostico" className="hover:text-white">Diagnóstico</a></li>
            <li><a href="#tecnicos" className="hover:text-white">Técnicos</a></li>
            <li><a href="#" className="hover:text-white">Planos</a></li>
            <li><a href="#" className="hover:text-white">Contato</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Empresa</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Sobre</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Contato</h3>
          <p className="text-gray-400">suporte@eletroia.com.br</p>
          <p className="mt-2 text-gray-400">Brasil</p>
        </div>
      </div>

      <div className="border-t border-slate-700 py-6 text-center text-sm text-gray-500">
        © 2026 EletroIA. Todos os direitos reservados.
      </div>
    </footer>
  );
}
