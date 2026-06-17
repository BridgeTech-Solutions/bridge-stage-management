import RequestList from "@/features/demandes-admin/components/RequestList";

export default async function AdminPage() {
  return (
    <main className="min-h-screen bg-base-100 p-8">
      <h1 className="text-3xl font-bold text-secondary mb-8">Tableau de bord RH (Mode Test)</h1>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <RequestList /> 
        </div>
      </div>
    </main>
  );
}