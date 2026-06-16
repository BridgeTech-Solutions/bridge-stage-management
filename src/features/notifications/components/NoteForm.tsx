"use client";

import { useActionState } from "react";
import { createNote, type ActionState } from "../actions";

// 4) UI — composant client qui appelle la Server Action.
//    `useActionState` gère l'état de retour et l'état "en cours".
const initialState: ActionState = {};

export function NoteForm() {
  const [state, formAction, pending] = useActionState(createNote, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <textarea
        name="message"
        placeholder="Écrire une note de démonstration…"
        className="textarea textarea-bordered w-full"
        rows={2}
      />
      {state.error && <p className="text-error text-sm">{state.error}</p>}
      {state.success && (
        <p className="text-success text-sm">Note enregistrée ✔</p>
      )}
      <button className="btn btn-primary self-start" disabled={pending}>
        {pending ? "Envoi…" : "Ajouter"}
      </button>
    </form>
  );
}
