// src/app/admin/page.tsx
import CandidatureTable from "@/features/demandes-admin/components/CandidatureTable";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord RH</h1>
        <p className="text-gray-600">Gérez ici les candidatures reçues.</p>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Demandes récentes</h2>
        {/* On appelle le composant que tu viens de créer */}
        <CandidatureTable />
      </section>
    </div>
  );
}