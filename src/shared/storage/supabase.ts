import { createClient } from "@supabase/supabase-js";

// Client Supabase côté SERVEUR uniquement (utilise la service role key).
// À n'importer QUE dans des Server Actions / Route Handlers, jamais côté client.
//
// Cf. cahier des charges : Supabase est utilisé pour le STOCKAGE des documents.
// Les données relationnelles (candidats, demandes, ...) restent dans PostgreSQL via Prisma.

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // En dev, on prévient clairement le stagiaire si la config manque.
  console.warn(
    "[supabase] SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant — l'upload de fichiers échouera. Voir .env.example."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseServiceKey ?? "", {
  auth: { persistSession: false },
});

/** Nom du bucket Supabase où sont stockés les documents des candidats. */
export const DOCUMENTS_BUCKET = "documents";

/**
 * Téléverse un fichier PDF dans Supabase Storage et renvoie son URL publique.
 * @param file       Le fichier à téléverser (déjà validé : PDF, <= 2 Mo).
 * @param pathPrefix Dossier logique (ex. l'id de la demande).
 */
export async function uploadDocument(file: File, pathPrefix: string): Promise<string> {
  const path = `${pathPrefix}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .upload(path, file, { contentType: "application/pdf", upsert: false });

  if (error) throw new Error(`Échec de l'upload : ${error.message}`);

  const { data } = supabase.storage.from(DOCUMENTS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
