import { Suspense } from "react";
import { NoteForm } from "@/features/_example-note/components/NoteForm";
import { NoteList } from "@/features/_example-note/components/NoteList";

// Page de DÉMONSTRATION de la slice exemple. À supprimer avec la slice.
// Rendu dynamique : la liste est lue en base à chaque requête.
export const dynamic = "force-dynamic";

export default function ExamplePage() {
  return (
    <main className="max-w-xl mx-auto p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Slice exemple</h1>
        <p className="text-base-content/60 text-sm">
          Démonstration du pattern vertical slice (à supprimer).
        </p>
      </div>

      <NoteForm />

      <Suspense fallback={<span className="loading loading-spinner" />}>
        <NoteList />
      </Suspense>
    </main>
  );
}
