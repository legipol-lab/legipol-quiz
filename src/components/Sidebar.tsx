// src/components/Sidebar.tsx

import Link from "next/link";
import { useRouter } from "next/router";
import { menuItems } from "@/config/menu";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-black text-white shadow-lg p-6 fixed h-full left-0 top-0 overflow-y-auto">
      <h1 className="text-xl font-bold mb-8 text-yellow-400">LEGIPOL Quiz</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = router.asPath === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-lg ${
                isActive ? "bg-yellow-400 text-black font-semibold" : "hover:bg-yellow-400/10"
              } transition font-semibold`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Cerrar Sesión */}
      <div className="mt-auto pt-6 border-t border-gray-700">
        <Link
          href="/auth/login"
          onClick={() => {
            // Aquí iría la lógica de cierre de sesión con Firebase
            console.log("Cerrando sesión...");
          }}
          className="block px-4 py-3 text-red-400 hover:bg-red-900 hover:text-red-300 rounded-lg transition font-semibold"
        >
          🔒 Cerrar Sesión
        </Link>
      </div>
    </aside>
  );
}