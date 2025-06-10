import { useRouter } from "next/router";

export default function ResultadoPage() {
  const router = useRouter();
  const { score } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-zinc-50 border-2 border-yellow-400 rounded-xl p-10 text-center shadow-lg">
        <h1 className="text-3xl font-extrabold text-yellow-600 mb-4">¡Test finalizado!</h1>
        <p className="text-xl mb-6">
          Has acertado <span className="font-bold text-yellow-600">{score}</span> pregunta(s).
        </p>
        <button
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          onClick={() => router.push("/")}
        >
          Volver al menú de tests
        </button>
      </div>
    </div>
  );
}
