// src/components/TopBar.tsx
import { useUserAlias } from '../hooks/useUserAlias';

export default function TopBar() {
  const { alias, loading } = useUserAlias();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button>
            {/* Icono de notificaciones */}
            <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="h-8 w-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
            {loading ? '…' : alias}
          </div>
        </div>
      </div>
    </header>
  );
}