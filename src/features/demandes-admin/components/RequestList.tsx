export default function RequestList() {
  // Nos fausses données de test pour voir si l'affichage fonctionne
  const requests = [
    {
      id: "1",
      type: "Stage Académique",
      status: "PENDING",
      createdAt: new Date().toISOString(),
      profile: {
        firstName: "Styve",
        lastName: "Candidat",
        email: "styve@example.com",
      },
    },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-secondary text-sm">
            <th>Candidat</th>
            <th>Type de Stage</th>
            <th>Statut</th>
            <th>Date de dépôt</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="hover">
              <td>
                <div className="font-bold">
                  {request.profile.firstName} {request.profile.lastName}
                </div>
                <div className="text-sm opacity-50">{request.profile.email}</div>
              </td>
              <td>
                <span className="badge badge-ghost">{request.type}</span>
              </td>
              <td>
                <span className="badge badge-warning">{request.status}</span>
              </td>
              <td className="text-sm opacity-70">
                {new Date(request.createdAt).toLocaleDateString("fr-FR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}