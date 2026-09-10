export default function SearchBar() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-6">

        <h2 className="mb-8 text-center text-3xl font-bold">
          Qual o problema do seu equipamento?
        </h2>

        <div className="flex flex-col gap-4 rounded-2xl border bg-gray-50 p-6 shadow-lg md:flex-row">

          <input
            type="text"
            placeholder="Ex.: Minha geladeira não está gelando..."
            className="flex-1 rounded-lg border p-4 outline-none focus:border-blue-600"
          />

          <button className="rounded-lg bg-blue-700 px-8 py-4 font-semibold text-white hover:bg-blue-800">
            Diagnosticar
          </button>

        </div>

      </div>
    </section>
  );
}