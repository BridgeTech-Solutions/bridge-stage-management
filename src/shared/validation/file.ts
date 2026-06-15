import { ACCEPTED_MIME, MAX_FILE_SIZE } from "@/shared/constants/domain";

/**
 * Valide un fichier uploadé : PDF uniquement, 2 Mo maximum.
 * À utiliser côté CLIENT (avant envoi) ET côté SERVEUR (dans la Server Action).
 * @returns un message d'erreur en français, ou null si le fichier est valide.
 */
export function validatePdf(file: File): string | null {
  if (file.type !== ACCEPTED_MIME) {
    return "Seuls les fichiers PDF sont acceptés.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "Le fichier dépasse la taille maximale de 2 Mo.";
  }
  return null;
}
