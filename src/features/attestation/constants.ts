/**
 * Mentions fixes de l'attestation.
 *
 * Le signataire et la ville d'émission changent avec l'organisation, pas avec le
 * code : ils sont configurables par variable d'environnement, avec un repli sur
 * les valeurs actuelles de Bridge Technologies Solutions.
 */

export const ATTESTATION_CITY = process.env.ATTESTATION_CITY || "Douala";

export const ATTESTATION_SIGNATORY_NAME =
  process.env.ATTESTATION_SIGNATORY_NAME || "La Direction";

export const ATTESTATION_SIGNATORY_ROLE =
  process.env.ATTESTATION_SIGNATORY_ROLE || "Le Directeur Général";

/** Raison sociale telle qu'elle doit apparaître dans le corps du document. */
export const COMPANY_LEGAL_NAME = "BRIDGE TECHNOLOGIES SOLUTIONS Sarl";

/** Trigramme utilisé dans la référence : N° 0007/BTS/DRH/2026. */
export const ATTESTATION_REF_PREFIX = "BTS/DRH";

/** Chemins publics du papier à en-tête (extraits du modèle Word de la DRH). */
export const LETTERHEAD_TOP = "/attestation/entete-bridge.png";
export const LETTERHEAD_BOTTOM = "/attestation/pied-bridge.png";
