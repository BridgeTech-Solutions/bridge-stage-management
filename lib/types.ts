// 1. Définition stricte des statuts possibles d'une demande de stage
export type StatusCandidature = 'En attente' | 'Accepté' | 'Refusé';

// 2. Définition des rôles ou profils de l'entreprise
export type RoleEntreprise = 'Dev Backend' | 'Chef de Projet' | 'Data Analyst' | 'UX Designer';

// 3. Modélisation complète d'une candidature (Contrat de données)
export interface Candidat {
  id: string;               // Identifiant unique (ex: "1")
  nom: string;              // Prénom et Nom (ex: "Jean Dupont")
  email: string;            // Adresse email
  role: RoleEntreprise;     // Utilise notre type strict défini au-dessus
  evaluation: number;       // Note sur 5 (ex: 4.8)
  dateEnvoi: string;        // Date de la demande (ex: "12 Oct, 2023")
  statut: StatusCandidature; // Utilise notre type strict 'En attente' | 'Accepté' | 'Refusé'
  avatarUrl?: string;       // Lien optionnel pour la photo de profil
}