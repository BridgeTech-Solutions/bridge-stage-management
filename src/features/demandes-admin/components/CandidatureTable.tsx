// src/features/demandes-admin/components/CandidatureTable.tsx

export default function CandidatureTable() {
  // Pour l'instant, on simule des données. 
  // Dès qu'on connectera la BDD, on passera ces données via des props.
  const candidatures = [
    { id: 1, nom: "Jean Dupont", email: "jean@email.com", statut: "En attente" },
    { id: 2, nom: "Marie Curie", email: "marie@email.com", statut: "Validé" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Statut</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {candidatures.map((c) => (
            <tr key={c.id}>
              <td className="px-6 py-4 whitespace-nowrap">{c.nom}</td>
              <td className="px-6 py-4 whitespace-nowrap">{c.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs ${c.statut === 'Validé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {c.statut}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline cursor-pointer">
                Voir
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}