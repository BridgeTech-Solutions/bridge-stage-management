import { listNotes } from "../queries";

// Composant serveur (async) : lit en base via queries.ts et affiche la liste.
export async function NoteList() {
  const notes = await listNotes();

  if (notes.length === 0) {
    return <p className="text-base-content/60 text-sm">Aucune note pour l’instant.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {notes.map((note) => (
        <li key={note.id} className="card bg-base-100 border border-base-300 p-3">
          <p>{note.message}</p>
          <p className="text-xs text-base-content/50">
            {note.createdAt.toLocaleString("fr-FR")}
          </p>
        </li>
      ))}
    </ul>
  );
}
